import { AddExponents } from "./generated/addition";
import { ArithmeticError, Exponent } from "./generated/common";
import { DivideExponents } from "./generated/division";
import { MultiplyExponents } from "./generated/multiplication";

export type SubtractExponents<L extends Exponent, R extends Exponent> = AddExponents<L, Negative<R>>;
export type Negative<N extends Exponent> = MultiplyExponents<N, -1>;
export type NonZeroExponent = Exclude<Exponent, 0>;

/** Exponents that can be added to N without producing an error. */
export type AddendOf<N extends Exponent> = SubtractExponents<RemoveErrors<AddExponents<Exponent, N>>, N>;

/** Exponents that can be subtracted from N without producing an error. */
export type SubtrahendOf<N extends Exponent> = AddendOf<Negative<N>>;

/** Exponents that can be multiplied with N without producing an error. */
export type MultiplicandOf<N extends Exponent> = 0 extends N ? Exponent : DivideExponents<Exponent, ProductOf<N>>;

/** Exponents that N can be divided by without producing an error. */
export type DivisorOf<N extends Exponent> = 0 extends N ? NonZeroExponent : MultiplyExponents<FactorOf<N>, Exponent>;

/** Exponents that are non-error multiples of N. */
export type ProductOf<N extends Exponent> = RemoveErrors<MultiplyExponents<Exponent, N>>;

/** Exponents that are non-error factors of N. */
export type FactorOf<N extends Exponent> = RemoveErrors<DivideExponents<N, Exponent>>;

type RemoveErrors<N extends Exponent | ArithmeticError> = Exclude<N, ArithmeticError>;
