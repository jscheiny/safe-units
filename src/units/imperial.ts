import { cubic, Measure } from "../measure";
import { grains, inches, pounds } from "./common";
import { Mass, Volume } from "./types";

// Liquid Volume
export const fluidOunces: Volume = Measure.of(1.7339, cubic(inches), "fl oz");
export const gills: Volume = Measure.of(5, fluidOunces, "gi");
export const pints: Volume = Measure.of(20, fluidOunces, "pt");
export const quarts: Volume = Measure.of(2, pints, "qt");
export const gallons: Volume = Measure.of(4, quarts, "gal");

// Mass
export const drachms: Mass = Measure.of(1 / 256, grains, "dr");
export const stone: Mass = Measure.of(14, pounds, "st");
export const quarters: Mass = Measure.of(2, stone, "qtr");
export const hundredweights: Mass = Measure.of(112, pounds, "cwd");
export const tons: Mass = Measure.of(2240, pounds, "t");
