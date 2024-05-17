import { UnitSystem } from "./unitSystem";
import { CubeUnit, DivideUnits, MultiplyUnits, ReciprocalUnit, SquareUnit, Unit } from "./unitTypeArithmetic";

export interface MeasureFormatter<N> {
    formatValue?: (value: N) => string;
    formatUnit?: <Basis>(unit: Unit<Basis>, unitSystem: UnitSystem<Basis>) => string;
}

/** The set of numeric operations required to fully represent a `GenericMeasure` for a given numeric type */
export interface NumericOperations<N> {
    /** Returns the multiplicative identity for numbers of type N */
    one(): N;
    /** Returns the negative of a number of type N */
    neg(value: N): N;
    /** Returns the sum of two numbers of type N */
    add(left: N, right: N): N;
    /** Returns the difference of two numbers of type N */
    sub(left: N, right: N): N;
    /** Returns the product of two numbers of type N */
    mult(left: N, right: N): N;
    /** Returns the quotient of two numbers of type N */
    div(left: N, right: N): N;
    /** Returns the reciprocal of the given number of type N */
    reciprocal(value: N): N;
    /** Compares two numbers returning a negative, zero, or positive value. */
    compare(left: N, right: N): number;
    /** Formats a number for display */
    format(value: N): string;
}

/** A numeric value with a corresponding unit of measurement. */
export interface GenericMeasure<N, Basis, U extends Unit<Basis>> {
    /** The numeric value of this measure */
    readonly value: N;
    /** The unit of this measure */
    readonly unit: U;
    /** The unit system of this measure */
    readonly unitSystem: UnitSystem<Basis>;
    /** The symbol of the unit this measure represents (e.g. 0.3048 m = 1 ft) */
    readonly symbol?: string | undefined;

    /**
     * Adds this measure to another measure with the same unit.
     * @param other the value to add
     * @returns the sum
     */
    plus(other: GenericMeasure<N, Basis, U>): GenericMeasure<N, Basis, U>;

    /**
     * Subtracts another measure with the same unit from this measure.
     * @param other the value to subtract
     * @returns the difference
     */
    minus(other: GenericMeasure<N, Basis, U>): GenericMeasure<N, Basis, U>;

    /**
     * Negates the value of this measure.
     * @returns A measure whose value is the negative of this measure
     */
    negate(): GenericMeasure<N, Basis, U>;

    /**
     * Multiplies this measure by a dimensionless value.
     * @param value a scalar dimensionless value by which to scale this measure
     * @returns A measure scaled by the value
     */
    scale(value: N): GenericMeasure<N, Basis, U>;

    /**
     * Multiplies this measure with another measure.
     * @param other the value to multiply
     * @returns the product measure with a unit that's the product of the units
     */
    times<V extends Unit<Basis>>(
        other: GenericMeasure<N, Basis, V>,
    ): GenericMeasure<N, Basis, MultiplyUnits<Basis, U, V>>;

    /**
     * Divides this measure by another measure.
     * @param other the divisor
     * @returns the quotient measure with a unit that's the quotient of the units
     */
    over<V extends Unit<Basis>>(other: GenericMeasure<N, Basis, V>): GenericMeasure<N, Basis, DivideUnits<Basis, U, V>>;

    /**
     * Divides this measure by another measure.
     * @param other the divisor
     * @returns the quotient measure with a unit that's the quotient of the units
     */
    per<V extends Unit<Basis>>(other: GenericMeasure<N, Basis, V>): GenericMeasure<N, Basis, DivideUnits<Basis, U, V>>;

    /**
     * Divides this measure by another measure.
     * @param other the divisor
     * @returns the quotient measure with a unit that's the quotient of the units
     */
    div<V extends Unit<Basis>>(other: GenericMeasure<N, Basis, V>): GenericMeasure<N, Basis, DivideUnits<Basis, U, V>>;

    /**
     * Squares the measure.
     * @returns this measure multiplied by itself
     */
    squared(): GenericMeasure<N, Basis, SquareUnit<Basis, U>>;

