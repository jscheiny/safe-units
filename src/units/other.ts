import { cubic, Measure, square } from "../measure";
import { grams, meters, seconds } from "./base";
import { milli, nano, pascals } from "./metric";

// Mass
export const carats = Measure.of(200, milli(grams));

// Length
export const angstroms = Measure.of(0.1, nano(meters));
export const ares = Measure.of(100, square(meters));

// Area
export const hectares = Measure.of(10000, square(meters));

// Volume
export const liters = Measure.of(0.001, cubic(meters));

// Velocity
export const speedOfLight = Measure.of(299_792_458, meters.per(seconds));

// Pressure
export const bars = Measure.of(10_000, pascals);
export const atmospheres = Measure.of(101_325, pascals);
export const torrs = Measure.of(1 / 760, atmospheres);
