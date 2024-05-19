import { Measure, SIUnitSystem, seconds } from "safe-units";

// START
const t = Measure.of(10, seconds);
const doubledShort = t.scale(2); // 20 s
const doubledLong = t.times(Measure.dimensionless(SIUnitSystem, 2)); // 20 s
// END

console.log(doubledShort, doubledLong);
