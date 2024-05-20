import { bits, kibi, kilo, Measure, meters } from "safe-units";

const distance = Measure.of(30, kilo(meters)); // 30000 m
distance.in(kilo(meters)); // "30 km"
const size = Measure.of(2, kibi(bits)); // 2048 b
size.in(kibi(bits)); // "2 KiB"
