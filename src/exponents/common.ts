import { UnitError } from "../common/error";

export type MinExponent = -5;
export const MinExponent: MinExponent = -5;

export type MaxExponent = 5;
export const MaxExponent: MaxExponent = 5;

type NegativeExponent = MinExponent | -4 | -3 | -2 | -1;
type PositiveExponent = 1 | 2 | 3 | 4 | MaxExponent;

export type Exponent = NegativeExponent | 0 | PositiveExponent;

export type ArithmeticError = UnitError<"Arithmetic out of bounds">;
export const ArithmeticError = "Arithmetic out of bounds";
