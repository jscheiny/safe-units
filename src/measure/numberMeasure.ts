import { IGenericMeasure, INumericOperations } from "./genericMeasure";
import { createMeasureType, GenericMeasureType } from "./genericMeasureFactory";
import { NthRootFn, SpreadFn, UnaryFn, wrapRootFn, wrapSpreadFn, wrapUnaryFn } from "./genericMeasureUtils";
import { Unit } from "./unitTypeArithmetic";

interface IMeasureStaticMethods {
    abs: UnaryFn<number>;
    ceil: UnaryFn<number>;
    floor: UnaryFn<number>;
    fround: UnaryFn<number>;
    round: UnaryFn<number>;
    trunc: UnaryFn<number>;
    hypot: SpreadFn<number>;
    sqrt: NthRootFn<number, 2>;
    cbrt: NthRootFn<number, 3>;
}

const staticMethods: IMeasureStaticMethods = {
    abs: wrapUnaryFn(Math.abs),
    ceil: wrapUnaryFn(Math.ceil),
    floor: wrapUnaryFn(Math.floor),
    fround: wrapUnaryFn(Math.fround),
    round: wrapUnaryFn(Math.round),
    trunc: wrapUnaryFn(Math.trunc),
    hypot: wrapSpreadFn(Math.hypot),
    sqrt: wrapRootFn(Math.sqrt, 2),
    cbrt: wrapRootFn(Math.cbrt, 3),
};

const numericOps: INumericOperations<number> = {
    one: () => 1,
    neg: x => -x,
    add: (x, y) => x + y,
    sub: (x, y) => x - y,
    mult: (x, y) => x * y,
    div: (x, y) => x / y,
    pow: (x, y) => x ** y,
    compare: (x, y) => x - y,
    format: x => `${x}`,
};

export type Measure<U extends Unit> = IGenericMeasure<number, U>;
export const Measure: GenericMeasureType<number, IMeasureStaticMethods> = createMeasureType(numericOps, staticMethods);
