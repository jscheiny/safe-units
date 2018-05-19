import { cubic, Measure } from "../measure";
import { grains, inches, pounds } from "./common";

// Liquid Volume
export const fluidOunces = Measure.of(1.7339, cubic(inches), "fl oz");
export const gills = Measure.of(5, fluidOunces, "gi");
export const pints = Measure.of(20, fluidOunces, "pt");
export const quarts = Measure.of(2, pints, "qt");
export const gallons = Measure.of(4, quarts, "gal");

// Mass
export const drachms = Measure.of(1 / 256, grains, "dr");
export const stone = Measure.of(14, pounds, "st");
export const quarters = Measure.of(2, stone, "qtr");
export const hundredweights = Measure.of(112, pounds, "cwd");
export const tons = Measure.of(2240, pounds, "t");
