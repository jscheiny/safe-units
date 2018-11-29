import { Measure } from "../measure/numberMeasure";
import { kilograms, meters, seconds } from "./base";
import { Area, Length, Mass, Time } from "./quantities";

// Time
export const minutes: Time = Measure.of(60, seconds, "min");
export const hours: Time = Measure.of(60, minutes, "hr");
export const days: Time = Measure.of(24, hours, "d");

// Length
export const inches: Length = Measure.of(0.0254, meters, "in");
export const thous: Length = Measure.of(0.001, inches, "th");
export const feet: Length = Measure.of(12, inches, "ft");
export const yards: Length = Measure.of(3, feet, "yd");
export const chains: Length = Measure.of(22, yards, "ch");
export const furlongs: Length = Measure.of(10, chains, "fur");
export const miles: Length = Measure.of(8, furlongs, "mi");
export const leagues: Length = Measure.of(3, miles, "lea");
export const fathoms: Length = Measure.of(1.852, meters, "ftm");
export const cables: Length = Measure.of(100, fathoms, "cable");
export const nauticalMiles: Length = Measure.of(10, cables, "nmi");
export const links: Length = Measure.of(7.92, inches, "li");
export const rods: Length = Measure.of(25, links, "rd");

// Area
export const perches: Area = rods.squared().withSymbol("perch");
export const roods: Area = furlongs.times(rods).withSymbol("rood");
export const acres: Area = furlongs.times(chains).withSymbol("acre");

// Mass
export const grams: Mass = Measure.of(0.001, kilograms, "g");
export const pounds: Mass = Measure.of(453.592_37, grams, "lb");
export const grains: Mass = Measure.of(1 / 7000, pounds, "gr");
export const ounces: Mass = Measure.of(1 / 16, pounds, "oz");
