import { ArithmeticError } from "../common";

export type IsArithmeticError<T> = T extends ArithmeticError ? true : false;
