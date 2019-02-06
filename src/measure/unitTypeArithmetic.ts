import {
    AddendOf,
    AddExponents,
    DivideExponents,
    Exponent,
    MultiplicandOf,
    MultiplyExponents,
    NonZeroExponent,
    ProductOf,
    SubtractExponents,
    SubtrahendOf,
} from "../exponent";

export interface IUnit {
    [dimension: string]: Exponent | undefined;
}

export type UnitWithSymbols<U extends IUnit = IUnit> = { [D in keyof U]+?: [string, NonNullable<U[D]>] };
export type SymbolAndExponent = [string, Exponent];

// Multiplication

/** Returns the product of two units. This is the sum of two dimension vectors. */
export type MultiplyUnits<L extends IUnit, R extends IUnit> = CleanUnit<
    { [Dim in keyof L | keyof R]: AddExponents<GetExponent<L, Dim>, GetExponent<R, Dim>> }
>;

/** A type that is assignable from all units that can be multiplied by U without producing an error. */
export type MultiplicandUnit<U extends IUnit> = Partial<{ [D in keyof U]: AddendOf<NonNullable<U[D]>> }> & IUnit;

// Division

/** Returns the quotient of two units. This is the difference of two dimension vectors. */
export type DivideUnits<L extends IUnit, R extends IUnit> = CleanUnit<
    { [Dim in keyof L | keyof R]: SubtractExponents<GetExponent<L, Dim>, GetExponent<R, Dim>> }
>;

/** A type that is assignable from all units that U can be divided by without producing an error. */
export type DivisorUnit<U extends IUnit> = Partial<{ [D in keyof U]: SubtrahendOf<NonNullable<U[D]>> }> & IUnit;

// Exponentiation

/** Returns the unit raised to a power. This is the scalar multiple of the dimension vector. */
export type ExponentiateUnit<U extends IUnit, N extends Exponent> = 0 extends N
    ? {}
    : { [Dim in keyof U]: MultiplyExponents<GetExponent<U, Dim>, N> };

/** Returns the union of exponents to which a given unit is allowed to be raised.  */
export type AllowedExponents<U extends IUnit> = Exclude<Exponent, NonAllowedExponents<U>> | -1 | 0 | 1;

/** Returns the union of exponents that raising and exponent to would produce an error. */
export type NonAllowedExponents<U extends IUnit> = {
    [Dim in keyof U]: undefined extends U[Dim] ? never : Exclude<Exponent, MultiplicandOf<NonNullable<U[Dim]>>>
}[keyof U];

// Roots

/** Returns the nth root of a unit. This is the inverse scalar multiple of the dimension vector. */
export type NthRootUnit<U extends IUnit, N extends NonZeroExponent> = 1 extends N
    ? U
    : { [Dim in keyof U]: DivideExponents<GetExponent<U, Dim>, N> };

/** A type that is assignable from all units whose Nth root does not produce an error. */
export interface IRadicandUnit<N extends Exponent> {
    [dimension: string]: ProductOf<N> | undefined;
}

// Utility types

/** Makes a unit pretty in intellisense views.  */
// `ExponentiateUnit<U, 1>` is a noop that seems to accomplish this but is slow to compile and we should see if there's
// a workaround.
type CleanUnit<U extends IUnit> = ExponentiateUnit<StripZeroes<U>, 1>;

/** Removes all zero exponent dimensions from a dimension vector */
type StripZeroes<U extends IUnit> = { [Dim in NonZeroKeys<U>]: U[Dim] };

/** Gets the union of all dimensions of a unit with non zero or null exponents */
type NonZeroKeys<U extends IUnit> = { [Dim in keyof U]: NonNullable<U[Dim]> extends 0 ? never : Dim }[keyof U];

/** Get the exponent at a given dimension of a unit, or 0 if that dimension is undefined */
type GetExponent<U extends IUnit, D> = D extends keyof U ? NonNullable<U[D]> : 0;

/** Returns true if T represents a single string literal and not a union or the entire string type. */
export type IsSingleStringLiteral<T extends string> = string extends T
    ? false
    : IsSingleStringLiteralHelper<T> extends never ? true : false;

type IsSingleStringLiteralHelper<T, TCopy = T> = T extends string ? Exclude<TCopy, T> : never;
