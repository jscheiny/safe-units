import { cubic, Measure } from "../measure";
import { Quantity } from "../quantity";
import { grams, meters } from "./base";
import { grains, inches, pounds } from "./common";
import { micro } from "./metric";
import { liters } from "./other";

// Length
export const points: Quantity.Length = Measure.of(352.778, micro(meters), "p");
export const picas: Quantity.Length = Measure.of(12, points, "pica");

// Liquid volume
export const minims: Quantity.Volume = Measure.of(61.611_519_921_875, micro(liters), "min");
export const fluidDrams: Quantity.Volume = Measure.of(60, minims, "fl dr");
export const teaspoons: Quantity.Volume = Measure.of(80, minims, "tsp");
export const tablespoons: Quantity.Volume = Measure.of(3, teaspoons, "Tbsp");
export const fluidOunces: Quantity.Volume = Measure.of(2, tablespoons, "fl oz");
export const shots: Quantity.Volume = Measure.of(3, tablespoons, "jig");
export const gills: Quantity.Volume = Measure.of(4, fluidOunces, "gi");
export const cups: Quantity.Volume = Measure.of(2, gills, "cp");
export const pints: Quantity.Volume = Measure.of(2, cups, "pt");
export const quarts: Quantity.Volume = Measure.of(2, pints, "qt");
export const gallons: Quantity.Volume = Measure.of(4, quarts, "gal");
export const barrels: Quantity.Volume = Measure.of(31.5, gallons, "liq bbl");
export const oilBarrels: Quantity.Volume = Measure.of(42, gallons, "bbl");
export const hogsheads: Quantity.Volume = Measure.of(63, gallons, "hogshead");

// Dry volume
export const dryPints: Quantity.Volume = Measure.of(0.550_610_471_3575, liters, "dry pt");
export const dryQuarts: Quantity.Volume = Measure.of(2, dryPints, "dry qt");
export const dryGallons: Quantity.Volume = Measure.of(4, dryQuarts, "dry gal");
export const pecks: Quantity.Volume = Measure.of(2, dryGallons, "pk");
export const bushels: Quantity.Volume = Measure.of(4, pecks, "bu");
export const dryBarrels: Quantity.Volume = Measure.of(7056, cubic(inches), "dry bbl");

// Mass
export const drams: Quantity.Mass = Measure.of(1.771_845_195_3125, grams, "dr");
export const pennyweights: Quantity.Mass = Measure.of(24, grains, "dwt");
export const hundredweights: Quantity.Mass = Measure.of(100, pounds, "cwd");
export const tons: Quantity.Mass = Measure.of(2000, pounds, "ton");
