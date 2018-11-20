import { Acceleration, kilograms, Measure, meters, newtons, seconds, Velocity } from "safe-units";

Measure.dimension("x"); // $ExpectType GenericMeasure<number, { x: 1; }>

const m = meters; // $ExpectType GenericMeasure<number, { length: 1; }>
const s = seconds; // $ExpectType GenericMeasure<number, { time: 1; }>
const n = newtons; // $ExpectType GenericMeasure<number, { length: 1; time: -2; mass: 1; }>

const a = newtons.over(kilograms); // $ExpectType GenericMeasure<number, { length: 1; time: -2; }>
const accel: Acceleration = a; // $ExpectType GenericMeasure<number, { length: 1; time: -2; }>

const absement = meters.times(seconds); // $ExpectType GenericMeasure<number, { length: 1; time: 1; }>
const velocity = meters.over(seconds); // $ExpectType GenericMeasure<number, { length: 1; time: -1; }>

meters.plus(meters); // $ExpectType GenericMeasure<number, { length: 1; }>
meters.minus(meters); // $ExpectType GenericMeasure<number, { length: 1; }>
meters.negate(); // $ExpectType GenericMeasure<number, { length: 1; }>
meters.scale(2); // $ExpectType GenericMeasure<number, { length: 1; }>

velocity.squared(); // $ExpectType GenericMeasure<number, { length: 2; time: -2; }>
absement.cubed(); // $ExpectType GenericMeasure<number, { length: 3; time: 3; }>
absement.inverse(); // $ExpectType GenericMeasure<number, { length: -1; time: -1; }>
velocity.toThe(0); // $ExpectType GenericMeasure<number, {}>

Measure.sqrt(velocity.toThe(-4)); // $ExpectType GenericMeasure<number, { length: -2; time: 2; }>
Measure.cbrt(absement.toThe(3)); // $ExpectType GenericMeasure<number, { length: 1; time: 1; }>
