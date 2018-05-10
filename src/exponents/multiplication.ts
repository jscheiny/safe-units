import { Exponent, ArithmeticError } from "./common"

export type Negate<N extends Exponent> = MultiplyExponents<N, -1>;

export type MultiplyExponents<L extends Exponent, R extends Exponent>
    = L extends -5 ? MultiplyByNegative5<R>
    : L extends -4 ? MultiplyByNegative4<R>
    : L extends -3 ? MultiplyByNegative3<R>
    : L extends -2 ? MultiplyByNegative2<R>
    : L extends -1 ? MultiplyByNegative1<R>
    : L extends 0 ? 0
    : L extends 1 ? R
    : L extends 2 ? MultiplyByPositive2<R>
    : L extends 3 ? MultiplyByPositive3<R>
    : L extends 4 ? MultiplyByPositive4<R>
    : L extends 5 ? MultiplyByPositive5<R>
    : ArithmeticError;

type MultiplyByNegative5<N extends Exponent>
    = N extends -1 ? 5
    : N extends 0 ? 0
    : N extends 1 ? -5
    : ArithmeticError;

type MultiplyByNegative4<N extends Exponent>
    = N extends -1 ? 4
    : N extends 0 ? 0
    : N extends 1 ? -4
    : ArithmeticError;

type MultiplyByNegative3<N extends Exponent>
    = N extends -1 ? 3
    : N extends 0 ? 0
    : N extends 1 ? -3
    : ArithmeticError;

type MultiplyByNegative2<N extends Exponent>
    = N extends -2 ? 4
    : N extends -1 ? 2
    : N extends 0 ? 0
    : N extends 1 ? -2
    : N extends 2 ? -4
    : ArithmeticError;

type MultiplyByNegative1<N extends Exponent>
    = N extends -5 ? 5
    : N extends -4 ? 4
    : N extends -3 ? 3
    : N extends -2 ? 2
    : N extends -1 ? 1
    : N extends 0 ? 0
    : N extends 1 ? -1
    : N extends 2 ? -2
    : N extends 3 ? -3
    : N extends 4 ? -4
    : N extends 5 ? -5
    : ArithmeticError;

type MultiplyByPositive2<N extends Exponent>
    = N extends -2 ? -4
    : N extends -1 ? -2
    : N extends 0 ? 0
    : N extends 1 ? 2
    : N extends 2 ? 4
    : ArithmeticError;

type MultiplyByPositive3<N extends Exponent>
    = N extends -1 ? -3
    : N extends 0 ? 0
    : N extends 1 ? 3
    : ArithmeticError;

type MultiplyByPositive4<N extends Exponent>
    = N extends -1 ? -4
    : N extends 0 ? 0
    : N extends 1 ? 4
    : ArithmeticError;

type MultiplyByPositive5<N extends Exponent>
    = N extends -1 ? -5
    : N extends 0 ? 0
    : N extends 1 ? 5
    : ArithmeticError;

