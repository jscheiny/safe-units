import { defaultFormatUnit } from "./format";
import { GenericMeasure, MeasureFormatter, NumericOperations } from "./genericMeasure";
import { UnitSystem } from "./unitSystem";
import { DivideUnits, MultiplyUnits, ReciprocalUnit, SquareUnit, Unit, CubeUnit } from "./unitTypeArithmetic";

interface GenericMeasureClass<N> {
    createMeasure: <Basis, U extends Unit<Basis>>(
        value: N,
        unit: U,
        unitSystem: UnitSystem<Basis>,
        symbol?: string,
    ) => GenericMeasure<N, Basis, U>;
    isMeasure: (value: unknown) => value is GenericMeasure<N, any, any>;
}

export function createMeasureClass<N>(num: NumericOperations<N>): GenericMeasureClass<N> {
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

    class Measure<Basis, U extends Unit<Basis>> implements GenericMeasure<N, Basis, U> {
        constructor(
            public readonly value: N,
            public readonly unit: U,
            public readonly unitSystem: UnitSystem<Basis>,
            public readonly symbol?: string,
        ) {}

        // Arithmetic

        public plus(other: GenericMeasure<N, Basis, U>): GenericMeasure<N, Basis, U> {
            return new Measure(num.add(this.value, other.value), this.unit, this.unitSystem);
        }

        public minus(other: GenericMeasure<N, Basis, U>): GenericMeasure<N, Basis, U> {
            return new Measure(num.sub(this.value, other.value), this.unit, this.unitSystem);
        }

        public negate(): GenericMeasure<N, Basis, U> {
            return new Measure(num.neg(this.value), this.unit, this.unitSystem);
        }

        public scale(value: N): GenericMeasure<N, Basis, U> {
            return new Measure(num.mult(this.value, value), this.unit, this.unitSystem);
        }

        public times<V extends Unit<Basis>>(
            other: GenericMeasure<N, Basis, V>,
        ): GenericMeasure<N, Basis, MultiplyUnits<Basis, U, V>> {
            return new Measure(
                num.mult(this.value, other.value),
                this.unitSystem.multiply(this.unit, other.unit),
                this.unitSystem,
            );
        }

        public over<V extends Unit<Basis>>(
            other: GenericMeasure<N, Basis, V>,
        ): GenericMeasure<N, Basis, DivideUnits<Basis, U, V>> {
            return new Measure(
                num.div(this.value, other.value),
                this.unitSystem.divide(this.unit, other.unit),
                this.unitSystem,
            );
        }

        public per<V extends Unit<Basis>>(
            other: GenericMeasure<N, Basis, V>,
        ): GenericMeasure<N, Basis, DivideUnits<Basis, U, V>> {
            return this.over(other);
        }

        public div<V extends Unit<Basis>>(
            other: GenericMeasure<N, Basis, V>,
        ): GenericMeasure<N, Basis, DivideUnits<Basis, U, V>> {
            return this.over(other);
        }

        public squared(): GenericMeasure<N, Basis, SquareUnit<Basis, U>> {
            return this.times(this as GenericMeasure<N, Basis, U>);
        }

        public cubed(): GenericMeasure<N, Basis, CubeUnit<Basis, U>> {
            return this.squared().times(this as GenericMeasure<N, Basis, U>);
        }

        public inverse(): GenericMeasure<N, Basis, ReciprocalUnit<Basis, U>> {
            return this.reciprocal();
        }

        public reciprocal(): GenericMeasure<N, Basis, ReciprocalUnit<Basis, U>> {
            return new Measure(num.reciprocal(this.value), this.unitSystem.reciprocal(this.unit), this.unitSystem);
        }

        public unsafeMap<V extends Unit<Basis>>(
            valueMap: (value: N) => N,
            unitMap?: (unit: U) => V,
        ): GenericMeasure<N, Basis, V> {
            const newUnit = unitMap?.(this.unit) ?? this.unit;
            return new Measure<Basis, V>(valueMap(this.value), newUnit as V, this.unitSystem);
        }

        // Comparisons

        public compare(other: GenericMeasure<N, Basis, U>): number {
            return num.compare(this.value, other.value);
        }

        public lt(other: GenericMeasure<N, Basis, U>): boolean {
            return this.compare(other) < 0;
        }

        public lte(other: GenericMeasure<N, Basis, U>): boolean {
            return this.compare(other) <= 0;
        }

        public eq(other: GenericMeasure<N, Basis, U>): boolean {
            return this.compare(other) === 0;
        }

        public neq(other: GenericMeasure<N, Basis, U>): boolean {
            return this.compare(other) !== 0;
        }

        public gte(other: GenericMeasure<N, Basis, U>): boolean {
            return this.compare(other) >= 0;
        }

        public gt(other: GenericMeasure<N, Basis, U>): boolean {
            return this.compare(other) > 0;
        }

        // Formatting

        public toString(formatter?: MeasureFormatter<N>): string {
            const { formatValue, formatUnit } = getFormatter(formatter);
            return `${formatValue(this.value)} ${formatUnit(this.unit, this.unitSystem)}`.trimRight();
        }

        public in(unit: GenericMeasure<N, Basis, U>, formatter?: MeasureFormatter<N>): string {
            if (unit.symbol === undefined) {
                return this.toString(formatter);
            }
            const { formatValue } = getFormatter(formatter);
            const value = formatValue(num.div(this.value, unit.value));
            return `${value} ${unit.symbol}`;
        }

        public valueIn(unit: GenericMeasure<N, Basis, U>): N {
            return num.div(this.value, unit.value);
        }

        public withSymbol(symbol: string | undefined): GenericMeasure<N, Basis, U> {
            return new Measure(this.value, this.unit, this.unitSystem, symbol);
        }

        public clone(): GenericMeasure<N, Basis, U> {
            return new Measure(this.value, this.unit, this.unitSystem);
        }
    }

    return {
        createMeasure: (value, unit, unitSystem, symbol) => new Measure(value, unit, unitSystem, symbol),
        isMeasure: (value): value is GenericMeasure<N, any, any> => value instanceof Measure,
    };
}
