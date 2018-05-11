import { Dimension } from "./common";
import { AddExponents, Exponent, MultiplyExponents, ArithmeticError } from "../exponents";
import { DimensionVector, CompleteDimensionVector } from "./vector";

// Arithmetic

/**
 * Returns the product of two units. The result will be a minimal unit. This can be thought of as the sum of two
 * dimension vectors.
 */
export type MultiplyUnits<Left extends DimensionVector, Right extends DimensionVector> = HandleErrors<
    MultiplyImpl<FillZeroes<Left>, FillZeroes<Right>>
>;

export type MultiplyImpl<Left extends CompleteDimensionVector, Right extends CompleteDimensionVector> = {
    [Dim in Dimension]: AddExponents<Left[Dim], Right[Dim]>
};

/**
 * Returns the quotient of two units. The result will be a minimal unit. This can be thought of as the difference of two
 * dimension vectors.
 */
export type DivideUnits<Left extends DimensionVector, Right extends DimensionVector> = MultiplyUnits<
    Left,
    ExponentiateUnit<Right, -1>
>;

/**
 * Returns the exponentation of a unit to a given power. The result will be a minimal unit. This can be through of as
 * a scalar multiple of the dimension vector.
 */
export type ExponentiateUnit<Vector extends DimensionVector, Power extends Exponent> = HandleErrors<
    ExponentiateImpl<FillZeroes<Vector>, Power>
>;

export type ExponentiateImpl<Vector extends CompleteDimensionVector, Power extends Exponent> = {
    [Dim in Dimension]: MultiplyExponents<Vector[Dim], Power>
};

// Error handling

/** Handle errors in the result of an arithmetic operation. */
export type HandleErrors<Result extends ArithmeticResult> = true extends ResultHasError<Result>
    ? ArithmeticError
    : Clean<StripZeroes<RemoveErrors<Result>>>;

export type ResultHasError<Result> = {
    [Dim in keyof Result]: Result[Dim] extends ArithmeticError ? true : false
}[keyof Result];

export type RemoveErrors<Result extends ArithmeticResult> = {
    [Dim in Dimension]: Result[Dim] extends ArithmeticError ? 0 : Result[Dim]
};

export type ArithmeticResult = { [Dim in Dimension]: Exponent | ArithmeticError };

// Utility types

/** Ensures that a type will be displayed nicely in editors / compiler output */
export type Clean<T> = { [K in keyof T]: T[K] };

/** Removes all zero exponent dimensions from a dimension vector */
export type StripZeroes<Vector extends CompleteDimensionVector> = Pick<Vector, NonZeroKeys<Vector>>;

export type NonZeroKeys<Vector extends DimensionVector> = {
    [Dim in keyof Vector]: Vector[Dim] extends 0 ? never : Dim
}[keyof Vector];

/** Fills in any missing dimensions in a dimension vector with a zero exponent */
export type FillZeroes<Vector extends DimensionVector> = {
    [Dim in Dimension]: FillZeroesImpl<Vector>[Dim] extends undefined ? 0 : NonNullable<FillZeroesImpl<Vector>[Dim]>
};

export type FillZeroesImpl<Vector extends DimensionVector> = Vector & { [Dim in MissingDimensions<Vector>]: 0 };

export type MissingDimensions<Vector extends DimensionVector> = {
    [Dim in Dimension]: Vector[Dim] extends undefined ? Dim : never
}[Dimension];
