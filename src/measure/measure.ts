import { createMeasureType, GenericMeasure, GenericMeasureFactory } from "./genericMeasure";
import { Unit } from "./unitTypeArithmetic";

export type Measure<U extends Unit> = GenericMeasure<U, number>;
export const Measure: GenericMeasureFactory<number> = createMeasureType({
    guard: (value): value is number => typeof value === "number",
    one: () => 1,
    neg: x => -x,
    add: (x, y) => x + y,
    sub: (x, y) => x - y,
    mult: (x, y) => x * y,
    div: (x, y) => x / y,
    pow: (x, y) => x ** y,
    compare: (x, y) => x - y,
    format: x => `${x}`,
});
