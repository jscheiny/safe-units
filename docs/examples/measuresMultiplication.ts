import { Force, Measure, Pressure, Velocity, kilograms, meters, seconds } from "safe-units";

const metersPerSecondsSquared = meters.per(seconds.squared());

// START
const mass = Measure.of(10, kilograms);
const acceleration = Measure.of(9.8, metersPerSecondsSquared);
const time = Measure.of(10, seconds);

// Works! The result of mass times acceleration is force
const force: Force = mass.times(acceleration); // 98 N
const velocity: Velocity = Measure.multiply(acceleration, time); // 98 m/s

// @ts-expect-error A force quantity cannot be assigned to a pressure quantity
const bad: Pressure = Measure.multiply(mass, acceleration);
// END

console.log(force, velocity, bad);
