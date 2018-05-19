import { cubic, Measure } from "../measure";
import { grams, meters } from "./base";
import { grains, inches, pounds } from "./common";
import { micro } from "./metric";
import { liters } from "./other";

// Length
export const points = Measure.of(352.778, micro(meters), "p");
export const picas = Measure.of(12, points, "pica");

// Liquid volume
export const minims = Measure.of(61.611_519_921_875, micro(liters), "min");
export const fluidDrams = Measure.of(60, minims, "fl dr");
export const teaspoons = Measure.of(80, minims, "tsp");
export const tablespoons = Measure.of(3, teaspoons, "Tbsp");
export const fluidOunces = Measure.of(2, tablespoons, "fl oz");
export const shots = Measure.of(3, tablespoons, "jig");
export const gills = Measure.of(4, fluidOunces, "gi");
export const cups = Measure.of(2, gills, "cp");
export const pints = Measure.of(2, cups, "pt");
export const quarts = Measure.of(2, pints, "qt");
export const gallons = Measure.of(4, quarts, "gal");
export const barrels = Measure.of(31.5, gallons, "liq bbl");
export const oilBarrels = Measure.of(42, gallons, "bbl");
export const hogsheads = Measure.of(63, gallons, "hogshead");

// Dry volume
export const dryPints = Measure.of(0.550_610_471_3575, liters, "dry pt");
export const dryQuarts = Measure.of(2, dryPints, "dry qt");
export const dryGallons = Measure.of(4, dryQuarts, "dry gal");
export const pecks = Measure.of(2, dryGallons, "pk");
export const bushels = Measure.of(4, pecks, "bu");
export const dryBarrels = Measure.of(7056, cubic(inches), "dry bbl");

// Mass
export const drams = Measure.of(1.771_845_195_3125, grams, "dr");
export const pennyweights = Measure.of(24, grains, "dwt");
export const hundredweights = Measure.of(100, pounds, "cwd");
export const tons = Measure.of(2000, pounds, "ton");
