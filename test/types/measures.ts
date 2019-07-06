import { Acceleration, Area, kilograms, Measure, meters, newtons, seconds, Volume } from "safe-units";

// Valid usages

Measure.dimension("x"); // $ExpectType IGenericMeasure<number, { x: "1"; }>

const m = meters; // $ExpectType IGenericMeasure<number, { length: "1"; }>
const s = seconds; // $ExpectType IGenericMeasure<number, { time: "1"; }>
const n = newtons; // $ExpectType IGenericMeasure<number, { length: "1"; mass: "1"; time: "-2"; }>

const a = newtons.over(kilograms); // $ExpectType IGenericMeasure<number, { length: "1"; time: "-2"; }>
const accel: Acceleration = a; // $ExpectType IGenericMeasure<number, { length: "1"; time: "-2"; }>

const absement = meters.times(seconds); // $ExpectType IGenericMeasure<number, { length: "1"; time: "1"; }>
const velocity = meters.over(seconds); // $ExpectType IGenericMeasure<number, { length: "1"; time: "-1"; }>

meters.plus(meters); // $ExpectType IGenericMeasure<number, { length: "1"; }>
meters.minus(meters); // $ExpectType IGenericMeasure<number, { length: "1"; }>
meters.negate(); // $ExpectType IGenericMeasure<number, { length: "1"; }>
meters.scale(2); // $ExpectType IGenericMeasure<number, { length: "1"; }>

velocity.squared(); // $ExpectType IGenericMeasure<number, { length: "2"; time: "-2"; }>
absement.cubed(); // $ExpectType IGenericMeasure<number, { length: "3"; time: "3"; }>
absement.inverse(); // $ExpectType IGenericMeasure<number, { length: "-1"; time: "-1"; }>
velocity.toThe("0"); // $ExpectType IGenericMeasure<number, {}>

Measure.sqrt(velocity.toThe("-4")); // $ExpectType IGenericMeasure<number, { length: "-2"; time: "2"; }>
Measure.cbrt(absement.toThe("3")); // $ExpectType IGenericMeasure<number, { length: "1"; time: "1"; }>

// Error usages

declare const volume: Volume;
declare const area: Area;

Measure.dimension("x" as "x" | "y"); // $ExpectType never
Measure.dimension("x" as string); // $ExpectType never

volume.times(volume); // $ExpectError
const volumeInverse = volume.inverse();
volume.over(volumeInverse); // $ExpectError

volume.plus(area); // $ExpectError
area.minus(volume); // $ExpectError

const sq = volume.squared; // $ExpectType never
const cu = area.cubed; // $ExpectType never
area.toThe("4"); // $ExpectError
volume.toThe("-2"); // $ExpectError

Measure.sqrt(volume); // $ExpectError
Measure.cbrt(area); // $ExpectError
