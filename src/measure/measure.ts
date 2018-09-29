import { Exponent } from "../exponent";
import { createMeasureType, GenericMeasure } from "./genericMeasure";
import { BaseUnit, ExponentiateUnit, Unit } from "./unitTypeArithmetic";
import { exponentiateUnit } from "./unitValueArithmetic";

export type Measure<U extends Unit> = GenericMeasure<U, number>;
export const Measure = createMeasureType({
    guard: (value): value is number => typeof value === "number",
    one: () => 1,
    neg: x => -x,
    add: (x, y) => x + y,
    sub: (x, y) => x - y,
    mult: (x, y) => x * y,
    div: (x, y) => x / y,
    pow: (x, y) => x ** y,
    lt: (x, y) => x < y,
    lte: (x, y) => x <= y,
    eq: (x, y) => x === y,
    neq: (x, y) => x !== y,
    gte: (x, y) => x >= y,
    gt: (x, y) => x > y,
    format: x => `${x}`,
});

export function square<U extends BaseUnit<2>>(measure: Measure<U>): Measure<ExponentiateUnit<U, 2>> {
    return pow(measure, 2);
}

export function cubic<U extends BaseUnit<3>>(measure: Measure<U>): Measure<ExponentiateUnit<U, 3>> {
    return pow(measure, 3);
}

export function pow<U extends BaseUnit<N>, N extends Exponent>(
    measure: Measure<U>,
    power: N,
): Measure<ExponentiateUnit<U, N>> {
    return Measure.unsafeConstruct(Math.pow(measure.value, power), exponentiateUnit(measure.unit, power));
}
