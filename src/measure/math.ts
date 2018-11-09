import { Exponent } from "../exponent";
import { Dimensionless, Length, PlaneAngle } from "../quantity/quantities";
import { radians } from "../unit/base";
import { GenericMeasure } from "./genericMeasure";
import { Measure } from "./measure";
import {
    BaseUnit,
    DivideUnits,
    DivisorUnit,
    ExponentiateUnit,
    MultiplicandUnit,
    MultiplyUnits,
    NthRootUnit,
    RadicandUnit,
    Unit,
} from "./unitTypeArithmetic";
import { nthRootUnit } from "./unitValueArithmetic";

/** `Math.abs` for `number` measures. The measure's unit is preserved under this operation. */
export const abs = wrapUnaryFn(Math.abs);

/** `Math.ceil` for `number` measures. The measure's unit is preserved under this operation. */
export const ceil = wrapUnaryFn(Math.ceil);

/** `Math.floor` for `number` measures. The measure's unit is preserved under this operation. */
export const floor = wrapUnaryFn(Math.floor);

/** `Math.fround` for `number` measures. The measure's unit is preserved under this operation. */
export const fround = wrapUnaryFn(Math.fround);

/** `Math.round` for `number` measures. The measure's unit is preserved under this operation. */
export const round = wrapUnaryFn(Math.round);

/** `Math.trunc` for `number` measures. The measure's unit is preserved under this operation. */
export const trunc = wrapUnaryFn(Math.trunc);

/** `Math.hypot` for `number` measures. At least 1 parameter must be provided and all must have the same unit. */
export const hypot = warpNary(Math.hypot);

/** `Math.max` for `number` measures. At least 1 parameter must be provided and all must have the same unit. */
export const max = warpNary(Math.max);

/** `Math.min` for `number` measures. At least 1 parameter must be provided and all must have the same unit. */
export const min = warpNary(Math.min);

/**
 * `Math.acos` for `number` measures.
 * @param x a dimensionless value
 * @returns an angle
 */
export const acos = wrapInverseTrigFn(Math.acos);

/**
 * `Math.asin` for `number` measures.
 * @param x a dimensionless value
 * @returns an angle
 */
export const asin = wrapInverseTrigFn(Math.asin);

/**
 * `Math.atan` for `number` measures.
 * @param x a dimensionless value
 * @returns an angle
 */
export const atan = wrapInverseTrigFn(Math.atan);

/**
 * `Math.cos` for `number` measures.
 * @param x an angle
 * @returns a dimensionless value
 */
export const cos = wrapTrigFn(Math.cos);

/**
 * `Math.sin` for `number` measures.
 * @param x an angle
 * @returns a dimensionless value
 */
export const sin = wrapTrigFn(Math.sin);

/**
 * `Math.tan` for `number` measures.
 * @param x an angle
 * @returns a dimensionless value
 */
export const tan = wrapTrigFn(Math.tan);

/**
 * `Math.atan2` for `number` measures.
 * @param x a length
 * @param y a length
 * @returns an angle
 */
export function atan2(y: Length, x: Length): PlaneAngle {
    return Measure.of(Math.atan2(y.value, x.value), radians);
}

/** `Math.sqrt` for `number` measures. Can only be applied to units with even exponents. */
export function sqrt<U extends RadicandUnit<2>>(x: Measure<U>): Measure<NthRootUnit<U, 2>> {
    return Measure.unsafeConstruct(Math.sqrt(x.value), nthRootUnit(x.unit, 2));
}

/** `Math.cbrt` for `number` measures. Can only be applied to units with exponents that are multiples of 3. */
export function cbrt<U extends RadicandUnit<3>>(x: Measure<U>): Measure<NthRootUnit<U, 3>> {
    return Measure.unsafeConstruct(Math.cbrt(x.value), nthRootUnit(x.unit, 3));
}

/** `Math.pow` for measures of any kind. The power is restricted to integers between -5 and 5 */
export function pow<N, U extends BaseUnit<E>, E extends Exponent>(
    measure: GenericMeasure<N, U>,
    power: E,
): GenericMeasure<N, ExponentiateUnit<U, E>> {
    return measure.pow(power);
}

/** Equivalent to `left.plus(right)` */
export function add<U extends Unit>(left: Measure<U>, right: Measure<U>): Measure<U> {
    return left.plus(right);
}

/** Equivalent to `left.minus(right)` */
export function subtract<U extends Unit>(left: Measure<U>, right: Measure<U>): Measure<U> {
    return left.minus(right);
}

/** Equivalent to `left.times(right)` */
export function multiply<L extends Unit, R extends MultiplicandUnit<L>>(
    left: Measure<L>,
    right: Measure<R>,
): Measure<MultiplyUnits<L, R>> {
    return left.times(right);
}

/** Equivalent to `left.over(right)` */
export function divide<L extends Unit, R extends DivisorUnit<L>>(
    left: Measure<L>,
    right: Measure<R>,
): Measure<DivideUnits<L, R>> {
    return left.over(right);
}

/** Sums a list of 1 or more measures, all of the same unit. */
export function sum<U extends Unit>(first: Measure<U>, ...rest: Array<Measure<U>>): Measure<U> {
    let result = first;
    for (const measure of rest) {
        result = result.plus(measure);
    }
    return result;
}

function wrapUnaryFn(f: (x: number) => number): <U extends Unit>(x: Measure<U>) => Measure<U> {
    return x => x.unsafeMap(f);
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
    return (first, ...rest) => Measure.unsafeConstruct(f(...values(first, ...rest)), first.unit);
}

function values<U extends Unit>(...measures: Array<Measure<U>>): number[] {
    return measures.map(measure => measure.value);
}
