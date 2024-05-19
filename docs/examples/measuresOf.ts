import { Measure, meters, seconds } from "safe-units";

// START
const d1 = Measure.of(30, meters);
const feet = Measure.of(0.3048, meters, "ft");
const d2 = Measure.of(10, feet);
const minutes = Measure.of(60, seconds, "min");
// END

// Ensure that variables are used
console.log(d1, d2, minutes);
