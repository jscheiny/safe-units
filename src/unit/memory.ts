import { PrefixFn } from "../measure/genericMeasureUtils";
import { Measure } from "../measure/numberMeasure";
import { bits } from "./base";
import { Memory } from "./quantities";

export const bytes: Memory = Measure.of(8, bits, "B");

// HACKHACK: Explicitly type this so we can import PrefixFunction and avoid absolute paths in the generated typings.
export const kibi: PrefixFn = Measure.prefix("Ki", 1 << 10);
export const mebi = Measure.prefix("Mi", 1 << 20);
export const gibi = Measure.prefix("Gi", 1 << 30);
export const tebi = Measure.prefix("Ti", 1 << 40);
export const pibi = Measure.prefix("Pi", 1 << 50);
export const exbi = Measure.prefix("Ei", 1 << 60);
export const zebi = Measure.prefix("Zi", 1 << 70);
export const yobi = Measure.prefix("Yi", 1 << 80);
