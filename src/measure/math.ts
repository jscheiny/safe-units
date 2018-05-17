import { Measure } from "./measure";
import { DimensionVector } from "../units";
import { Exponent } from "../exponents";
import { ExponentiateUnit, MultiplyUnits, DivideUnits, NthRootUnit } from "../units/types";

export const abs = wrapUnary(Math.abs);
export const ceil = wrapUnary(Math.ceil);
export const floor = wrapUnary(Math.floor);
export const fround = wrapUnary(Math.fround);
export const hypot = warpNary(Math.hypot);
export const max = warpNary(Math.max);
export const min = warpNary(Math.min);
export const round = wrapUnary(Math.round);
export const trunc = wrapUnary(Math.trunc);

export function pow<U extends DimensionVector, Power extends Exponent>(
    x: Measure<U>,
    y: Power,
): Measure<ExponentiateUnit<U, Power>> {
    return x.toThe(y);
}

export function sqrt<U extends DimensionVector>(x: Measure<U>): Measure<NthRootUnit<U, 2>> {
    return x.sqrt();
}

export function cbrt<U extends DimensionVector>(x: Measure<U>): Measure<NthRootUnit<U, 3>> {
    return x.cbrt();
}

export function add<U extends DimensionVector>(left: Measure<U>, right: Measure<U>): Measure<U> {
    return left.plus(right);
}

export function subtract<U extends DimensionVector>(left: Measure<U>, right: Measure<U>): Measure<U> {
    return left.minus(right);
}

export function multiply<L extends DimensionVector, R extends DimensionVector>(
    left: Measure<L>,
    right: Measure<R>,
): Measure<MultiplyUnits<L, R>> {
    return left.times(right);
}

export function divide<L extends DimensionVector, R extends DimensionVector>(
    left: Measure<L>,
    right: Measure<R>,
): Measure<DivideUnits<L, R>> {
    return left.over(right);
}

export function sum<U extends DimensionVector>(first: Measure<U>, ...rest: Array<Measure<U>>): Measure<U> {
    let result = first;
    for (const measure of rest) {
        result = result.plus(measure);
    }
    return result;
}

// Wrapper functions

function wrapUnary(f: (x: number) => number) {
    return <U extends DimensionVector>(x: Measure<U>): Measure<U> => {
        return Measure.of(f(x.value), x.unit);
    };
}

function warpNary(f: (...x: number[]) => number) {
    return <U extends DimensionVector>(first: Measure<U>, ...rest: Array<Measure<U>>): Measure<U> => {
        return Measure.of(f(...values(first, ...rest)), first.unit);
    };
}

function values<U extends DimensionVector>(...measures: Array<Measure<U>>): number[] {
    return measures.map(measure => measure.value);
}

// Probably won't implement
// acos
// acosh
// asin
// asinh
// atan
// atanh
// atan2
// clz32
// cos
// cosh
// exp
// expm1
// imul
// log
// log1p
// log10
// log2
// random
// sign
// sin
// sinh
// tan
// tanh
// toSource
