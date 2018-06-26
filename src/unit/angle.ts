import { Measure } from "../measure/measure";
import { radians } from "./base";

export const piRadians = Measure.of(Math.PI, radians, "pi rad");
export const tauRadians = Measure.of(2, piRadians, "tau rad");

export const degrees = Measure.of(1 / 180, piRadians, "deg");
export const arcMinutes = Measure.of(1 / 60, degrees, "arcmin");
export const arcSeconds = Measure.of(1 / 60, arcMinutes, "arcsec");
