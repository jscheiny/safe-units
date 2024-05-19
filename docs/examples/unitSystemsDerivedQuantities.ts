import { Frames, Length, Time } from "./unitSystemsBaseUnits";

// START
const FrameRate = Frames.over(Time);
type FrameRate = typeof FrameRate;

const Velocity = Length.over(Time);
type Velocity = typeof Velocity;

const Acceleration = Velocity.over(Time);
type Acceleration = typeof Acceleration;
// END

export { FrameRate, Velocity, Acceleration };
