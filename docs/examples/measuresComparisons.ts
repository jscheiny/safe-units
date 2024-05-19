import { Measure, hours, meters, minutes } from "safe-units";

// START
const t1 = Measure.of(30, minutes);
const t2 = Measure.of(0.25, hours);
const d1 = Measure.of(10, meters);

t1.gt(t2); // true

// @ts-expect-error Cannot compare time and distance values
t1.eq(d1);
// END
