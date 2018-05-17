import { AddExponents, ArithmeticError, Exponent, MultiplyExponents } from "../exponents";
import { DivideExponents } from "../exponents/division";
import { IsArithmeticError } from "../exponents/utils";
import { DimensionVector } from "./vector";

// Arithmetic

/**
 * Returns the product of two units. The result will be a minimal unit. This can be thought of as the sum of two
 * dimension vectors.
 */
export type MultiplyUnits<Left extends DimensionVector, Right extends DimensionVector> = HandleErrors<
    { [Dim in keyof Left | keyof Right]: AddExponents<GetExponent<Left, Dim>, GetExponent<Right, Dim>> }
>;

/**
 * Returns the quotient of two units. The result will be a minimal unit. This can be thought of as the difference of two
 * dimension vectors.
 */
export type DivideUnits<Left extends DimensionVector, Right extends DimensionVector> = HandleErrors<
    {
        [Dim in keyof Left | keyof Right]: AddExponents<
            GetExponent<Left, Dim>,
            MultiplyExponents<GetExponent<Right, Dim>, -1>
        >
    }
>;

/**
 * Returns the exponentation of a unit to a given power. The result will be a minimal unit. This can be thought of as
 * a scalar multiple of the dimension vector.
 */
export type ExponentiateUnit<Vector extends DimensionVector, Power extends Exponent> = HandleErrors<
    { [Dim in keyof Vector]: MultiplyExponents<GetExponent<Vector, Dim>, Power> }
>;

/**
 * Returns the nth root of a unit. The result will be a minimal unit. This can be thought of as a scalar multiple of
 * the dimension vector by the reciprocal of the root value.
 */
export type NthRootUnit<Vector extends DimensionVector, Root extends Exponent> = HandleErrors<
    { [Dim in keyof Vector]: DivideExponents<GetExponent<Vector, Dim>, Root> }
>;

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
export type StripZeroes<Vector extends DimensionVector> = Pick<Vector, NonZeroKeys<Vector>>;

export type NonZeroKeys<Vector extends DimensionVector> = {
    [Dim in keyof Vector]: Vector[Dim] extends 0 ? never : Dim
}[keyof Vector];

export type GetExponent<Vector extends DimensionVector, Key extends string> = Key extends keyof Vector
    ? (undefined extends Vector[Key] ? 0 : NonNullable<Vector[Key]>)
    : 0;
