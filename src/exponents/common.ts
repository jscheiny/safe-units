import { UnitError } from "../common/error";

type NegativeExponent = -5 | -4 | -3 | -2 | -1;
type PositiveExponent = 1 | 2 | 3 | 4 | 5;
export type Exponent = NegativeExponent | 0 | PositiveExponent;

export type ArithmeticError = UnitError<"Arithmetic out of bounds">;
