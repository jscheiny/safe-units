import { Measure, feet, minutes, pounds } from "safe-units";

// START
const yards = Measure.of(3, feet); // 0.9144 m
const stones = Measure.of(14, pounds); // 6.35029 kg
const hours = Measure.of(60, minutes); // 3600 s
// END

console.log(yards, stones, hours);
