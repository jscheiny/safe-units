import { Area, Measure, Volume, meters } from "safe-units";

// START
const side = Measure.of(10, meters);

const area: Area = side.squared(); // 100 m^2
const volume: Volume = side.cubed(); // 1000 m^3
// END

console.log(area, volume);
