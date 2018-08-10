import {
    AddendOf,
    AddExponents,
    ArithmeticError,
    DivideExponents,
    Exponent,
    IsArithmeticError,
    MultiplicandOf,
    MultiplyExponents,
    ProductOf,
} from "../exponent";

export type UnitWithSymbols<U extends Unit = Unit> = { [D in keyof U]+?: [string, NonNullable<U[D]>] };
export type SymbolAndExponent = [string, Exponent];

export type Unit = Partial<{ [dimension: string]: Exponent }>;

// Multiplication

/** Returns the product of two units. This is the sum of two dimension vectors. */
export type MultiplyUnits<L extends Unit, R extends Unit> = HandleErrors<
    { [Dim in keyof L | keyof R]: AddExponents<GetExponent<L, Dim>, GetExponent<R, Dim>> }
>;

/** A type that is assignable from all units that can be multiplied by U without producing an error. */
export type MultiplicandUnit<U extends Unit> = Partial<{ [D in keyof U]: AddendOf<NonNullable<U[D]>> }> & Unit;

// Division

/** Returns the quotient of two units. This is the difference of two dimension vectors. */
export type DivideUnits<L extends Unit, R extends Unit> = HandleErrors<
    { [Dim in keyof L | keyof R]: AddExponents<GetExponent<L, Dim>, MultiplyExponents<GetExponent<R, Dim>, -1>> }
>;

/** A type that is assignable from all units that U can be divided by without producing an error. */
export type DivisorUnit<U extends Unit> = MultiplicandUnit<ExponentiateUnit<U, -1>>;

// Exponentiation

/** Returns the unit raised to a power. This is the scalar multiple of the dimension vector. */
export type ExponentiateUnit<U extends Unit, N extends Exponent> = HandleErrors<
    { [Dim in keyof U]: MultiplyExponents<GetExponent<U, Dim>, N> }
>;

/** A type that is assignable from all units that can be raised to the N without producing an error. */
export type BaseUnit<N extends Exponent> = Partial<{
    [dimension: string]: MultiplicandOf<N>;
}>;

// Roots

/** Returns the nth root of a unit. This is the inverse scalar multiple of the dimension vector. */
export type NthRootUnit<U extends Unit, N extends Exponent> = HandleErrors<
    { [Dim in keyof U]: DivideExponents<GetExponent<U, Dim>, N> }
>;

/** A type that is assignable from all units whose Nth root does not produce an error. */
export type RadicandUnit<D extends Exponent> = Partial<{
    [dimension: string]: ProductOf<D>;
}>;

// Error handling

/** Handle errors in the result of an arithmetic operation. */
type HandleErrors<Result extends ArithmeticResult> = true extends ResultHasError<Result>
    ? ArithmeticError
    : StripZeroes<{ [Dim in keyof Result]: Result[Dim] extends ArithmeticError ? 0 : Result[Dim] }>;

type ResultHasError<Result> = { [Dim in keyof Result]: IsArithmeticError<Result[Dim]> }[keyof Result];

type ArithmeticResult = { [dimension: string]: Exponent | ArithmeticError };

// Utility types

/** Removes all zero exponent dimensions from a dimension vector */
type StripZeroes<U extends Unit> = Pick<U, NonZeroKeys<U>>;

type NonZeroKeys<U extends Unit> = { [Dim in keyof U]: NonNullable<U[Dim]> extends 0 ? never : Dim }[keyof U];

type GetExponent<U extends Unit, K> = K extends keyof Unit ? (undefined extends U[K] ? 0 : NonNullable<U[K]>) : 0;
