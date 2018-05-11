import { Dimension } from "./common";
import { AddExponents, Exponent, MultiplyExponents, ArithmeticError } from "../exponents";
import { MinimalDimensionVector, CompleteDimensionVector } from "./vector";

// Arithmetic

/**
 * Returns the product of two units. The result will be a minimal unit. This can be thought of as the sum of two
 * dimension vectors.
 */
export type MultiplyUnits<Left extends MinimalDimensionVector, Right extends MinimalDimensionVector> = Clean<
    HandleErrors<MultiplyImpl<FillZeroes<Left>, FillZeroes<Right>>>
>;

type MultiplyImpl<Left extends CompleteDimensionVector, Right extends CompleteDimensionVector> = {
    [Dim in Dimension]: AddExponents<Left[Dim], Right[Dim]>
};

/**
 * Returns the quotient of two units. The result will be a minimal unit. This can be thought of as the difference of two
 * dimension vectors.
 */
export type DivideUnits<Left extends MinimalDimensionVector, Right extends MinimalDimensionVector> = MultiplyUnits<
    Left,
    ExponentiateUnit<Right, -1>
>;

/**
 * Returns the exponentation of a unit to a given power. The result will be a minimal unit. This can be through of as
 * a scale of the dimension vector.
 */
export type ExponentiateUnit<Vector extends MinimalDimensionVector, Power extends Exponent> = Clean<
    HandleErrors<ExponentiateImpl<FillZeroes<Vector>, Power>>
>;

type ExponentiateImpl<Vector extends CompleteDimensionVector, Power extends Exponent> = {
    [Dim in Dimension]: MultiplyExponents<Vector[Dim], Power>
};

// Error handling

/** Handle errors in the result of an arithmetic operation. */
type HandleErrors<Result extends ArithmeticResult> = true extends ResultHasError<Result>
    ? ArithmeticError
    : StripZeroes<RemoveErrors<Result>>;

type ResultHasError<Result> = {
    [Dim in keyof Result]: Result[Dim] extends ArithmeticError ? true : false
}[keyof Result];

type RemoveErrors<Result extends ArithmeticResult> = {
    [Dim in Dimension]: Result[Dim] extends ArithmeticError ? 0 : Result[Dim]
};

type ArithmeticResult = { [Dim in Dimension]: Exponent | ArithmeticError };

// Utility types

/** Ensures that a type will be displayed nicely in editors / compiler output */
type Clean<T> = { [K in keyof T]: T[K] };

/** Removes all zero exponent dimensions from a dimension vector */
type StripZeroes<Vector extends CompleteDimensionVector> = Pick<Vector, NonZeroKeys<Vector>>;

type NonZeroKeys<Vector extends MinimalDimensionVector> = {
    [Dim in keyof Vector]: Vector[Dim] extends 0 ? never : Dim
}[keyof Vector];

/** Fills in any missing dimensions in a dimension vector with a zero exponent */
type FillZeroes<Vector extends MinimalDimensionVector> = {
    [Dim in Dimension]: FillZeroesImpl<Vector>[Dim] extends undefined ? 0 : NonNullable<FillZeroesImpl<Vector>[Dim]>
};

type FillZeroesImpl<Vector extends MinimalDimensionVector> = Vector & { [Dim in MissingDimensions<Vector>]: 0 };

type MissingDimensions<Vector extends MinimalDimensionVector> = {
    [Dim in Dimension]: Vector[Dim] extends undefined ? Dim : never
}[Dimension];
