import { Measure, meters } from "safe-units";

// START
const distance = Measure.of(-9.8, meters);

Measure.abs(distance); // 9.8 m
Measure.trunc(distance); // -9 m

const width = Measure.of(3, meters);
const height = Measure.of(4, meters);

Measure.hypot(width, height); // 5 m
// END
