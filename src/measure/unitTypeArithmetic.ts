import { AddIntegers, Negative, SubtractIntegers } from "./exponentTypeArithmetic";

export type Unit<Basis> = Readonly<Record<keyof Basis, number>>;

export type DimensionlessUnit<Basis> = Record<keyof Basis, 0>;

export type DimensionUnit<Basis, Dim extends keyof Basis> = Identity<{
    [Dimension in keyof Basis]: Dim extends Dimension ? 1 : 0;
}>;

export type MultiplyUnits<Basis, Left extends Unit<Basis>, Right extends Unit<Basis>> = Identity<{
    [Dimension in keyof Basis]: AddIntegers<Left[Dimension], Right[Dimension]>;
}>;

export type SquareUnit<Basis, U extends Unit<Basis>> = MultiplyUnits<Basis, U, U>;

export type CubeUnit<Basis, U extends Unit<Basis>> = MultiplyUnits<Basis, SquareUnit<Basis, U>, U>;

export type DivideUnits<Basis, Left extends Unit<Basis>, Right extends Unit<Basis>> = Identity<{
    [Dimension in keyof Basis]: SubtractIntegers<Left[Dimension], Right[Dimension]>;
}>;

export type ReciprocalUnit<Basis, U extends Unit<Basis>> = Identity<{
    [Dimension in keyof Basis]: Negative<U[Dimension]>;
}>;

type Identity<U extends Unit<any>> = Readonly<{
    [K in keyof U]: U[K];
}>;
