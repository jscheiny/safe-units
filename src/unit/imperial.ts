import { cubic, Measure } from "../measure";
import { Quantity } from "../quantity";
import { grains, inches, pounds } from "./common";

// Liquid Volume
export const fluidOunces: Quantity.Volume = Measure.of(1.7339, cubic(inches), "fl oz");
export const gills: Quantity.Volume = Measure.of(5, fluidOunces, "gi");
export const pints: Quantity.Volume = Measure.of(20, fluidOunces, "pt");
export const quarts: Quantity.Volume = Measure.of(2, pints, "qt");
export const gallons: Quantity.Volume = Measure.of(4, quarts, "gal");

// Mass
export const drachms: Quantity.Mass = Measure.of(1 / 256, grains, "dr");
export const stone: Quantity.Mass = Measure.of(14, pounds, "st");
export const quarters: Quantity.Mass = Measure.of(2, stone, "qtr");
export const hundredweights: Quantity.Mass = Measure.of(112, pounds, "cwd");
export const tons: Quantity.Mass = Measure.of(2240, pounds, "t");
