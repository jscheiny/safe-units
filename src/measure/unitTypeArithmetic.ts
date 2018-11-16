import {
    AddendOf,
    AddExponents,
    DivideExponents,
    Exponent,
    MultiplicandOf,
    MultiplyExponents,
    NonZeroExponent,
    ProductOf,
} from "../exponent";

export interface Unit {
    [dimension: string]: Exponent | undefined;
}

export type UnitWithSymbols<U extends Unit = Unit> = { [D in keyof U]+?: [string, NonNullable<U[D]>] };
export type SymbolAndExponent = [string, Exponent];

// Multiplication

/** Returns the product of two units. This is the sum of two dimension vectors. */
export type MultiplyUnits<L extends Unit, R extends Unit> = StripZeroes<
    { [Dim in keyof L | keyof R]: AddExponents<GetExponent<L, Dim>, GetExponent<R, Dim>> }
>;

/** A type that is assignable from all units that can be multiplied by U without producing an error. */
export type MultiplicandUnit<U extends Unit> = Partial<{ [D in keyof U]: AddendOf<NonNullable<U[D]>> }> & Unit;

// Division

/** Returns the quotient of two units. This is the difference of two dimension vectors. */
export type DivideUnits<L extends Unit, R extends Unit> = StripZeroes<
    { [Dim in keyof L | keyof R]: AddExponents<GetExponent<L, Dim>, MultiplyExponents<GetExponent<R, Dim>, -1>> }
>;

/** A type that is assignable from all units that U can be divided by without producing an error. */
export type DivisorUnit<U extends Unit> = MultiplicandUnit<ExponentiateUnit<U, -1>>;

// Exponentiation

/** Returns the unit raised to a power. This is the scalar multiple of the dimension vector. */
export type ExponentiateUnit<U extends Unit, N extends Exponent> = 0 extends N
    ? {}
    : 1 extends N ? U : { [Dim in keyof U]: MultiplyExponents<GetExponent<U, Dim>, N> };

/** A type that is assignable from all units that can be raised to the N without producing an error. */
export interface BaseUnit<N extends Exponent> {
    [dimension: string]: MultiplicandOf<N> | undefined;
}

// Roots

/** Returns the nth root of a unit. This is the inverse scalar multiple of the dimension vector. */
export type NthRootUnit<U extends Unit, N extends NonZeroExponent> = 1 extends N
    ? U
    : { [Dim in keyof U]: DivideExponents<GetExponent<U, Dim>, N> };

/** A type that is assignable from all units whose Nth root does not produce an error. */
export interface RadicandUnit<N extends Exponent> {
    [dimension: string]: ProductOf<N> | undefined;
}

// Utility types

/** Removes all zero exponent dimensions from a dimension vector */
type StripZeroes<U extends Unit> = { [Dim in NonZeroKeys<U>]: U[Dim] };

/** Gets the union of all dimensions of a unit with non zero or null exponents */
type NonZeroKeys<U extends Unit> = { [Dim in keyof U]: NonNullable<U[Dim]> extends 0 ? never : Dim }[keyof U];

/** Get the exponent at a given dimension of a unit, or 0 if that dimension is undefined */
export type GetExponent<U extends Unit, D> = D extends keyof U ? NonNullable<U[D]> : 0;
