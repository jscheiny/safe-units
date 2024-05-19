import { Acceleration, Measure, Velocity, meters, seconds } from "safe-units";

// START
const distance = Measure.of(30, meters);
const time = Measure.of(10, seconds);

// Works! The result of distance over time is velocity
const velocity: Velocity = distance.over(time); // 300 m*s
const acceleration: Acceleration = velocity.div(time); // 30 m/s^2

// @ts-expect-error A velocity quantity cannot be assigned to an acceleration quantity
const bad: Acceleration = Measure.divide(distance, time);
// END

console.log(acceleration, bad);
