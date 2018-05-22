import {
    AddExponents,
    ArithmeticError,
    DivideExponents,
    Exponent,
    IsArithmeticError,
    MultiplyExponents,
} from "../exponent";
import { Unit } from "./units";

// Arithmetic

// The duplication in the type and helper types below is purposeful. If the type were implemented in the way that the
// helper type was, the error messages TS produced would be deeply nested and hard to read. For example:
//    Measure<Clean<Pick<RemoveErrors<{ length: 1, time: -2 }>, "length" | "time">>>
// By wrapping them in a mapped type the TS compiler will evaluate the type before displaying creating the much nicer:
//    Measure<{ length: 1, time: -2 }>

/** Returns the product of two units. This is the sum of two dimension vectors. */
export type MultiplyUnits<L extends Unit, R extends Unit> = MultiplyHelper<L, R> extends ArithmeticError
    ? ArithmeticError
    : { [K in keyof MultiplyHelper<L, R>]: MultiplyHelper<L, R>[K] };

export type MultiplyHelper<L extends Unit, R extends Unit> = HandleErrors<
    { [Dim in keyof L | keyof R]: AddExponents<GetExponent<L, Dim>, GetExponent<R, Dim>> }
>;

/** Returns the quotient of two units. This is the difference of two dimension vectors. */
export type DivideUnits<L extends Unit, R extends Unit> = DivideHelper<L, R> extends ArithmeticError
    ? ArithmeticError
    : { [K in keyof DivideHelper<L, R>]: DivideHelper<L, R>[K] };

export type DivideHelper<L extends Unit, R extends Unit> = HandleErrors<
    { [Dim in keyof L | keyof R]: AddExponents<GetExponent<L, Dim>, MultiplyExponents<GetExponent<R, Dim>, -1>> }
>;

/** Returns the unit raised to a power. This is the scalar multiple of the dimension vector. */
export type ExponentiateUnit<U extends Unit, N extends Exponent> = ExponentiateHelper<U, N> extends ArithmeticError
    ? ArithmeticError
    : { [K in keyof ExponentiateHelper<U, N>]: ExponentiateHelper<U, N>[K] };

export type ExponentiateHelper<U extends Unit, N extends Exponent> = HandleErrors<
    { [Dim in keyof U]: MultiplyExponents<GetExponent<U, Dim>, N> }
>;

/** Returns the nth root of a unit. This is inverse scalar multiple of the dimension vector. */
export type NthRootUnit<U extends Unit, N extends Exponent> = NthRootHelper<U, N> extends ArithmeticError
    ? ArithmeticError
    : { [K in keyof NthRootHelper<U, N>]: NthRootHelper<U, N>[K] };

export type NthRootHelper<U extends Unit, N extends Exponent> = HandleErrors<
    { [Dim in keyof U]: DivideExponents<GetExponent<U, Dim>, N> }
>;

// Error handling

/** Handle errors in the result of an arithmetic operation. */
export type HandleErrors<Result extends ArithmeticResult> = true extends ResultHasError<Result>
    ? ArithmeticError
    : StripZeroes<RemoveErrors<Result>>;

export type ResultHasError<Result> = { [Dim in keyof Result]: IsArithmeticError<Result[Dim]> }[keyof Result];

export type RemoveErrors<Result extends ArithmeticResult> = {
    [Dim in keyof Result]: Result[Dim] extends ArithmeticError ? 0 : Result[Dim]
};

export type ArithmeticResult = { [dimension: string]: Exponent | ArithmeticError };

// Utility types

/** Removes all zero exponent dimensions from a dimension vector */
export type StripZeroes<U extends Unit> = Pick<U, NonZeroKeys<U>>;

export type NonZeroKeys<U extends Unit> = { [Dim in keyof U]: U[Dim] extends 0 ? never : Dim }[keyof U];

export type GetExponent<U extends Unit, K extends string> = K extends keyof Unit
    ? (undefined extends U[K] ? 0 : NonNullable<U[K]>)
    : 0;
