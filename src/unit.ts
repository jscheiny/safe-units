import { MinimalUnit } from "./units/common";
import { DivideUnits, MultiplyUnits, ExponentiateUnit } from "./units/typeArithmetic";

function makeUnit<U extends MinimalUnit>(unit: U): U {
    return unit;
}

const meter = makeUnit({ length: 1 });
type Length = typeof meter;

const hertz = makeUnit({ time: -1 });
export type Frequency = typeof hertz;

const second = makeUnit({ time: 1 });
export type Time = typeof second;

export type Area = MultiplyUnits<Length, Length>;
export type Volume = MultiplyUnits<Area, Length>;
export type Velocity = DivideUnits<Length, Time>;
export type Acceleration = DivideUnits<Velocity, Time>;
export type Jerk = DivideUnits<Acceleration, Time>;
export type Accel2 = MultiplyUnits<Time, Jerk>;
export type M6_Attempt1 = MultiplyUnits<Volume, Volume>;
export type M6_Attempt2 = ExponentiateUnit<Volume, 2>;
export type M6_Attempt3 = ExponentiateUnit<Area, 3>;
