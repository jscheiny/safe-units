import { Measure } from "../measure";
import { Quantity } from "../quantity";
import { grams, meters, seconds } from "./base";

// Time
export const minutes: Quantity.Time = Measure.of(60, seconds, "min");
export const hours: Quantity.Time = Measure.of(60, minutes, "hr");
export const days: Quantity.Time = Measure.of(24, hours, "d");

// Length
export const inches: Quantity.Length = Measure.of(0.0254, meters, "in");
export const thous: Quantity.Length = Measure.of(0.001, inches, "th");
export const feet: Quantity.Length = Measure.of(12, inches, "ft");
export const yards: Quantity.Length = Measure.of(3, feet, "yd");
export const chains: Quantity.Length = Measure.of(22, yards, "ch");
export const furlongs: Quantity.Length = Measure.of(10, chains, "fur");
export const miles: Quantity.Length = Measure.of(8, furlongs, "mi");
export const leagues: Quantity.Length = Measure.of(3, miles, "lea");
export const fathoms: Quantity.Length = Measure.of(1.852, meters, "ftm");
export const cables: Quantity.Length = Measure.of(100, fathoms, "cable");
export const nauticalMiles: Quantity.Length = Measure.of(10, cables, "nmi");
export const links: Quantity.Length = Measure.of(7.92, inches, "li");
export const rods: Quantity.Length = Measure.of(25, links, "rd");

// Area
export const perches: Quantity.Area = rods.squared().withSymbol("perch");
export const roods: Quantity.Area = furlongs.times(rods).withSymbol("rood");
export const acres: Quantity.Area = furlongs.times(chains).withSymbol("acre");

// Mass
export const pounds: Quantity.Mass = Measure.of(453.592_37, grams, "lb");
export const grains: Quantity.Mass = Measure.of(1 / 7000, pounds, "gr");
export const ounces: Quantity.Mass = Measure.of(1 / 16, pounds, "oz");
