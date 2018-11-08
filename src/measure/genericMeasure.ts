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

/** The set of numeric operations required to fully represent a `GenericMeasure` for a given numeric type */
export interface Numeric<N> {
    guard(value: any): value is N;
    one(): N;
    neg(value: N): N;
    add(left: N, right: N): N;
    sub(left: N, right: N): N;
    mult(left: N, right: N): N;
    div(left: N, right: N): N;
    pow(base: N, exponent: Exponent): N;
    compare(left: N, right: N): number;
    format(value: N): string;
}

/** The functions needed to construct a measure of a given numeric type */
export interface GenericMeasureFactory<N> {
    /** The constructor for this generic measure type, useful for doing `instanceof` checks. */
    class: new (...args: any[]) => GenericMeasure<any, N>;

    /**
     * Creates a new dimension base unit.
     * @param dim a unique string literal which names this dimension (e.g. "length")
     * @param symbol the symbol of the base unit of the dimension (e.g. "m")
     * @returns A measure representing 1 base unit of the dimension (1 m)
     */
    dimension<Dim extends string>(dim: Dim, symbol?: string): GenericMeasure<{ [D in Dim]: 1 }, N>;

    /**
     * Creates a dimensionless measure.
     * @param value the value of the measure
     * @returns a measure with no dimensions
     */
    dimensionless(value: N): GenericMeasure<{}, N>;

    /**
     * Creates a measure as a multiple of another measure.
     * @param value the number of measures
     * @param quantity the measure to be multiplied
     * @param symbol an optional unit symbol for this measure
     * @returns a measure of value number of quantities.
     */
    of<U extends Unit>(value: N, quantity: GenericMeasure<U, N>, symbol?: string): GenericMeasure<U, N>;

    /**
     * Creates a measure from a raw unit, should be avoided unless you know what you're doing.
     * @param value the value of the measure
     * @param unit the raw unit of the measure
     * @param symbol an optional unit symbo for this measure
     */
    unsafeConstruct<U extends Unit>(value: N, unit: UnitWithSymbols<U>, symbol?: string): GenericMeasure<U, N>;
}

/** A numeric value with a corresponding unit of measurement. */
export interface GenericMeasure<U extends Unit, N> {
    /** The numeric value of this measure */
    readonly value: N;
    /** The unit of this measure */
    readonly unit: UnitWithSymbols<U>;
    /** The symbol of the unit this measure represents (e.g. 0.3048 m = 1 ft) */
    readonly symbol: string | undefined;

    /**
     * If this measure can be squared, squares it. If this measure is not squarable (due to exponent limitations), then
     * this function will have type `never`.
     * @returns this measure multiplied by itself
     */
    squared: U extends BaseUnit<2> ? () => GenericMeasure<ExponentiateUnit<U, 2>, N> : never;

    /**
     * If this measure can be cubed, cubes it. If this measure cannot be cubed (due to exponent limitations), then
     * this function will have type `never`.
     * @returns this cube of this measure
     */
    cubed: U extends BaseUnit<3> ? () => GenericMeasure<ExponentiateUnit<U, 3>, N> : never;

    /**
     * Raises this measure to a given power. If the result would give exponents outside of the allowable bounds, this
     * will return `never`.
     * @param exponent the exponent to raise this measure to
     * @returns this exponent to the given power
     */
    pow<E extends Exponent>(exponent: E): U extends BaseUnit<E> ? GenericMeasure<ExponentiateUnit<U, E>, N> : never;

    /**
     * Raises this measure to a given power. If the result would give exponents outside of the allowable bounds, this
     * will return `never`.
     * @param exponent the exponent to raise this measure to
     * @returns this exponent to the given power
     */
    toThe<E extends Exponent>(exponent: E): U extends BaseUnit<E> ? GenericMeasure<ExponentiateUnit<U, E>, N> : never;

    /**
     * Adds a symbol to this measure.
     * @param symbol the symbol of the unit represented by this measure
     */
    withSymbol(symbol: String): GenericMeasure<U, N>;

    /**
     * Adds this measure to another measure with the same unit.
     * @param other the value to add
     * @returns the sum
     */
    plus(other: GenericMeasure<U, N>): GenericMeasure<U, N>;

    /**
     * Subtracts another measure with the same unit from this measure.
     * @param other the value to subtract
     * @returns the difference
     */
    minus(other: GenericMeasure<U, N>): GenericMeasure<U, N>;

    /**
     * Negates the value of this measure.
     * @returns A measure whose value is the negative of this measure
     */
    negate(): GenericMeasure<U, N>;

    /**
     * Multiplies this measure by a dimensionless value.
     * @param value a scalar dimensionless value by which to scale this measure
     * @returns A measure scaled by the value
     */
    scale(value: N | GenericMeasure<{}, N>): GenericMeasure<U, N>;

    /**
     * Multiplies this measure with another measure.
     * @param other the value to multiply
     * @returns the product measure with a unit thats the product of the units
     */
    times<V extends MultiplicandUnit<U>>(other: GenericMeasure<V, N>): GenericMeasure<MultiplyUnits<U, V>, N>;

    /**
     * Divides this measure by another measure.
     * @param other the divisor
     * @returns the quotient measure with a unit thats the quotient of the units
     */
    over<V extends DivisorUnit<U>>(other: GenericMeasure<V, N>): GenericMeasure<DivideUnits<U, V>, N>;

