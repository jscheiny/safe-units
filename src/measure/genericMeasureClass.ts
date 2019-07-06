import { formatUnit } from "./format";
import { IGenericMeasure, INumericOperations } from "./genericMeasure";
import {
    AllowedExponents,
    DivideUnits,
    DivisorUnit,
    ExponentiateUnit,
    MultiplicandUnit,
    MultiplyUnits,
    Unit,
    UnitWithSymbols,
} from "./unitTypeArithmetic";
import { divideUnits, exponentiateUnit, multiplyUnits } from "./unitValueArithmetic";

type GenericMeasureConstructor<N> = new <U extends Unit>(
    value: N,
    unit: UnitWithSymbols<U>,
    symbol?: string,
) => IGenericMeasure<N, U>;

export function createMeasureClass<N>(num: INumericOperations<N>): GenericMeasureConstructor<N> {
    class Measure<U extends Unit> implements IGenericMeasure<N, U> {
        public readonly symbol: string | undefined;
        public squared!: "2" extends AllowedExponents<U> ? () => IGenericMeasure<N, ExponentiateUnit<U, "2">> : never;
        public cubed!: "3" extends AllowedExponents<U> ? () => IGenericMeasure<N, ExponentiateUnit<U, "3">> : never;

        constructor(public readonly value: N, public readonly unit: UnitWithSymbols<U>, symbol?: string) {
            this.symbol = symbol;
        }

        // Arithmetic

        public plus(other: IGenericMeasure<N, U>): IGenericMeasure<N, U> {
            return new Measure(num.add(this.value, other.value), this.unit);
        }

        public minus(other: IGenericMeasure<N, U>): IGenericMeasure<N, U> {
            return new Measure(num.sub(this.value, other.value), this.unit);
        }

        public negate(): IGenericMeasure<N, U> {
            return new Measure(num.neg(this.value), this.unit);
        }

        public scale(value: N): IGenericMeasure<N, U> {
            return new Measure(num.mult(this.value, value), this.unit);
        }

        public times<V extends MultiplicandUnit<U>>(
            other: IGenericMeasure<N, V>,
        ): IGenericMeasure<N, MultiplyUnits<U, V>> {
            return new Measure<any>(num.mult(this.value, other.value), multiplyUnits(this.unit, other.unit)) as any;
        }

        public over<V extends DivisorUnit<U>>(other: IGenericMeasure<N, V>): IGenericMeasure<N, DivideUnits<U, V>> {
            return new Measure<any>(num.div(this.value, other.value), divideUnits(this.unit, other.unit)) as any;
        }

        public per<V extends DivisorUnit<U>>(other: IGenericMeasure<N, V>): IGenericMeasure<N, DivideUnits<U, V>> {
            return this.over(other);
        }

        public div<V extends DivisorUnit<U>>(other: IGenericMeasure<N, V>): IGenericMeasure<N, DivideUnits<U, V>> {
            return this.over(other);
        }

        public toThe<E extends AllowedExponents<U>>(power: E): IGenericMeasure<N, ExponentiateUnit<U, E>> {
            return new Measure(num.pow(this.value, power), exponentiateUnit(this.unit, power)) as any;
        }

        public inverse(): IGenericMeasure<N, ExponentiateUnit<U, "-1">> {
            return this.toThe("-1");
        }

        public reciprocal(): IGenericMeasure<N, ExponentiateUnit<U, "-1">> {
            return this.toThe("-1");
        }

        public unsafeMap<V extends Unit>(
            valueMap: (value: N) => N,
            unitMap?: (unit: UnitWithSymbols<U>) => UnitWithSymbols<V>,
        ): IGenericMeasure<N, V> {
            const newUnit = unitMap === undefined ? this.unit : unitMap(this.unit);
            return new Measure<V>(valueMap(this.value), (newUnit as unknown) as UnitWithSymbols<V>);
        }

        // Comparisons

        public compare(other: IGenericMeasure<N, U>): number {
            return num.compare(this.value, other.value);
        }

        public lt(other: IGenericMeasure<N, U>): boolean {
            return this.compare(other) < 0;
        }

        public lte(other: IGenericMeasure<N, U>): boolean {
            return this.compare(other) <= 0;
        }

        public eq(other: IGenericMeasure<N, U>): boolean {
            return this.compare(other) === 0;
        }

        public neq(other: IGenericMeasure<N, U>): boolean {
            return this.compare(other) !== 0;
        }

        public gte(other: IGenericMeasure<N, U>): boolean {
            return this.compare(other) >= 0;
        }

        public gt(other: IGenericMeasure<N, U>): boolean {
            return this.compare(other) > 0;
        }

        // Formatting

        public toString(): string {
            return `${num.format(this.value)} ${formatUnit(this.unit)}`.trimRight();
        }

        public in(unit: IGenericMeasure<N, U>): string {
            if (unit.symbol === undefined) {
                return this.toString();
            }
            const value = num.format(num.div(this.value, unit.value));
            return `${value} ${unit.symbol}`;
        }

        public withSymbol(symbol: string | undefined): IGenericMeasure<N, U> {
            return new Measure(this.value, this.unit, symbol);
        }

        public clone(): IGenericMeasure<N, U> {
            return new Measure(this.value, this.unit);
        }
    }

    Measure.prototype.squared = function(): any {
        return this.toThe("2");
    };

    Measure.prototype.cubed = function(): any {
        return this.toThe("3");
    };

    return Measure;
}
