import { GenericMeasure } from "../measure/genericMeasure";
import { Measure } from "../measure/measure";

// HACKHACK: Explicitly type this so we can import GenericMeasure and avoid absolute paths in the generated typings.
export const meters: GenericMeasure<{ length: 1 }, number> = Measure.dimension("length", "m");
export const kilograms = Measure.dimension("mass", "kg");
export const grams = Measure.of(0.001, kilograms, "g");
export const seconds = Measure.dimension("time", "s");
export const amperes = Measure.dimension("current", "A");
export const kelvin = Measure.dimension("temperature", "K");
export const moles = Measure.dimension("substance", "mol");
export const candelas = Measure.dimension("intensity", "cd");

export const radians = Measure.dimension("planeAngle", "rad");
export const steradians = Measure.dimension("solidAngle", "sr");
