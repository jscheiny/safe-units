import { Measure, meters } from "safe-units";

// START
const positive = Measure.of(30, meters);
const negative = positive.negate(); // -30 m
// END

console.log(negative);