    /**
     * Divides this measure by another measure.
     * @param other the divisor
     * @returns the quotient measure with a unit thats the quotient of the units
     */
    per<V extends DivisorUnit<U>>(other: GenericMeasure<V, N>): GenericMeasure<DivideUnits<U, V>, N>;

    /**
     * Divides this measure by another measure.
     * @param other the divisor
     * @returns the quotient measure with a unit thats the quotient of the units
     */
    div<V extends DivisorUnit<U>>(other: GenericMeasure<V, N>): GenericMeasure<DivideUnits<U, V>, N>;

    /**
     * Returns the reciprocal of this measure.
     * @returns the reciprocal of this measure with a recriprocal unit
     */
    inverse(): GenericMeasure<ExponentiateUnit<U, -1>, N>;

    /**
     * Returns the reciprocal of this measure.
     * @returns the reciprocal of this measure with a recriprocal unit
     */
    reciprocal(): GenericMeasure<ExponentiateUnit<U, -1>, N>;

    /**
     * Maps the value of this measure without affecting the unit. This should be used for writing unit safe functions
     * that only alter the value of a measure (e.g. abs).
     * @param fn a mapping on the value of the measure
     * @returns a new measure with the same unit whose value has been mapped
     */
    unsafeMap(fn: (value: N) => N): GenericMeasure<U, N>;

    /**
     * Compares two measures to each other. Returns a negative value if this < other, a postive value if this > other
     * and 0 if the two are equal.
     * @param another measure with the same unit
     * @returns a value indicating how the value of this measure compares to the value of the other measure
     */
    compare(other: GenericMeasure<U, N>): number;

    /**
     * @param another measure with the same unit
     * @returns true if the value of this measure is less than the value of the other measure
     */
    lt(other: GenericMeasure<U, N>): boolean;

    /**
     * @param another measure with the same unit
     * @returns true if the value of this measure is less than or equal to the value of the other measure
     */
    lte(other: GenericMeasure<U, N>): boolean;

    /**
     * @param another measure with the same unit
     * @returns true if the value of this measure is equal to the value of the other measure
     */
    eq(other: GenericMeasure<U, N>): boolean;

    /**
     * @param another measure with the same unit
     * @returns true if the value of this measure is not equal to the value of the other measure
     */
    neq(other: GenericMeasure<U, N>): boolean;

    /**
     * @param another measure with the same unit
     * @returns true if the value of this measure is greater than or equal to the value of the other measure
     */
    gte(other: GenericMeasure<U, N>): boolean;

    /**
     * @param another measure with the same unit
     * @returns true if the value of this measure is greater than the value of the other measure
     */
    gt(other: GenericMeasure<U, N>): boolean;

    /**
     * Formats the value and the unit.
     * @returns a string representation of measure
     */
    toString(): string;

    /**
     * Formats this measure as a product of another unit. If the given unit has a symbol, this will format as a number
     * followed by that symbol. If not, this is equivalent to calling `toString()`.
     * @param a unit to be used to represent this measure
     * @returns a string representation of measure
     */
    in(unit: GenericMeasure<U, N>): string;
}

/**
 * Creates a new measure factory for a given numeric type. The numeric type of the measure is inferred from the
 * parameter.
 * @param num the set of numeric operations needed to implement a measure for an arbitrary numeric type
 * @returns a factory for constructing measures of the given numeric type
 * @example
 * type MyMeasure<U extends Unit> = GenericMeasure<U, MyNumberType>;
 * const MyMeasure = createMeasureType({ ... });
 */
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
            const numericValue = num.guard(value) ? value : value.value;
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

        public div<V extends DivisorUnit<U>>(other: GenericMeasure<V, N>): GenericMeasure<DivideUnits<U, V>, N> {
            return this.over(other);
        }

        public pow<E extends Exponent>(
            power: E,
        ): U extends BaseUnit<E> ? GenericMeasure<ExponentiateUnit<U, E>, N> : never {
            return new InternalMeasure(num.pow(this.value, power), exponentiateUnit(this.unit as any, power)) as any;
        }

        public toThe<E extends Exponent>(
            power: E,
        ): U extends BaseUnit<E> ? GenericMeasure<ExponentiateUnit<U, E>, N> : never {
            return this.pow(power);
        }

        public inverse(): GenericMeasure<ExponentiateUnit<U, -1>, N> {
            return this.pow(-1);
        }

        public reciprocal(): GenericMeasure<ExponentiateUnit<U, -1>, N> {
            return this.pow(-1);
        }

        public unsafeMap(fn: (value: N) => N): GenericMeasure<U, N> {
            return new InternalMeasure(fn(this.value), this.unit);
        }

        // Comparisons

        public compare(other: GenericMeasure<U, N>): number {
            return num.compare(this.value, other.value);
        }

        public lt(other: GenericMeasure<U, N>): boolean {
            return this.compare(other) < 0;
        }

        public lte(other: GenericMeasure<U, N>): boolean {
            return this.compare(other) <= 0;
        }

        public eq(other: GenericMeasure<U, N>): boolean {
            return this.compare(other) === 0;
        }

        public neq(other: GenericMeasure<U, N>): boolean {
            return this.compare(other) !== 0;
        }

        public gte(other: GenericMeasure<U, N>): boolean {
            return this.compare(other) >= 0;
        }

        public gt(other: GenericMeasure<U, N>): boolean {
            return this.compare(other) > 0;
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
        return this.toThe(2);
    };

    InternalMeasure.prototype.cubed = function(): any {
        return this.toThe(3);
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
