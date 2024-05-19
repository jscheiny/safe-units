import { Measure, MetricSystem } from "safe-units";

// START
const meter = Measure.dimension(MetricSystem, "length");
console.log(meter); // 1 m

const second = Measure.dimension(MetricSystem, "time");
console.log(second); // 1 s
// END
