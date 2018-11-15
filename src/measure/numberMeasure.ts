import { GenericMeasure } from "./genericMeasure";
import { createMeasureType, GenericMeasureClass } from "./genericMeasureFactory";
import { NthRootUnit, RadicandUnit, Unit } from "./unitTypeArithmetic";
import { cbrtUnit, sqrtUnit } from "./unitValueArithmetic";

type UnitPreservingUnaryFn<N> = <U extends Unit>(x: GenericMeasure<N, U>) => GenericMeasure<N, U>;
type UnitPreservingNaryFn<N> = <U extends Unit>(
    first: GenericMeasure<N, U>,
    ...rest: Array<GenericMeasure<N, U>>
) => GenericMeasure<N, U>;

function wrapUnaryFn<N>(f: (x: N) => N): UnitPreservingUnaryFn<N> {
    return x => x.unsafeMap(f);
}

function wrapNaryFn<N>(f: (...x: N[]) => N): UnitPreservingNaryFn<N> {
    return (first, ...rest) => first.unsafeMap(() => f(...measureValues(first, ...rest)));
}

function measureValues<N, U extends Unit>(...measures: Array<GenericMeasure<N, U>>): N[] {
    return measures.map(measure => measure.value);
}

interface MeasureStaticMethods {
    abs: UnitPreservingUnaryFn<number>;
    ceil: UnitPreservingUnaryFn<number>;
    floor: UnitPreservingUnaryFn<number>;
    fround: UnitPreservingUnaryFn<number>;
    round: UnitPreservingUnaryFn<number>;
    trunc: UnitPreservingUnaryFn<number>;
    hypot: UnitPreservingNaryFn<number>;
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
    hypot: wrapNaryFn(Math.hypot),
    sqrt: x => x.unsafeMap(Math.sqrt, sqrtUnit),
    cbrt: x => x.unsafeMap(Math.cbrt, cbrtUnit),
};

export type Measure<U extends Unit> = GenericMeasure<number, U>;
export const Measure: GenericMeasureClass<number, MeasureStaticMethods> = createMeasureType(
    {
        one: () => 1,
        neg: x => -x,
        add: (x, y) => x + y,
        sub: (x, y) => x - y,
        mult: (x, y) => x * y,
        div: (x, y) => x / y,
        pow: (x, y) => x ** y,
        compare: (x, y) => x - y,
        format: x => `${x}`,
    },
    staticMethods,
);
