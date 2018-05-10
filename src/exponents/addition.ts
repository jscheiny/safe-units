import { Exponent, ArithmeticError } from "./common"

export type AddExponents<L extends Exponent, R extends Exponent>
    = L extends -5 ? Subtract5<R>
    : L extends -4 ? Subtract4<R>
    : L extends -3 ? Subtract3<R>
    : L extends -2 ? Subtract2<R>
    : L extends -1 ? Subtract1<R>
    : L extends 0 ? R
    : L extends 1 ? Add1<R>
    : L extends 2 ? Add2<R>
    : L extends 3 ? Add3<R>
    : L extends 4 ? Add4<R>
    : L extends 5 ? Add5<R>
    : ArithmeticError;

type Subtract5<N extends Exponent>
    = N extends 0 ? -5
    : N extends 1 ? -4
    : N extends 2 ? -3
    : N extends 3 ? -2
    : N extends 4 ? -1
    : N extends 5 ? 0
    : ArithmeticError;

type Subtract4<N extends Exponent>
    = N extends -1 ? -5
    : N extends 0 ? -4
    : N extends 1 ? -3
    : N extends 2 ? -2
    : N extends 3 ? -1
    : N extends 4 ? 0
    : N extends 5 ? 1
    : ArithmeticError;

type Subtract3<N extends Exponent>
    = N extends -2 ? -5
    : N extends -1 ? -4
    : N extends 0 ? -3
    : N extends 1 ? -2
    : N extends 2 ? -1
    : N extends 3 ? 0
    : N extends 4 ? 1
    : N extends 5 ? 2
    : ArithmeticError;

type Subtract2<N extends Exponent>
    = N extends -3 ? -5
    : N extends -2 ? -4
    : N extends -1 ? -3
    : N extends 0 ? -2
    : N extends 1 ? -1
    : N extends 2 ? 0
    : N extends 3 ? 1
    : N extends 4 ? 2
    : N extends 5 ? 3
    : ArithmeticError;

type Subtract1<N extends Exponent>
    = N extends -4 ? -5
    : N extends -3 ? -4
    : N extends -2 ? -3
    : N extends -1 ? -2
    : N extends 0 ? -1
    : N extends 1 ? 0
    : N extends 2 ? 1
    : N extends 3 ? 2
    : N extends 4 ? 3
    : N extends 5 ? 4
    : ArithmeticError;

type Add1<N extends Exponent>
    = N extends -5 ? -4
    : N extends -4 ? -3
    : N extends -3 ? -2
    : N extends -2 ? -1
    : N extends -1 ? 0
    : N extends 0 ? 1
    : N extends 1 ? 2
    : N extends 2 ? 3
    : N extends 3 ? 4
    : N extends 4 ? 5
    : ArithmeticError;

type Add2<N extends Exponent>
    = N extends -5 ? -3
    : N extends -4 ? -2
    : N extends -3 ? -1
    : N extends -2 ? 0
    : N extends -1 ? 1
    : N extends 0 ? 2
    : N extends 1 ? 3
    : N extends 2 ? 4
    : N extends 3 ? 5
    : ArithmeticError;

type Add3<N extends Exponent>
    = N extends -5 ? -2
    : N extends -4 ? -1
    : N extends -3 ? 0
    : N extends -2 ? 1
    : N extends -1 ? 2
    : N extends 0 ? 3
    : N extends 1 ? 4
    : N extends 2 ? 5
    : ArithmeticError;

type Add4<N extends Exponent>
    = N extends -5 ? -1
    : N extends -4 ? 0
    : N extends -3 ? 1
    : N extends -2 ? 2
    : N extends -1 ? 3
    : N extends 0 ? 4
    : N extends 1 ? 5
    : ArithmeticError;

type Add5<N extends Exponent>
    = N extends -5 ? 0
    : N extends -4 ? 1
    : N extends -3 ? 2
    : N extends -2 ? 3
    : N extends -1 ? 4
    : N extends 0 ? 5
    : ArithmeticError;

