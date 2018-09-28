import { Dimensionless, Length, PlaneAngle } from "../quantity/quantities";
import { radians } from "../unit/base";
import { Measure, pow } from "./measure";
import {
    DivideUnits,
    DivisorUnit,
    MultiplicandUnit,
    MultiplyUnits,
    NthRootUnit,
    RadicandUnit,
    Unit,
} from "./unitTypeArithmetic";
import { nthRootUnit } from "./unitValueArithmetic";

export { pow };

export const abs = wrapUnaryFn(Math.abs);
export const acos = wrapInverseTrigFn(Math.acos);
export const asin = wrapInverseTrigFn(Math.asin);
export const atan = wrapInverseTrigFn(Math.atan);
export const ceil = wrapUnaryFn(Math.ceil);
export const cos = wrapTrigFn(Math.cos);
export const floor = wrapUnaryFn(Math.floor);
export const fround = wrapUnaryFn(Math.fround);
export const hypot = warpNary(Math.hypot);
export const max = warpNary(Math.max);
export const min = warpNary(Math.min);
export const round = wrapUnaryFn(Math.round);
export const sin = wrapTrigFn(Math.sin);
export const tan = wrapTrigFn(Math.tan);
export const trunc = wrapUnaryFn(Math.trunc);

export function atan2(y: Length, x: Length): PlaneAngle {
    return Measure.of(Math.atan2(y.value, x.value), radians);
}

export function sqrt<U extends RadicandUnit<2>>(x: Measure<U>): Measure<NthRootUnit<U, 2>> {
    return Measure.unsafeConstruct(Math.sqrt(x.value), nthRootUnit(x.unit, 2));
}

export function cbrt<U extends RadicandUnit<3>>(x: Measure<U>): Measure<NthRootUnit<U, 3>> {
    return Measure.unsafeConstruct(Math.cbrt(x.value), nthRootUnit(x.unit, 3));
}

export function add<U extends Unit>(left: Measure<U>, right: Measure<U>): Measure<U> {
    return left.plus(right);
}

export function subtract<U extends Unit>(left: Measure<U>, right: Measure<U>): Measure<U> {
    return left.minus(right);
}

export function multiply<L extends Unit, R extends MultiplicandUnit<L>>(
    left: Measure<L>,
    right: Measure<R>,
): Measure<MultiplyUnits<L, R>> {
    return left.times(right);
}

export function divide<L extends Unit, R extends DivisorUnit<L>>(
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

function wrapUnaryFn(f: (x: number) => number): <U extends Unit>(x: Measure<U>) => Measure<U> {
    return x => Measure.of(f(x.value), x.normalized());
}

function wrapTrigFn(f: (x: number) => number): (angle: PlaneAngle) => Dimensionless {
    return angle => Measure.dimensionless(f(angle.value));
}

function wrapInverseTrigFn(f: (x: number) => number): (angle: Dimensionless) => PlaneAngle {
    return angle => Measure.of(f(angle.value), radians);
}

function warpNary(
    f: (...x: number[]) => number,
): <U extends Unit>(first: Measure<U>, ...rest: Array<Measure<U>>) => Measure<U> {
    return (first, ...rest) => Measure.of(f(...values(first, ...rest)), first.normalized());
}

function values<U extends Unit>(...measures: Array<Measure<U>>): number[] {
    return measures.map(measure => measure.value);
}
