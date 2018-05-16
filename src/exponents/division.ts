// tslint:disable

import { Exponent, ArithmeticError } from "./common";
import { MultiplyByNegative1 } from "./multiplication";

export type DivideExponents<L extends Exponent, R extends Exponent>
    = R extends -5 ? DivideByNegative5<L>
    : R extends -4 ? DivideByNegative4<L>
    : R extends -3 ? DivideByNegative3<L>
    : R extends -2 ? DivideByNegative2<L>
    : R extends -1 ? MultiplyByNegative1<L>
    : R extends 0 ? ArithmeticError
    : R extends 1 ? L
    : R extends 2 ? DivideByPositive2<L>
    : R extends 3 ? DivideByPositive3<L>
    : R extends 4 ? DivideByPositive4<L>
    : R extends 5 ? DivideByPositive5<L>
    : ArithmeticError;

export type DivideByNegative5<N extends Exponent>
    = N extends -5 ? 1
    : N extends 0 ? 0
    : N extends 5 ? -1
    : ArithmeticError;

export type DivideByNegative4<N extends Exponent>
    = N extends -4 ? 1
    : N extends 0 ? 0
    : N extends 4 ? -1
    : ArithmeticError;

export type DivideByNegative3<N extends Exponent>
    = N extends -3 ? 1
    : N extends 0 ? 0
    : N extends 3 ? -1
    : ArithmeticError;

export type DivideByNegative2<N extends Exponent>
    = N extends -4 ? 2
    : N extends -2 ? 1
    : N extends 0 ? 0
    : N extends 2 ? -1
    : N extends 4 ? -2
    : ArithmeticError;

export type DivideByPositive2<N extends Exponent>
    = N extends -4 ? -2
    : N extends -2 ? -1
    : N extends 0 ? 0
    : N extends 2 ? 1
    : N extends 4 ? 2
    : ArithmeticError;

export type DivideByPositive3<N extends Exponent>
    = N extends -3 ? -1
    : N extends 0 ? 0
    : N extends 3 ? 1
    : ArithmeticError;

export type DivideByPositive4<N extends Exponent>
    = N extends -4 ? -1
    : N extends 0 ? 0
    : N extends 4 ? 1
    : ArithmeticError;

export type DivideByPositive5<N extends Exponent>
    = N extends -5 ? -1
    : N extends 0 ? 0
    : N extends 5 ? 1
    : ArithmeticError;

