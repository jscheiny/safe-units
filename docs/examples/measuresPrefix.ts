import { Measure, meters } from "safe-units";

// START
const kilo = Measure.prefix("k", 1000);
const kilometers = kilo(meters); // 1000 m

const distance = Measure.of(20, kilometers); // 20000 m
distance.in(kilometers); // 20 km
// END
