import { Measure, UnitSystem } from "safe-units";

const GameUnitSystem = UnitSystem.from({
    frames: "fr",
    time: "s",
});

const frames = Measure.dimension(GameUnitSystem, "frames");
const seconds = Measure.dimension(GameUnitSystem, "time");

const Frames = frames;
type Frames = typeof frames;

const Time = seconds;
type Time = typeof seconds;

const FrameRate = Frames.over(Time);
type FrameRate = typeof FrameRate;

const fps: FrameRate = frames.per(seconds).withSymbol("fps");

const minFrameRate = Measure.of(60, fps);

const measuredFrames = Measure.of(8000, frames);
const elapsedTime = Measure.of(120, seconds);
const measuredFps: FrameRate = measuredFrames.over(elapsedTime);

if (measuredFps.lt(minFrameRate)) {
    // Optimize
}
