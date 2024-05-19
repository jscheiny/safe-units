import { Measure, meters, minutes } from "safe-units";

// START
const d1 = Measure.of(30, meters);
const d2 = Measure.of(10, meters);
const t1 = Measure.of(2, minutes);

const diff1 = d1.minus(d2); // -20 m
const diff2 = Measure.subtract(d2, d1); // 20 m

// @ts-expect-error Cannot subtract a distance from a time unit
const bad = t1.minus(d1);
// END

console.log(diff1, diff2);
