import { Measure, meters, newtons } from "safe-units";

// START
const kilometers = Measure.of(1000, meters, "km");
// Could also be written as: Measure.of(1000, meters).withSymbol("km")

const distance = Measure.of(5, kilometers);
distance.toString(); // "5000 m"
distance.toString({
    formatValue: x => x.toExponential(),
    formatUnit: () => "meters",
}); // "5e+3 meters"

const force = Measure.of(30, newtons);
force.toString(); // "30 kg * m * s^-2"
force.toString({ formatValue: x => x.toPrecision(5) }); // "30.000 kg * m * s^-2"
// END
