import { Measure, SIUnitSystem } from "safe-units";

// START
const meter = Measure.dimension(SIUnitSystem, "length");
console.log(meter); // 1 m

const second = Measure.dimension(SIUnitSystem, "time");
console.log(second); // 1 s
// END
