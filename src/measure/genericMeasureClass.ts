import { formatUnit } from "./format";
import { GenericMeasure, Numeric } from "./genericMeasure";
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

export interface GenericMeasureConstructor<N> {
    new <U extends Unit>(value: N, unit: UnitWithSymbols<U>, symbol?: string): GenericMeasure<N, U>;
}

export function createMeasureClass<N>(num: Numeric<N>): GenericMeasureConstructor<N> {
    class InternalMeasure<U extends Unit> implements GenericMeasure<N, U> {
        public readonly symbol: string | undefined;
        public squared!: 2 extends AllowedExponents<U> ? () => GenericMeasure<N, ExponentiateUnit<U, 2>> : never;
        public cubed!: 3 extends AllowedExponents<U> ? () => GenericMeasure<N, ExponentiateUnit<U, 3>> : never;

        constructor(public readonly value: N, public readonly unit: UnitWithSymbols<U>, symbol?: string) {
            this.symbol = symbol;
        }

        // Arithmetic

        public plus(other: GenericMeasure<N, U>): GenericMeasure<N, U> {
            return new InternalMeasure(num.add(this.value, other.value), this.unit);
        }

        public minus(other: GenericMeasure<N, U>): GenericMeasure<N, U> {
            return new InternalMeasure(num.sub(this.value, other.value), this.unit);
        }

        public negate(): GenericMeasure<N, U> {
            return new InternalMeasure(num.neg(this.value), this.unit);
        }

        public scale(value: N): GenericMeasure<N, U> {
            return new InternalMeasure(num.mult(this.value, value), this.unit);
        }

        public times<V extends MultiplicandUnit<U>>(
            other: GenericMeasure<N, V>,
        ): GenericMeasure<N, MultiplyUnits<U, V>> {
            return new InternalMeasure(num.mult(this.value, other.value), multiplyUnits(this.unit, other.unit));
        }

        public over<V extends DivisorUnit<U>>(other: GenericMeasure<N, V>): GenericMeasure<N, DivideUnits<U, V>> {
            return new InternalMeasure(num.div(this.value, other.value), divideUnits(this.unit, other.unit));
        }

        public per<V extends DivisorUnit<U>>(other: GenericMeasure<N, V>): GenericMeasure<N, DivideUnits<U, V>> {
            return this.over(other);
        }

        public div<V extends DivisorUnit<U>>(other: GenericMeasure<N, V>): GenericMeasure<N, DivideUnits<U, V>> {
            return this.over(other);
        }

        public toThe<E extends AllowedExponents<U>>(power: E): GenericMeasure<N, ExponentiateUnit<U, E>> {
            return new InternalMeasure(num.pow(this.value, power), exponentiateUnit(this.unit, power)) as any;
        }

        public inverse(): GenericMeasure<N, ExponentiateUnit<U, -1>> {
            return this.toThe(-1);
        }

        public reciprocal(): GenericMeasure<N, ExponentiateUnit<U, -1>> {
            return this.toThe(-1);
        }

        public unsafeMap<V extends Unit>(
            valueMap: (value: N) => N,
            unitMap?: (unit: UnitWithSymbols<U>) => UnitWithSymbols<V>,
        ): GenericMeasure<N, U | V> {
            const newUnit = unitMap === undefined ? this.unit : unitMap(this.unit);
            return new InternalMeasure<U | V>(valueMap(this.value), newUnit);
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

        public toString(): string {
            return `${num.format(this.value)}${formatUnit(this.unit)}`;
        }

        public in(unit: GenericMeasure<N, U>): string {
            if (unit.symbol === undefined) {
                return this.toString();
            }
            const value = num.format(num.div(this.value, unit.value));
            return `${value} ${unit.symbol}`;
        }

        public withSymbol(symbol: string | undefined): GenericMeasure<N, U> {
            return new InternalMeasure(this.value, this.unit, symbol);
        }

        public clone(): GenericMeasure<N, U> {
            return new InternalMeasure(this.value, this.unit);
        }
    }

    InternalMeasure.prototype.squared = function(): any {
        return this.toThe(2);
    };

    InternalMeasure.prototype.cubed = function(): any {
        return this.toThe(3);
    };

    return InternalMeasure;
}
