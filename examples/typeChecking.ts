import {
    Acceleration,
    Energy,
    hours,
    kilograms,
    Length,
    Mass,
    Measure,
    meters,
    miles,
    minutes,
    Time,
    Velocity,
} from "../src";
import { centi } from "../src/units/metric";

const length = Measure.of(50, miles);
const time = Measure.of(2, hours);

function calculateVelocity(length: Length, time: Time): Velocity {
    return length.over(time);
}

function calculateEnergy(mass: Mass, acceleration: Acceleration, length: Length): Energy {
    return mass.times(acceleration).times(length);
}

const velocity: Velocity = calculateVelocity(length, time);
const acceleration: Acceleration = velocity.over(time);
const energy: Energy = calculateEnergy(Measure.of(100, kilograms), acceleration, length);

console.log("l =", length.in(centi(meters)));
console.log("t =", time.in(minutes));
console.log("v =", velocity.toString());
console.log("a =", acceleration.toString());
console.log("e =", energy.toString());
