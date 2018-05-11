import { Unit } from "./units";

const meter = Unit.basis("length");
const second = Unit.basis("time");

export const mps = meter.per(second);
export type Velocity = typeof mps.vector;

export const mps2 = meter.per(second.squared()).squared();
export type Acceleration = typeof mps2.vector;
