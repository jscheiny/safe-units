import { Measure } from "../measure";
import { radians } from "./base";

export const pi = Measure.of(Math.PI, radians, "pi");
export const tau = Measure.of(2, pi, "tau");

export const degrees = Measure.of(1 / 180, pi, "deg");
export const arcMinutes = Measure.of(1 / 60, degrees, "arcmin");
export const arcSeconds = Measure.of(1 / 60, arcMinutes, "arcsec");
