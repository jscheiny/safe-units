import { Unit } from "./units/unit";

const meter = Unit.basis("length");
const second = Unit.basis("time");

const mps = meter.per(second);
export type Velocity = typeof mps.vector;

const mps2 = meter.per(second.squared());
export type Acceleration = typeof mps2.vector;
