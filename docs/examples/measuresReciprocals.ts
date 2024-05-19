import { Frequency, Measure, Time, hertz } from "safe-units";

// START
const freq: Frequency = Measure.of(30, hertz); // 30 1/s

const cycle: Time = freq.inverse(); // 1/30 s
// END

console.log(cycle);
