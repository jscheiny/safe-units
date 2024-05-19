import { Measure } from "safe-units";
import { milliseconds, frames, engineUnits } from "./unitSystemsBaseUnits";

// START
const seconds = Measure.of(1000, milliseconds, "s");
const fps = frames.per(seconds).withSymbol("fps");

const meters = Measure.of(10, engineUnits, "m");
const mps = meters.over(seconds).withSymbol("m/s");

const maxFrameRate = Measure.of(300, fps);
// END

console.log(maxFrameRate, mps);
