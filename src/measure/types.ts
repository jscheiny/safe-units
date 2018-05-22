import {
    AddExponents,
    ArithmeticError,
    DivideExponents,
    Exponent,
    IsArithmeticError,
    MultiplesOf,
    MultiplyExponents,
} from "../exponent";
import { Unit } from "./units";

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

/** Returns the nth root of a unit. This is inverse scalar multiple of the dimension vector. */
export type NthRootUnit<U extends NthRootableUnit<N>, N extends Exponent> = HandleErrors<
    { [Dim in keyof U]: DivideExponents<GetExponent<U, Dim>, N> }
>;

export type NthRootableUnit<N extends Exponent> = Partial<{
    [dimension: string]: MultiplesOf<N>;
}>;

// Error handling

/** Handle errors in the result of an arithmetic operation. */
export type HandleErrors<Result extends ArithmeticResult> = true extends ResultHasError<Result>
    ? ArithmeticError
    : Clean<StripZeroes<RemoveErrors<Result>>>;

export type ResultHasError<Result> = { [Dim in keyof Result]: IsArithmeticError<Result[Dim]> }[keyof Result];

export type RemoveErrors<Result extends ArithmeticResult> = {
    [Dim in keyof Result]: Result[Dim] extends ArithmeticError ? 0 : Result[Dim]
};

export type ArithmeticResult = { [dimension: string]: Exponent | ArithmeticError };

// Utility types

/** Ensures that a type will be displayed nicely in editors / compiler output */
export type Clean<T> = { [K in keyof T]: T[K] };

/** Removes all zero exponent dimensions from a dimension vector */
export type StripZeroes<U extends Unit> = Pick<U, NonZeroKeys<U>>;

export type NonZeroKeys<U extends Unit> = { [Dim in keyof U]: U[Dim] extends 0 ? never : Dim }[keyof U];

export type GetExponent<U extends Unit, K extends string> = K extends keyof Unit
    ? (undefined extends U[K] ? 0 : NonNullable<U[K]>)
    : 0;
