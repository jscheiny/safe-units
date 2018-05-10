import { Exponent } from "../exponents";

export type Dimension = "length" | "time" | "mass";

const DimensionRecord: Record<Dimension, true> = {
    length: true,
    time: true,
    mass: true,
};

export const Dimensions = Object.keys(DimensionRecord) as Dimension[];

export type CompleteUnit = { [D in Dimension]: Exponent };

export type MinimalUnit = Partial<CompleteUnit>;

/**
 * Converts a CompleteUnit into a MinimalUnit
 */
export type StripZeroes<Unit extends CompleteUnit> = Pick<Unit, NonZeroKeys<Unit>>;

type NonZeroKeys<Unit extends MinimalUnit> = { [D in keyof Unit]: Unit[D] extends 0 ? never : D }[keyof Unit];

/**
 * Converts a MinimalUnit into a CompleteUnit
 */
export type FillZeroes<Unit extends MinimalUnit> = {
    [Dim in Dimension]: FillZeroesImpl<Unit>[Dim] extends undefined ? 0 : NonNullable<FillZeroesImpl<Unit>[Dim]>
};

type FillZeroesImpl<Unit extends MinimalUnit> = Unit & { [Dim in MissingDimensions<Unit>]: 0 };

type MissingDimensions<Unit extends MinimalUnit> = {
    [Dim in Dimension]: Unit[Dim] extends undefined ? Dim : never
}[Dimension];

export type T = FillZeroes<{ time: -2; length: 5 }>;
