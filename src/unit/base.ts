import { Measure } from "../measure";

export const meters = Measure.dimension("length", "m");
export const kilograms = Measure.dimension("mass", "kg");
export const grams = Measure.of(0.001, kilograms, "g");
export const seconds = Measure.dimension("time", "s");
export const amperes = Measure.dimension("current", "A");
export const kelvin = Measure.dimension("temperature", "K");
export const moles = Measure.dimension("substance", "mol");
export const candela = Measure.dimension("intensity", "cd");

export const radians = Measure.dimension("planeAngle", "rad");
export const steradians = Measure.dimension("solidAngle", "sr");
