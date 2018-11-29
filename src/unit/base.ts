import { GenericMeasure } from "../measure/genericMeasure";
import { Measure } from "../measure/numberMeasure";

// HACKHACK: Explicitly type this so we can import GenericMeasure and avoid absolute paths in the generated typings.
export const meters: GenericMeasure<number, { length: 1 }> = Measure.dimension("length", "m");
export const kilograms = Measure.dimension("mass", "kg");
export const seconds = Measure.dimension("time", "s");
export const amperes = Measure.dimension("current", "A");
export const kelvin = Measure.dimension("temperature", "K");
export const moles = Measure.dimension("substance", "mol");
export const candelas = Measure.dimension("intensity", "cd");

export const radians = Measure.dimension("planeAngle", "rad");
export const steradians = Measure.dimension("solidAngle", "sr");

export const bits = Measure.dimension("memory", "b");
