import { cubic, Measure, square } from "../measure";
import { Quantity } from "../quantity";
import { grams, meters, seconds } from "./base";
import { milli, nano, pascals } from "./metric";

// Mass
export const carats: Quantity.Mass = Measure.of(200, milli(grams), "ct");

// Length
export const angstroms: Quantity.Length = Measure.of(0.1, nano(meters), "Å");

// Area
export const ares: Quantity.Area = Measure.of(100, square(meters), "a");
export const hectares: Quantity.Area = Measure.of(10000, square(meters), "ha");

// Volume
export const liters: Quantity.Volume = Measure.of(0.001, cubic(meters), "L");

// Velocity
export const speedOfLight: Quantity.Velocity = Measure.of(299_792_458, meters.per(seconds), "C");

// Pressure
export const bars: Quantity.Pressure = Measure.of(10_000, pascals, "bar");
export const atmospheres: Quantity.Pressure = Measure.of(101_325, pascals, "atm");
export const torrs: Quantity.Pressure = Measure.of(1 / 760, atmospheres, "Torr");
