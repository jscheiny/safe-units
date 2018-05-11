import { base, divide, square } from "./units/valueArithmetic";

const meter = base("length");
const second = base("time");

const mps = divide(meter, second);
export type Velocity = typeof mps;

const mps2 = divide(meter, square(second));
export type Acceleration = typeof mps2;
