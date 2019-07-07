import { Measure } from "../measure/numberMeasure";
import { meters, seconds } from "./base";
import { grams } from "./common";
import { milli, nano, pascals } from "./metric";
import { Area, Length, Mass, Pressure, Velocity, Volume } from "./quantities";

// Mass
export const carats: Mass = Measure.of(200, milli(grams), "ct");

// Length
export const angstroms: Length = Measure.of(0.1, nano(meters), "Å");

// Area
export const ares: Area = Measure.of(100, meters.squared(), "a");
export const hectares: Area = Measure.of(10000, meters.squared(), "ha");

// Volume
export const liters: Volume = Measure.of(0.001, meters.cubed(), "L");

// Velocity
export const speedOfLight: Velocity = Measure.of(299_792_458, meters.per(seconds), "C");

// Pressure
export const bars: Pressure = Measure.of(100_000, pascals, "bar");
export const atmospheres: Pressure = Measure.of(101_325, pascals, "atm");
export const torrs: Pressure = Measure.of(1 / 760, atmospheres, "Torr");
