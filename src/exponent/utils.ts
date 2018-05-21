import { ArithmeticError, Exponent } from "./common";
import { DivideExponents } from "./division";

export type IsArithmeticError<T> = T extends ArithmeticError ? true : false;

export type IsDivisible<L extends Exponent, R extends Exponent> = IsArithmeticError<DivideExponents<L, R>>;
