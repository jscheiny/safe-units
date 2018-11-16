import { Measure } from "../measure/numberMeasure";
import { radians } from "./base";
import { PlaneAngle } from "./quantities";

export const piRadians: PlaneAngle = Measure.of(Math.PI, radians, "pi rad");
export const tauRadians: PlaneAngle = Measure.of(2, piRadians, "tau rad");

export const degrees: PlaneAngle = Measure.of(1 / 180, piRadians, "deg");
export const arcMinutes: PlaneAngle = Measure.of(1 / 60, degrees, "arcmin");
export const arcSeconds: PlaneAngle = Measure.of(1 / 60, arcMinutes, "arcsec");
