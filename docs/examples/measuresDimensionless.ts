import { Measure, MetricSystem, meters } from "safe-units";

// START
const scalar = Measure.dimensionless(MetricSystem, 2);
const distance = Measure.of(20, meters);
const doubled = distance.times(scalar); // 40 m
// END

// Ensure that variables are used
console.log(doubled);
