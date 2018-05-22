import { ArithmeticError, Exponent } from "./common";
import { DivideExponents } from "./division";
import { MultiplyExponents } from "./multiplication";

export type IsArithmeticError<T> = T extends ArithmeticError ? true : false;

export type IsDivisible<L extends Exponent, R extends Exponent> = IsArithmeticError<DivideExponents<L, R>>;

export type MultiplesOf<N extends Exponent> = Exclude<MultiplyExponents<Exponent, N>, ArithmeticError>;
