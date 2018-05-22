import { Exponent } from "../exponent";
import { Measure } from "./measure";
import { DivideUnits, ExponentiateUnit, MultiplyUnits, NthRootableUnit, NthRootUnit } from "./types";
import { Unit } from "./units";

export const abs = wrapUnary(Math.abs);
export const ceil = wrapUnary(Math.ceil);
export const floor = wrapUnary(Math.floor);
export const fround = wrapUnary(Math.fround);
export const hypot = warpNary(Math.hypot);
export const max = warpNary(Math.max);
export const min = warpNary(Math.min);
export const round = wrapUnary(Math.round);
export const trunc = wrapUnary(Math.trunc);

export function pow<U extends Unit, Y extends Exponent>(x: Measure<U>, y: Y): Measure<ExponentiateUnit<U, Y>> {
    return x.toThe(y);
}

export function sqrt<U extends NthRootableUnit<2>>(x: Measure<U>): Measure<NthRootUnit<U, 2>> {
    return Measure.sqrt(x);
}

export function cbrt<U extends NthRootableUnit<3>>(x: Measure<U>): Measure<NthRootUnit<U, 3>> {
    return Measure.cbrt(x);
}

export function add<U extends Unit>(left: Measure<U>, right: Measure<U>): Measure<U> {
    return left.plus(right);
}

export function subtract<U extends Unit>(left: Measure<U>, right: Measure<U>): Measure<U> {
    return left.minus(right);
}

export function multiply<L extends Unit, R extends Unit>(
    left: Measure<L>,
    right: Measure<R>,
): Measure<MultiplyUnits<L, R>> {
    return left.times(right);
}

export function divide<L extends Unit, R extends Unit>(
    left: Measure<L>,
    right: Measure<R>,
): Measure<DivideUnits<L, R>> {
    return left.over(right);
}

export function sum<U extends Unit>(first: Measure<U>, ...rest: Array<Measure<U>>): Measure<U> {
    let result = first;
    for (const measure of rest) {
        result = result.plus(measure);
    }
    return result;
}

// Wrapper functions

function wrapUnary(f: (x: number) => number) {
    return <U extends Unit>(x: Measure<U>): Measure<U> => {
        return Measure.of(f(x.value), x.normalized());
    };
}

function warpNary(f: (...x: number[]) => number) {
    return <U extends Unit>(first: Measure<U>, ...rest: Array<Measure<U>>): Measure<U> => {
        return Measure.of(f(...values(first, ...rest)), first.normalized());
    };
}

function values<U extends Unit>(...measures: Array<Measure<U>>): number[] {
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
