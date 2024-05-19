import { Measure } from "safe-units";
import { GameUnitSystem } from "unitSystemsCreating";

// START
const engineUnits = Measure.dimension(GameUnitSystem, "length");
const Length = engineUnits;
type Length = typeof Length;

const frames = Measure.dimension(GameUnitSystem, "frames");
const Frames = frames;
type Frames = typeof Frames;

const milliseconds = Measure.dimension(GameUnitSystem, "time");
const Time = milliseconds;
type Time = typeof Time;
// END

export { Length, Frames, Time, milliseconds, frames, engineUnits };
