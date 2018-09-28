import { Exponent } from "../exponent";
import { formatUnit } from "./format";
import {
    BaseUnit,
    DivideUnits,
    DivisorUnit,
    ExponentiateUnit,
    MultiplicandUnit,
    MultiplyUnits,
    Unit,
    UnitWithSymbols,
} from "./unitTypeArithmetic";
import { dimension, divideUnits, exponentiateUnit, multiplyUnits } from "./unitValueArithmetic";

export interface Numeric<N> {
    one(): N;
    neg(value: N): N;
    add(left: N, right: N): N;
    sub(left: N, right: N): N;
    mult(left: N, right: N): N;
    div(left: N, right: N): N;
    pow(base: N, exponent: Exponent): N;
    lt(left: N, right: N): boolean;
    lte(left: N, right: N): boolean;
    eq(left: N, right: N): boolean;
    neq(left: N, right: N): boolean;
    gte(left: N, right: N): boolean;
    gt(left: N, right: N): boolean;
    format(value: N): string;
}

export interface GenericMeasureFactory<N> {
    class: new (...args: any[]) => GenericMeasure<any, N>;
    dimension<Dim extends string>(dim: Dim, symbol?: string): GenericMeasure<{ [D in Dim]: 1 }, N>;
    dimensionless(value: N): GenericMeasure<{}, N>;
    of<U extends Unit>(value: N, quantity: GenericMeasure<U, N>, symbol?: string): GenericMeasure<U, N>;
    unsafeConstruct<U extends Unit>(value: N, unit: UnitWithSymbols<U>, symbol?: string): GenericMeasure<U, N>;
}

export interface GenericMeasure<U extends Unit, N> {
    readonly value: N;
    readonly unit: UnitWithSymbols<U>;
    readonly symbol: string | undefined;
    // Methods
    squared: U extends BaseUnit<2> ? () => GenericMeasure<ExponentiateUnit<U, 2>, N> : never;
    cubed: U extends BaseUnit<3> ? () => GenericMeasure<ExponentiateUnit<U, 3>, N> : never;
    pow<E extends Exponent>(exponent: E): GenericMeasure<ExponentiateUnit<U, E>, N>;
    withSymbol(symbol: String): GenericMeasure<U, N>;
    normalized(): GenericMeasure<U, N>;
    plus(other: GenericMeasure<U, N>): GenericMeasure<U, N>;
    minus(other: GenericMeasure<U, N>): GenericMeasure<U, N>;
    negate(): GenericMeasure<U, N>;
    scale(value: N | GenericMeasure<{}, N>): GenericMeasure<U, N>;
    times<V extends MultiplicandUnit<U>>(other: GenericMeasure<V, N>): GenericMeasure<MultiplyUnits<U, V>, N>;
    over<V extends DivisorUnit<U>>(other: GenericMeasure<V, N>): GenericMeasure<DivideUnits<U, V>, N>;
    per<V extends DivisorUnit<U>>(other: GenericMeasure<V, N>): GenericMeasure<DivideUnits<U, V>, N>;
    inverse(): GenericMeasure<ExponentiateUnit<U, -1>, N>;
    reciprocal(): GenericMeasure<ExponentiateUnit<U, -1>, N>;
    isLessThan(other: GenericMeasure<U, N>): boolean;
    isLessThanOrEqualTo(other: GenericMeasure<U, N>): boolean;
    isEqualTo(other: GenericMeasure<U, N>): boolean;
    isNotEqualTo(other: GenericMeasure<U, N>): boolean;
    isGreaterThanOrEqualTo(other: GenericMeasure<U, N>): boolean;
    isGreaterThan(other: GenericMeasure<U, N>): boolean;
    toString(): string;
    in(unit: GenericMeasure<U, N>): string;
}

