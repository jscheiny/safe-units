import { Length, LiftMeasure, Time } from "safe-units";

// START
const Velocity = Length.over(Time);
type Velocity<N = number> = LiftMeasure<typeof Velocity, N>;
// END

console.log(Velocity);
