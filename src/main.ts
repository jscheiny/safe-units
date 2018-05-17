import { Unit } from "./units";
import { Measure } from "./measure";

export const meter = Unit.basis("length");
export type Length = typeof meter.vector;

export const second = Unit.basis("time");
export type Time = typeof second.vector;

export const mps = meter.per(second);
export type Velocity = typeof mps.vector;

export const mps2 = meter.per(second.squared());
export type Acceleration = typeof mps2.vector;

export function calculateVelocity(length: Measure<Length>, time: Measure<Time>): Measure<Velocity> {
    return length.over(time);
}

calculateVelocity(Measure.of(5, meter), Measure.of(7, second));
