import { Measure, meters } from "safe-units";

// START
const kilometers = Measure.of(1000, meters, "km");
const distance = Measure.of(5500, meters);

distance.in(kilometers); // "5.5 km"
distance.in(kilometers, { formatValue: x => x.toPrecision(3) }); // "5.50 km"
distance.valueIn(kilometers); // 5.5
// END
