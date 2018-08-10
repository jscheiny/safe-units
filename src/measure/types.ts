import {
    AddExponents,
    ArithmeticError,
    DivideExponents,
    Exponent,
    IsArithmeticError,
    MultiplyExponents,
} from "../exponent";

export type UnitWithSymbols<U extends Unit = Unit> = { [D in keyof U]+?: [string, NonNullable<U[D]>] };
export type SymbolAndExponent = [string, Exponent];

export type Unit = Partial<{ [dimension: string]: Exponent }>;

// Arithmetic

/** Returns the product of two units. This is the sum of two dimension vectors. */
export type MultiplyUnits<L extends Unit, R extends Unit> = HandleErrors<
    { [Dim in keyof L | keyof R]: AddExponents<GetExponent<L, Dim>, GetExponent<R, Dim>> }
>;

/** Returns the quotient of two units. This is the difference of two dimension vectors. */
export type DivideUnits<L extends Unit, R extends Unit> = HandleErrors<
    { [Dim in keyof L | keyof R]: AddExponents<GetExponent<L, Dim>, MultiplyExponents<GetExponent<R, Dim>, -1>> }
>;

/** Returns the unit raised to a power. This is the scalar multiple of the dimension vector. */
export type ExponentiateUnit<U extends Unit, N extends Exponent> = HandleErrors<
    { [Dim in keyof U]: MultiplyExponents<GetExponent<U, Dim>, N> }
>;

/** A type that is assignable from all units that can be raised to the N. */
export type ExponentiableUnit<N extends Exponent> = Partial<{
    [dimension: string]: MultipliersOf<N>;
}>;

type MultipliersOf<N extends Exponent> = 0 extends N
    ? Exponent
    : Exclude<DivideExponents<Exponent, N>, ArithmeticError>;

/** Returns the nth root of a unit. This is the inverse scalar multiple of the dimension vector. */
export type NthRootUnit<U extends Unit, N extends Exponent> = HandleErrors<
    { [Dim in keyof U]: DivideExponents<GetExponent<U, Dim>, N> }
>;

/** A type that is assignable from all units whose Nth root is valid. */
export type NthRootableUnit<N extends Exponent> = Partial<{
    [dimension: string]: MultiplesOf<N>;
}>;

type MultiplesOf<N extends Exponent> = Exclude<MultiplyExponents<Exponent, N>, ArithmeticError>;

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
