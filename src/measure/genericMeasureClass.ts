import { defaultFormatUnit } from "./format";
import { GenericMeasure, MeasureFormatter, NumericOperations } from "./genericMeasure";
import {
    DivideUnits,
    MultiplyUnits,
    ReciprocalUnit,
    SquareUnit,
    Unit,
    CubeUnit,
    UnitWithSymbols,
} from "./unitTypeArithmetic";
import { divideUnits, multiplyUnits, reciprocalUnit } from "./unitValueArithmetic";

type GenericMeasureConstructor<N> = new <U extends Unit>(
    value: N,
    unit: UnitWithSymbols<U>,
    symbol?: string,
) => GenericMeasure<N, U>;

export function createMeasureClass<N>(num: NumericOperations<N>): GenericMeasureConstructor<N> {
    function getFormatter(formatter: MeasureFormatter<N> | undefined): Required<MeasureFormatter<N>> {
        if (formatter === undefined) {
            return {
                formatValue: num.format,
                formatUnit: defaultFormatUnit,
            };
        } else {
            return {
                formatValue: formatter.formatValue || num.format,
                formatUnit: formatter.formatUnit || defaultFormatUnit,
            };
        }
    }

    class Measure<U extends Unit> implements GenericMeasure<N, U> {
        public readonly symbol: string | undefined;

        constructor(
            public readonly value: N,
            public readonly unit: UnitWithSymbols<U>,
            symbol?: string,
        ) {
            this.symbol = symbol;
        }

        // Arithmetic

        public plus(other: GenericMeasure<N, U>): GenericMeasure<N, U> {
            return new Measure(num.add(this.value, other.value), this.unit);
        }

        public minus(other: GenericMeasure<N, U>): GenericMeasure<N, U> {
            return new Measure(num.sub(this.value, other.value), this.unit);
        }

        public negate(): GenericMeasure<N, U> {
            return new Measure(num.neg(this.value), this.unit);
        }

        public scale(value: N): GenericMeasure<N, U> {
            return new Measure(num.mult(this.value, value), this.unit);
        }

        public times<V extends Unit>(other: GenericMeasure<N, V>): GenericMeasure<N, MultiplyUnits<U, V>> {
            return new Measure(num.mult(this.value, other.value), multiplyUnits(this.unit, other.unit));
        }

        public over<V extends Unit>(other: GenericMeasure<N, V>): GenericMeasure<N, DivideUnits<U, V>> {
            return new Measure(num.div(this.value, other.value), divideUnits(this.unit, other.unit));
        }

        public per<V extends Unit>(other: GenericMeasure<N, V>): GenericMeasure<N, DivideUnits<U, V>> {
            return this.over(other);
        }

        public div<V extends Unit>(other: GenericMeasure<N, V>): GenericMeasure<N, DivideUnits<U, V>> {
            return this.over(other);
        }

        public squared(): GenericMeasure<N, SquareUnit<U>> {
            return this.times(this as GenericMeasure<N, U>);
        }

        public cubed(): GenericMeasure<N, CubeUnit<U>> {
            return this.squared().times(this as GenericMeasure<N, U>);
        }

        public inverse(): GenericMeasure<N, ReciprocalUnit<U>> {
            return this.reciprocal();
        }

        public reciprocal(): GenericMeasure<N, ReciprocalUnit<U>> {
            return new Measure(num.reciprocal(this.value), reciprocalUnit(this.unit));
        }

        public unsafeMap<V extends Unit>(
            valueMap: (value: N) => N,
            unitMap?: (unit: UnitWithSymbols<U>) => UnitWithSymbols<V>,
        ): GenericMeasure<N, V> {
            const newUnit = unitMap?.(this.unit) ?? this.unit;
            return new Measure<V>(valueMap(this.value), newUnit as unknown as UnitWithSymbols<V>);
        }

        // Comparisons

        public compare(other: GenericMeasure<N, U>): number {
            return num.compare(this.value, other.value);
        }

        public lt(other: GenericMeasure<N, U>): boolean {
            return this.compare(other) < 0;
        }

        public lte(other: GenericMeasure<N, U>): boolean {
            return this.compare(other) <= 0;
        }

        public eq(other: GenericMeasure<N, U>): boolean {
            return this.compare(other) === 0;
        }

        public neq(other: GenericMeasure<N, U>): boolean {
            return this.compare(other) !== 0;
        }

        public gte(other: GenericMeasure<N, U>): boolean {
            return this.compare(other) >= 0;
        }

        public gt(other: GenericMeasure<N, U>): boolean {
            return this.compare(other) > 0;
        }

        // Formatting

        public toString(formatter?: MeasureFormatter<N>): string {
            const { formatValue, formatUnit } = getFormatter(formatter);
            return `${formatValue(this.value)} ${formatUnit(this.unit)}`.trimRight();
        }

        public in(unit: GenericMeasure<N, U>, formatter?: MeasureFormatter<N>): string {
            if (unit.symbol === undefined) {
                return this.toString(formatter);
            }
            const { formatValue } = getFormatter(formatter);
            const value = formatValue(num.div(this.value, unit.value));
            return `${value} ${unit.symbol}`;
        }

        public withSymbol(symbol: string | undefined): GenericMeasure<N, U> {
            return new Measure(this.value, this.unit, symbol);
        }

        public clone(): GenericMeasure<N, U> {
            return new Measure(this.value, this.unit);
        }
    }

    return Measure;
}
