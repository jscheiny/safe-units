import { MinimalUnit, CompleteUnit, FillZeroes, Dimension, StripZeroes } from "./common";
import { AddExponents, Exponent, MultiplyExponents, ArithmeticError } from "../exponents";

/**
 * Returns the product of two units. The result will be a minimal unit. This can be thought of as the sum of two
 * dimension vectors.
 */
export type MultiplyUnits<Left extends MinimalUnit, Right extends MinimalUnit> = HandleErrors<
    MultiplyImpl<FillZeroes<Left>, FillZeroes<Right>>
>;

type MultiplyImpl<Left extends CompleteUnit, Right extends CompleteUnit> = {
    [Dim in Dimension]: AddExponents<Left[Dim], Right[Dim]>
};

/**
 * Returns the quotient of two units. The result will be a minimal unit. This can be thought of as the difference of two
 * dimension vectors.
 */
export type DivideUnits<Left extends MinimalUnit, Right extends MinimalUnit> = MultiplyUnits<
    Left,
    ExponentiateUnit<Right, -1>
>;

/**
 * Returns the exponentation of a unit to a given power. The result will be a minimal unit. This can be through of as
 * a scale of the dimension vector.
 */
export type ExponentiateUnit<Unit extends MinimalUnit, Power extends Exponent> = HandleErrors<
    ExponentiateImpl<FillZeroes<Unit>, Power>
>;

type ExponentiateImpl<Unit extends CompleteUnit, Power extends Exponent> = {
    [Dim in Dimension]: MultiplyExponents<Unit[Dim], Power>
};

/**
 * Handle errors in the result of an arithmetic operation.
 */
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
