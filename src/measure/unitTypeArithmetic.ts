import {
    AddendOf,
    AddExponents,
    DivideExponents,
    Exponent,
    MultiplicandOf,
    MultiplyExponents,
    ProductOf,
} from "../exponent";

export type UnitWithSymbols<U extends Unit = Unit> = { [D in keyof U]+?: [string, NonNullable<U[D]>] };
export type SymbolAndExponent = [string, Exponent];

export interface Unit {
    [dimension: string]: Exponent | undefined;
}

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
export type ExponentiateUnit<U extends Unit, N extends Exponent> = StripZeroes<
    { [Dim in keyof U]: MultiplyExponents<GetExponent<U, Dim>, N> }
>;

/** A type that is assignable from all units that can be raised to the N without producing an error. */
export type BaseUnit<N extends Exponent> = Partial<{
    [dimension: string]: MultiplicandOf<N>;
}>;

// Roots

/** Returns the nth root of a unit. This is the inverse scalar multiple of the dimension vector. */
export type NthRootUnit<U extends Unit, N extends Exponent> = StripZeroes<
    { [Dim in keyof U]: DivideExponents<GetExponent<U, Dim>, N> }
>;

/** A type that is assignable from all units whose Nth root does not produce an error. */
export type RadicandUnit<N extends Exponent> = Partial<{
    [dimension: string]: ProductOf<N>;
}>;

// Utility types

/** Removes all zero exponent dimensions from a dimension vector */
type StripZeroes<U extends Unit> = Pick<U, NonZeroKeys<U>>;

type NonZeroKeys<U extends Unit> = { [Dim in keyof U]: NonNullable<U[Dim]> extends 0 ? never : Dim }[keyof U];

/** Get the exponent at a given dimension of a unit, or 0 if that dimension is undefined */
type GetExponent<U extends Unit, D> = D extends keyof Unit ? (undefined extends U[D] ? 0 : NonNullable<U[D]>) : 0;
