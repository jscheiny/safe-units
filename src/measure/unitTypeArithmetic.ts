import { AddIntegers, Negative, SubtractIntegers } from "./exponentTypeArithmetic";

export type Unit = {
    [dimension: string]: number | undefined;
};

export type UnitWithSymbols<U extends Unit = Unit> = { [D in keyof U]+?: [string, NonNullable<U[D]>] };
export type SymbolAndExponent = [string, number];

export type MultiplyUnits<Left extends Unit, Right extends Unit> = StripZeros<{
    [Dimension in keyof Left | keyof Right]: AddIntegers<GetExponent<Left, Dimension>, GetExponent<Right, Dimension>>;
}>;

export type SquareUnit<U extends Unit> = MultiplyUnits<U, U>;
export type CubeUnit<U extends Unit> = MultiplyUnits<SquareUnit<U>, U>;

export type DivideUnits<Left extends Unit, Right extends Unit> = StripZeros<{
    [Dimension in keyof Left | keyof Right]: SubtractIntegers<
        GetExponent<Left, Dimension>,
        GetExponent<Right, Dimension>
    >;
}>;

export type ReciprocalUnit<U extends Unit> = StripZeros<{
    [Dimension in keyof U]: Negative<NonNullable<U[Dimension]>>;
}>;

type GetExponent<U extends Unit, D> = D extends keyof U ? NonNullable<U[D]> : 0;

export type StripZeros<U extends Unit> = Identity<{
    [K in keyof U as 0 extends U[K] ? never : K]: U[K];
}>;

type Identity<U extends Unit> = { [K in keyof U]: U[K] };