export function createMeasureType<N>(num: Numeric<N>): GenericMeasureFactory<N> {
    class InternalMeasure<U extends Unit> implements GenericMeasure<U, N> {
        public readonly symbol: string | undefined;
        public squared!: U extends BaseUnit<2> ? () => GenericMeasure<ExponentiateUnit<U, 2>, N> : never;
        public cubed!: U extends BaseUnit<3> ? () => GenericMeasure<ExponentiateUnit<U, 3>, N> : never;

        constructor(public readonly value: N, public readonly unit: UnitWithSymbols<U>, symbol?: string | undefined) {
            this.symbol = symbol;
        }

        public withSymbol(symbol: string): GenericMeasure<U, N> {
            return new InternalMeasure(this.value, this.unit, symbol);
        }

        // Arithmetic

        public normalized(): GenericMeasure<U, N> {
            return new InternalMeasure(num.one(), this.unit);
        }

        public plus(other: GenericMeasure<U, N>): GenericMeasure<U, N> {
            return new InternalMeasure(num.add(this.value, other.value), this.unit);
        }

        public minus(other: GenericMeasure<U, N>): GenericMeasure<U, N> {
            return new InternalMeasure(num.sub(this.value, other.value), this.unit);
        }

        public negate(): GenericMeasure<U, N> {
            return new InternalMeasure(num.neg(this.value), this.unit);
        }

        public scale(value: N | GenericMeasure<{}, N>): GenericMeasure<U, N> {
            const numericValue: N = value instanceof InternalMeasure ? value.value : value;
            return new InternalMeasure(num.mult(numericValue, this.value), this.unit);
        }

        public times<V extends MultiplicandUnit<U>>(
            other: GenericMeasure<V, N>,
        ): GenericMeasure<MultiplyUnits<U, V>, N> {
            return new InternalMeasure(num.mult(this.value, other.value), multiplyUnits(this.unit, other.unit));
        }

        public over<V extends DivisorUnit<U>>(other: GenericMeasure<V, N>): GenericMeasure<DivideUnits<U, V>, N> {
            return new InternalMeasure(num.div(this.value, other.value), divideUnits(this.unit, other.unit));
        }

        public per<V extends DivisorUnit<U>>(other: GenericMeasure<V, N>): GenericMeasure<DivideUnits<U, V>, N> {
            return this.over(other);
        }

        public pow<E extends Exponent>(power: E): GenericMeasure<ExponentiateUnit<U, E>, N> {
            return new InternalMeasure(num.pow(this.value, power), exponentiateUnit(this.unit as any, power)) as any;
        }

        public inverse(): GenericMeasure<ExponentiateUnit<U, -1>, N> {
            return new InternalMeasure(num.div(num.one(), this.value), exponentiateUnit(this.unit, -1));
        }

        public reciprocal(): GenericMeasure<ExponentiateUnit<U, -1>, N> {
            return this.inverse();
        }

        // Comparisons

        public isLessThan(other: GenericMeasure<U, N>): boolean {
            return num.lt(this.value, other.value);
        }

        public isLessThanOrEqualTo(other: GenericMeasure<U, N>): boolean {
            return num.lte(this.value, other.value);
        }

        public isEqualTo(other: GenericMeasure<U, N>): boolean {
            return num.eq(this.value, other.value);
        }

        public isNotEqualTo(other: GenericMeasure<U, N>): boolean {
            return num.neq(this.value, other.value);
        }

        public isGreaterThanOrEqualTo(other: GenericMeasure<U, N>): boolean {
            return num.gte(this.value, other.value);
        }

        public isGreaterThan(other: GenericMeasure<U, N>): boolean {
            return num.gt(this.value, other.value);
        }

        // Formatting

        public toString(): string {
            return `${num.format(this.value)}${formatUnit(this.unit)}`;
        }

        public in(unit: GenericMeasure<U, N>): string {
            if (unit.symbol === undefined) {
                return this.toString();
            }
            const value = num.format(num.div(this.value, unit.value));
            return `${value} ${unit.symbol}`;
        }
    }

    InternalMeasure.prototype.squared = function(): any {
        return this.pow(2);
    };

    InternalMeasure.prototype.cubed = function(): any {
        return this.pow(3);
    };

    return {
        class: InternalMeasure,
        dimension: <Dim extends string>(dim: Dim, symbol?: string): GenericMeasure<{ [D in Dim]: 1 }, N> => {
            return new InternalMeasure(num.one(), dimension(dim, symbol), symbol);
        },
        dimensionless: (value: N): GenericMeasure<{}, N> => {
            return new InternalMeasure(value, {});
        },
        of: <U extends Unit>(value: N, quantity: GenericMeasure<U, N>, symbol?: string): GenericMeasure<U, N> => {
            return new InternalMeasure(num.mult(value, quantity.value), quantity.unit, symbol);
        },
        unsafeConstruct: <U extends Unit>(
            value: N,
            unit: UnitWithSymbols<U>,
            symbol?: string,
        ): GenericMeasure<U, N> => {
            return new InternalMeasure(value, unit, symbol);
        },
    };
}
