import { Measure } from "../measure/numberMeasure";
import { meters } from "./base";
import { grains, grams, inches, pounds } from "./common";
import { micro } from "./metric";
import { liters } from "./other";
import { Length, Mass, Volume } from "./quantities";

// Length
export const points: Length = Measure.of(352.778, micro(meters), "p");
export const picas: Length = Measure.of(12, points, "pica");

// Liquid volume
export const minims: Volume = Measure.of(61.611_519_921_875, micro(liters), "min");
export const fluidDrams: Volume = Measure.of(60, minims, "fl dr");
export const teaspoons: Volume = Measure.of(80, minims, "tsp");
export const tablespoons: Volume = Measure.of(3, teaspoons, "Tbsp");
export const fluidOunces: Volume = Measure.of(2, tablespoons, "fl oz");
export const shots: Volume = Measure.of(3, tablespoons, "jig");
export const gills: Volume = Measure.of(4, fluidOunces, "gi");
export const cups: Volume = Measure.of(2, gills, "cp");
export const pints: Volume = Measure.of(2, cups, "pt");
export const quarts: Volume = Measure.of(2, pints, "qt");
export const gallons: Volume = Measure.of(4, quarts, "gal");
export const barrels: Volume = Measure.of(31.5, gallons, "liq bbl");
export const oilBarrels: Volume = Measure.of(42, gallons, "bbl");
export const hogsheads: Volume = Measure.of(63, gallons, "hogshead");

// Dry volume
export const dryPints: Volume = Measure.of(0.550_610_471_3575, liters, "dry pt");
export const dryQuarts: Volume = Measure.of(2, dryPints, "dry qt");
export const dryGallons: Volume = Measure.of(4, dryQuarts, "dry gal");
export const pecks: Volume = Measure.of(2, dryGallons, "pk");
export const bushels: Volume = Measure.of(4, pecks, "bu");
export const dryBarrels: Volume = Measure.of(7056, inches.cubed(), "dry bbl");

// Mass
export const drams: Mass = Measure.of(1.771_845_195_3125, grams, "dr");
export const pennyweights: Mass = Measure.of(24, grains, "dwt");
export const hundredweights: Mass = Measure.of(100, pounds, "cwd");
export const tons: Mass = Measure.of(2000, pounds, "ton");
