import { Measure, feet, meters, minutes } from "safe-units";

// START
const d1 = Measure.of(30, meters);
const d2 = Measure.of(10, meters);
const d3 = Measure.of(100, feet);
const t1 = Measure.of(2, minutes);

const sum1 = d1.plus(d2); // 40 m
const sum2 = Measure.add(d1, d2); // 40 m
const sum3 = Measure.sum(d1, d2, d3); // 140m

const good = d1.plus(d3); // Fine because both are lengths

// @ts-expect-error Cannot add measures representing distances and times together
const bad = d1.plus(t1);
// END

console.log(sum1, sum2, sum3, good, bad);
