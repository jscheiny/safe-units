import { Measure } from "../measure";
import { grams, meters } from "./base";
import { grains, inches, pounds } from "./common";
import { micro } from "./metric";
import { liters } from "./other";

// Length
export const point = Measure.of(352.778, micro(meters), "p");
export const pica = Measure.of(12, point, "pica");

// Liquid volume
export const minim = Measure.of(61.611_519_921_875, micro(liters), "min");
export const fluidDram = Measure.of(60, minim, "fl dr");
export const teaspoon = Measure.of(80, minim, "tsp");
export const tablespoon = Measure.of(3, teaspoon, "Tbsp");
export const fluidOunce = Measure.of(2, tablespoon, "fl oz");
export const shot = Measure.of(3, tablespoon, "jig");
export const gill = Measure.of(4, fluidOunce, "gi");
export const cup = Measure.of(2, gill, "cp");
export const pint = Measure.of(2, cup, "pt");
export const quart = Measure.of(2, pint, "qt");
export const gallon = Measure.of(4, quart, "gal");
export const barrel = Measure.of(31.5, gallon, "liq bbl");
export const oilBarrel = Measure.of(42, gallon, "bbl");
export const hogshead = Measure.of(63, gallon, "hogshead");

// Dry volume
export const dryPint = Measure.of(0.550_610_471_3575, liters, "dry pt");
export const dryQuart = Measure.of(2, dryPint, "dry qt");
export const dryGallon = Measure.of(4, dryQuart, "dry gal");
export const peck = Measure.of(2, dryGallon, "pk");
export const bushel = Measure.of(4, peck, "bu");
export const dryBarrel = Measure.of(7056, inches.cubed(), "dry bbl");

// Mass
export const dram = Measure.of(1.771_845_195_3125, grams, "dr");
export const pennyweight = Measure.of(24, grains, "dwt");
export const hundredweight = Measure.of(100, pounds, "cwd");
export const ton = Measure.of(2000, pounds, "ton");
