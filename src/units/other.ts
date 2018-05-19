import { cubic, Measure, square } from "../measure";
import { grams, meters, seconds } from "./base";
import { milli, nano, pascals } from "./metric";
import { Area, Length, Mass, Pressure, Velocity, Volume } from "./types";

// Mass
export const carats: Mass = Measure.of(200, milli(grams));

// Length
export const angstroms: Length = Measure.of(0.1, nano(meters));
export const ares: Length = Measure.of(100, square(meters));

// Area
export const hectares: Area = Measure.of(10000, square(meters));

// Volume
export const liters: Volume = Measure.of(0.001, cubic(meters));

// Velocity
export const speedOfLight: Velocity = Measure.of(299_792_458, meters.per(seconds));

// Pressure
export const bars: Pressure = Measure.of(10_000, pascals);
export const atmospheres: Pressure = Measure.of(101_325, pascals);
export const torrs: Pressure = Measure.of(1 / 760, atmospheres);
