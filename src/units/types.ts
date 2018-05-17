import {
    AddExponents,
    ArithmeticError,
    DivideExponents,
    Exponent,
    IsArithmeticError,
    MultiplyExponents,
} from "../exponents";
import { ArithmeticError } from "../exponents/common";
import { DimensionVector } from "./vector";

// Arithmetic

/** Returns the product of two units. This is the sum of the two dimension vectors. */
export type MultiplyUnits<
    Basis extends string,
    Left extends DimensionVector<Basis>,
    Right extends DimensionVector<Basis>
> = HandleErrors<
    Basis,
    { [Dim in Basis]: AddExponents<GetExponent<Basis, Left, Dim>, GetExponent<Basis, Right, Dim>> }
>;

/** Returns the quotient of two units. This is the difference of two dimension vectors. */
export type DivideUnits<
    Basis extends string,
    Left extends DimensionVector<Basis>,
    Right extends DimensionVector<Basis>
> = HandleErrors<
    Basis,
    {
        [Dim in Basis]: AddExponents<
            GetExponent<Basis, Left, Dim>,
            MultiplyExponents<GetExponent<Basis, Right, Dim>, -1>
        >
    }
>;

/** Returns the exponentation of a unit to a given power. This is a scalar multiple of the dimension vector. */
export type ExponentiateUnit<
    Basis extends string,
    Vector extends DimensionVector<Basis>,
    Power extends Exponent
> = HandleErrors<Basis, { [Dim in Basis]: MultiplyExponents<GetExponent<Basis, Vector, Dim>, Power> }>;

/** Returns the nth root of a unit. This is a scalar multiple of the dimension vector by the reciprocal of the root. */
export type NthRootUnit<
    Basis extends string,
    Vector extends DimensionVector<Basis>,
    Root extends Exponent
> = HandleErrors<Basis, { [Dim in Basis]: DivideExponents<GetExponent<Basis, Vector, Dim>, Root> }>;

// Error handling

/** Handle errors in the result of an arithmetic operation. */
export type HandleErrors<Basis extends string, Result extends ArithmeticResult<Basis>> = true extends ResultHasError<
    Result
>
    ? ArithmeticError
    : Clean<StripZeroes<Basis, RemoveErrors<Basis, Result>>>;

export type ResultHasError<Result> = { [Dim in keyof Result]: IsArithmeticError<Result[Dim]> }[keyof Result];

export type RemoveErrors<Basis extends string, Result extends ArithmeticResult<Basis>> = {
    [Dim in Basis]: Result[Dim] extends ArithmeticError ? 0 : Result[Dim]
};

export type ArithmeticResult<Basis extends string> = { [Dim in Basis]: Exponent | ArithmeticError | undefined };

// Utility types

/** Ensures that a type will be displayed nicely in editors / compiler output */
export type Clean<T> = { [K in keyof T]: T[K] };

/** Removes all zero exponent dimensions from a dimension vector */
export type StripZeroes<Basis extends string, Vector extends DimensionVector<Basis>> = Pick<
    Vector,
    NonZeroKeys<Basis, Vector>
>;

export type NonZeroKeys<Basis extends string, Vector extends DimensionVector<Basis>> = {
    [Dim in keyof Vector]: Vector[Dim] extends 0 ? never : Dim
}[keyof Vector];

/** Return the exponent associated with a given dimension in a dimension vector if present, otherwise return 0 */
export type GetExponent<
    Basis extends string,
    Vector extends DimensionVector<Basis>,
    Dim extends Basis
> = undefined extends Vector[Dim] ? 0 : NonNullable<Vector[Dim]>;
