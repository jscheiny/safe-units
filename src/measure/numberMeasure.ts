import { GenericMeasure, NumericOperations } from "./genericMeasure";
import { createMeasureType, GenericMeasureType } from "./genericMeasureFactory";
import { SpreadFn, UnaryFn, wrapSpreadFn, wrapUnaryFn } from "./genericMeasureUtils";
import { Unit } from "./unitTypeArithmetic";

interface MeasureStaticMethods {
    abs: UnaryFn;
    ceil: UnaryFn;
    floor: UnaryFn;
    fround: UnaryFn;
    round: UnaryFn;
    trunc: UnaryFn;
    hypot: SpreadFn;
}

const staticMethods: MeasureStaticMethods = {
    abs: wrapUnaryFn(Math.abs),
    ceil: wrapUnaryFn(Math.ceil),
    floor: wrapUnaryFn(Math.floor),
    fround: wrapUnaryFn(Math.fround),
    round: wrapUnaryFn(Math.round),
    trunc: wrapUnaryFn(Math.trunc),
    hypot: wrapSpreadFn(Math.hypot),
};

const numericOps: NumericOperations<number> = {
    one: () => 1,
    neg: x => -x,
    add: (x, y) => x + y,
    sub: (x, y) => x - y,
    mult: (x, y) => x * y,
    div: (x, y) => x / y,
    reciprocal: x => 1 / x,
    compare: (x, y) => x - y,
    format: x => `${x}`,
};

export type Measure<Basis, U extends Unit<Basis>> = GenericMeasure<number, Basis, U>;
export const Measure: GenericMeasureType<number, MeasureStaticMethods> = createMeasureType(numericOps, staticMethods);
