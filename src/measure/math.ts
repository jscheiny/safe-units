import { Dimensionless, Length, PlaneAngle } from "../quantity/quantities";
import { radians } from "../unit/base";
import { Measure, pow } from "./measure";
import { DivideUnits, MultiplyUnits, NthRootableUnit, NthRootUnit, Unit } from "./types";
import { nthRootUnit } from "./units";

export { pow };

export const abs = wrapUnary(Math.abs);
export const acos = wrapInverseTrig(Math.acos);
export const asin = wrapInverseTrig(Math.asin);
export const atan = wrapInverseTrig(Math.atan);
export const ceil = wrapUnary(Math.ceil);
export const cos = wrapTrig(Math.cos);
export const floor = wrapUnary(Math.floor);
export const fround = wrapUnary(Math.fround);
export const hypot = warpNary(Math.hypot);
export const max = warpNary(Math.max);
export const min = warpNary(Math.min);
export const round = wrapUnary(Math.round);
export const sin = wrapTrig(Math.sin);
export const tan = wrapTrig(Math.tan);
export const trunc = wrapUnary(Math.trunc);

export function atan2(y: Length, x: Length): PlaneAngle {
    return Measure.of(Math.atan2(y.value, x.value), radians);
}

export function sqrt<U extends NthRootableUnit<2>>(x: Measure<U>): Measure<NthRootUnit<U, 2>> {
    return Measure.unsafeConstruct(Math.sqrt(x.value), nthRootUnit(x.getUnit(), 2));
}

export function cbrt<U extends NthRootableUnit<3>>(x: Measure<U>): Measure<NthRootUnit<U, 3>> {
    return Measure.unsafeConstruct(Math.cbrt(x.value), nthRootUnit(x.getUnit(), 3));
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

function wrapUnary(f: (x: number) => number): <U extends Unit>(x: Measure<U>) => Measure<U> {
    return x => Measure.of(f(x.value), x.normalized());
}

function wrapTrig(f: (x: number) => number): (angle: PlaneAngle) => Dimensionless {
    return angle => Measure.dimensionless(f(angle.value));
}

function wrapInverseTrig(f: (x: number) => number): (angle: Dimensionless) => PlaneAngle {
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
