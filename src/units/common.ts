import { Exponent } from "../exponents";

export type Dimension = "length" | "time" | "mass";

export type CompleteDimensionVector = { [Dim in Dimension]: Exponent };

export type MinimalDimensionVector = Partial<CompleteDimensionVector>;

/**
 * Converts a CompleteUnit into a MinimalUnit
 */
export type StripZeroes<Vector extends CompleteDimensionVector> = Pick<Vector, NonZeroKeys<Vector>>;

type NonZeroKeys<Vector extends MinimalDimensionVector> = {
    [Dim in keyof Vector]: Vector[Dim] extends 0 ? never : Dim
}[keyof Vector];

/**
 * Converts a MinimalUnit into a CompleteUnit
 */
export type FillZeroes<Vector extends MinimalDimensionVector> = {
    [Dim in Dimension]: FillZeroesImpl<Vector>[Dim] extends undefined ? 0 : NonNullable<FillZeroesImpl<Vector>[Dim]>
};

type FillZeroesImpl<Vector extends MinimalDimensionVector> = Vector & { [Dim in MissingDimensions<Vector>]: 0 };

type MissingDimensions<Vector extends MinimalDimensionVector> = {
    [Dim in Dimension]: Vector[Dim] extends undefined ? Dim : never
}[Dimension];
