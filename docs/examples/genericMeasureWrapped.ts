import { WrappedNumber, wrap } from "./genericMeasureIntro";

// START
import { createMeasureType, GenericMeasure, Unit } from "safe-units";

type WrappedMeasure<B, U extends Unit<B>> = GenericMeasure<WrappedNumber, B, U>;
const WrappedMeasure = createMeasureType<WrappedNumber>({
    one: () => wrap(1),
    neg: x => wrap(-x.value),
    add: (x, y) => wrap(x.value + y.value),
    sub: (x, y) => wrap(x.value - y.value),
    mult: (x, y) => wrap(x.value * y.value),
    div: (x, y) => wrap(x.value / y.value),
    reciprocal: x => wrap(1 / x.value),
    compare: (x, y) => x.value - y.value,
    format: x => `${x}`,
});
// END

console.log(WrappedMeasure);