    /**
     * Cubes the measure.
     * @returns this cube of this measure with a unit that's the cube of the unit
     */
    cubed(): GenericMeasure<N, Basis, CubeUnit<Basis, U>>;

    /**
     * Returns the reciprocal of this measure.
     * @returns the reciprocal of this measure with a recriprocal unit
     */
    inverse(): GenericMeasure<N, Basis, ReciprocalUnit<Basis, U>>;

    /**
     * Returns the reciprocal of this measure.
     * @returns the reciprocal of this measure with a recriprocal unit
     */
    reciprocal(): GenericMeasure<N, Basis, ReciprocalUnit<Basis, U>>;

    /**
     * Maps the value and possibly unit of this measure.
     * @param valueMap a mapping on the value of the measure
     * @param unitMap an optional mapping on the unit of the measure
     * @returns a new measure whose value and unit have been mapped
     */
    unsafeMap(fn: (value: N) => N): GenericMeasure<N, Basis, U>;
    unsafeMap<V extends Unit<Basis>>(valueMap: (value: N) => N, unitMap: (unit: U) => V): GenericMeasure<N, Basis, V>;

    /**
     * Compares two measures to each other. Returns a negative value if this < other, a postive value if this > other
     * and 0 if the two are equal.
     * @param another measure with the same unit
     * @returns a value indicating how the value of this measure compares to the value of the other measure
     */
    compare(other: GenericMeasure<N, Basis, U>): number;

    /**
     * @param another measure with the same unit
     * @returns true if the value of this measure is less than the value of the other measure
     */
    lt(other: GenericMeasure<N, Basis, U>): boolean;

    /**
     * @param another measure with the same unit
     * @returns true if the value of this measure is less than or equal to the value of the other measure
     */
    lte(other: GenericMeasure<N, Basis, U>): boolean;

    /**
     * @param another measure with the same unit
     * @returns true if the value of this measure is equal to the value of the other measure
     */
    eq(other: GenericMeasure<N, Basis, U>): boolean;

    /**
     * @param another measure with the same unit
     * @returns true if the value of this measure is not equal to the value of the other measure
     */
    neq(other: GenericMeasure<N, Basis, U>): boolean;

    /**
     * @param another measure with the same unit
     * @returns true if the value of this measure is greater than or equal to the value of the other measure
     */
    gte(other: GenericMeasure<N, Basis, U>): boolean;

    /**
     * @param another measure with the same unit
     * @returns true if the value of this measure is greater than the value of the other measure
     */
    gt(other: GenericMeasure<N, Basis, U>): boolean;

    /**
     * Formats the value and the unit.
     * @returns a string representation of measure
     */
    toString(formatter?: MeasureFormatter<N>): string;

    /**
     * Formats this measure as a product of another unit. If the given unit has a symbol, this will format as a number
     * followed by that symbol. If not, this is equivalent to calling `toString()`.
     * @param a unit to be used to represent this measure
     * @returns a string representation of measure
     */
    in(unit: GenericMeasure<N, Basis, U>, formatter?: MeasureFormatter<N>): string;

    /**
     * Returns the value of this measure as a product of another unit. This can be used to quickly convert a measure to
     * that unit and extract its underlying value.
     * @param unit a measure of the same unit to convert this measure into
     * @returns the numeric value of this unit expressed in the given unit
     */
    valueIn(unit: GenericMeasure<N, Basis, U>): N;

    /**
     * Adds a symbol to this measure.
     * @param symbol the symbol of the unit represented by this measure
     */
    withSymbol(symbol: string | undefined): GenericMeasure<N, Basis, U>;

    /** Shallow copies this measure instance. */
    clone(): GenericMeasure<N, Basis, U>;
}

/**
 * Translates a measure type from one numeric type to another while preserving the unit.
 * @example
 * const metersPerSecond = meters.per(seconds);
 * type Velocity<N> = LiftMeasure<typeof metersPerSecond, N>;
 */
export type LiftMeasure<M extends GenericMeasure<any, any, any>, N> =
    M extends GenericMeasure<any, infer Basis, infer Unit> ? GenericMeasure<N, Basis, Unit> : never;
