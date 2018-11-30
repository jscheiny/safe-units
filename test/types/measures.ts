import { Acceleration, Area, kilograms, Measure, meters, newtons, seconds, Velocity, Volume } from "safe-units";

// Valid usages

Measure.dimension("x"); // $ExpectType GenericMeasure<number, { x: 1; }>

const m = meters; // $ExpectType GenericMeasure<number, { length: 1; }>
const s = seconds; // $ExpectType GenericMeasure<number, { time: 1; }>
const n = newtons; // $ExpectType GenericMeasure<number, { time: -2; mass: 1; length: 1; }>

const a = newtons.over(kilograms); // $ExpectType GenericMeasure<number, { time: -2; length: 1; }>
const accel: Acceleration = a; // $ExpectType GenericMeasure<number, { time: -2; length: 1; }>

const absement = meters.times(seconds); // $ExpectType GenericMeasure<number, { time: 1; length: 1; }>
const velocity = meters.over(seconds); // $ExpectType GenericMeasure<number, { time: -1; length: 1; }>

meters.plus(meters); // $ExpectType GenericMeasure<number, { length: 1; }>
meters.minus(meters); // $ExpectType GenericMeasure<number, { length: 1; }>
meters.negate(); // $ExpectType GenericMeasure<number, { length: 1; }>
meters.scale(2); // $ExpectType GenericMeasure<number, { length: 1; }>

velocity.squared(); // $ExpectType GenericMeasure<number, { time: -2; length: 2; }>
absement.cubed(); // $ExpectType GenericMeasure<number, { time: 3; length: 3; }>
absement.inverse(); // $ExpectType GenericMeasure<number, { time: -1; length: -1; }>
velocity.toThe(0); // $ExpectType GenericMeasure<number, {}>

Measure.sqrt(velocity.toThe(-4)); // $ExpectType GenericMeasure<number, { time: 2; length: -2; }>
Measure.cbrt(absement.toThe(3)); // $ExpectType GenericMeasure<number, { time: 1; length: 1; }>

// Error usages

Measure.dimension("x" as "x" | "y"); // $ExpectType never
Measure.dimension("x" as string); // $ExpectType never

Volume.times(Volume); // $ExpectError
const volumeInverse = Volume.inverse();
Volume.over(volumeInverse); // $ExpectError

Volume.plus(Area); // $ExpectError
Area.minus(Volume); // $ExpectError

const sq = Volume.squared; // $ExpectType never
const cu = Area.cubed; // $ExpectType never
Area.toThe(4); // $ExpectError
Volume.toThe(-2); // $ExpectError

Measure.sqrt(Volume); // $ExpectError
Measure.cbrt(Area); // $ExpectError
