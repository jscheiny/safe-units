import { GenericMeasure, Numeric } from "./genericMeasure";
import { createMeasureType, GenericMeasureType } from "./genericMeasureFactory";
import { SpreadMeasureFunction, UnaryMeasureFunction, wrapSpreadFn, wrapUnaryFn } from "./genericMeasureUtils";
import { NthRootUnit, RadicandUnit, Unit } from "./unitTypeArithmetic";
import { cbrtUnit, sqrtUnit } from "./unitValueArithmetic";

interface MeasureStaticMethods {
    abs: UnaryMeasureFunction<number>;
    ceil: UnaryMeasureFunction<number>;
    floor: UnaryMeasureFunction<number>;
    fround: UnaryMeasureFunction<number>;
    round: UnaryMeasureFunction<number>;
    trunc: UnaryMeasureFunction<number>;
    hypot: SpreadMeasureFunction<number>;
    sqrt<U extends RadicandUnit<2>>(x: Measure<U>): Measure<NthRootUnit<U, 2>>;
    cbrt<U extends RadicandUnit<3>>(x: Measure<U>): Measure<NthRootUnit<U, 3>>;
}

const staticMethods: MeasureStaticMethods = {
    abs: wrapUnaryFn(Math.abs),
    ceil: wrapUnaryFn(Math.ceil),
    floor: wrapUnaryFn(Math.floor),
    fround: wrapUnaryFn(Math.fround),
    round: wrapUnaryFn(Math.round),
    trunc: wrapUnaryFn(Math.trunc),
    hypot: wrapSpreadFn(Math.hypot),
    sqrt: x => x.unsafeMap(Math.sqrt, sqrtUnit),
    cbrt: x => x.unsafeMap(Math.cbrt, cbrtUnit),
};

const numericOps: Numeric<number> = {
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

export type Measure<U extends Unit> = GenericMeasure<number, U>;
export const Measure: GenericMeasureType<number, MeasureStaticMethods> = createMeasureType(numericOps, staticMethods);
