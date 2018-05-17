import { Exponent } from "../exponents";
import { DimensionVector } from "../units";
import { DivideUnits, ExponentiateUnit, MultiplyUnits, NthRootUnit } from "../units/types";
import { Measure } from "./measure";

export const abs = wrapUnary(Math.abs);
export const ceil = wrapUnary(Math.ceil);
export const floor = wrapUnary(Math.floor);
export const fround = wrapUnary(Math.fround);
export const hypot = warpNary(Math.hypot);
export const max = warpNary(Math.max);
export const min = warpNary(Math.min);
export const round = wrapUnary(Math.round);
export const trunc = wrapUnary(Math.trunc);

export function pow<Basis extends string, U extends DimensionVector<Basis>, Power extends Exponent>(
    x: Measure<Basis, U>,
    y: Power,
): Measure<Basis, ExponentiateUnit<Basis, U, Power>> {
    return x.toThe(y);
}

export function sqrt<Basis extends string, U extends DimensionVector<Basis>>(
    x: Measure<Basis, U>,
): Measure<Basis, NthRootUnit<Basis, U, 2>> {
    return x.sqrt();
}

export function cbrt<Basis extends string, U extends DimensionVector<Basis>>(
    x: Measure<Basis, U>,
): Measure<Basis, NthRootUnit<Basis, U, 3>> {
    return x.cbrt();
}

export function add<Basis extends string, U extends DimensionVector<Basis>>(
    left: Measure<Basis, U>,
    right: Measure<Basis, U>,
): Measure<Basis, U> {
    return left.plus(right);
}

export function subtract<Basis extends string, U extends DimensionVector<Basis>>(
    left: Measure<Basis, U>,
    right: Measure<Basis, U>,
): Measure<Basis, U> {
    return left.minus(right);
}

export function multiply<Basis extends string, L extends DimensionVector<Basis>, R extends DimensionVector<Basis>>(
    left: Measure<Basis, L>,
    right: Measure<Basis, R>,
): Measure<Basis, MultiplyUnits<Basis, L, R>> {
    return left.times(right);
}

export function divide<Basis extends string, L extends DimensionVector<Basis>, R extends DimensionVector<Basis>>(
    left: Measure<Basis, L>,
    right: Measure<Basis, R>,
): Measure<Basis, DivideUnits<Basis, L, R>> {
    return left.over(right);
}

export function sum<Basis extends string, U extends DimensionVector<Basis>>(
    first: Measure<Basis, U>,
    ...rest: Array<Measure<Basis, U>>
): Measure<Basis, U> {
    let result = first;
    for (const measure of rest) {
        result = result.plus(measure);
    }
    return result;
}

// Wrapper functions

function wrapUnary(f: (x: number) => number) {
    return <Basis extends string, U extends DimensionVector<Basis>>(x: Measure<Basis, U>): Measure<Basis, U> => {
        return Measure.of(f(x.value), x.unit);
    };
}

function warpNary(f: (...x: number[]) => number) {
    return <Basis extends string, U extends DimensionVector<Basis>>(
        first: Measure<Basis, U>,
        ...rest: Array<Measure<Basis, U>>
    ): Measure<Basis, U> => {
        return Measure.of(f(...values(first, ...rest)), first.unit);
    };
}

function values<Basis extends string, U extends DimensionVector<Basis>>(
    ...measures: Array<Measure<Basis, U>>
): number[] {
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
