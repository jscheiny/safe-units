import { Measure } from "../measure";
import { grams, meters, seconds } from "./base";

// Time
export const minutes = Measure.of(60, seconds, "min");
export const hours = Measure.of(60, minutes, "hr");
export const days = Measure.of(24, hours, "d");

// Length
export const inches = Measure.of(0.0254, meters, "in");
export const thous = Measure.of(0.001, inches, "th");
export const feet = Measure.of(12, inches, "ft");
export const yards = Measure.of(3, feet, "yd");
export const chains = Measure.of(22, yards, "ch");
export const furlongs = Measure.of(10, chains, "fur");
export const miles = Measure.of(8, furlongs, "mi");
export const leagues = Measure.of(3, miles, "lea");
export const fathoms = Measure.of(1.852, meters, "ftm");
export const cables = Measure.of(100, fathoms, "cable");
export const nauticalMiles = Measure.of(10, cables, "nmi");
export const links = Measure.of(7.92, inches, "li");
export const rods = Measure.of(25, links, "rd");

// Area
export const perches = rods.squared().withSymbol("perch");
export const roods = furlongs.times(rods).withSymbol("rood");
export const acres = furlongs.times(chains).withSymbol("acre");

// Mass
export const pounds = Measure.of(453.592_37, grams, "lb");
export const grains = Measure.of(1 / 7000, pounds, "gr");
export const ounces = Measure.of(1 / 16, pounds, "oz");
