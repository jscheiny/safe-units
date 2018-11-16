import { Measure } from "../../measure/numberMeasure";
import { degrees, piRadians } from "../angle";
import { meters, radians } from "../base";
import * as Trig from "../trig";

describe("Trig", () => {
    const zeroRadians = Measure.of(0, radians);
    const zero = Measure.dimensionless(0);

    it("normal", () => {
        expect(Trig.cos(zeroRadians)).toEqual(Measure.dimensionless(1));
        expect(Trig.sin(zeroRadians)).toEqual(zero);
        expect(Trig.tan(zeroRadians)).toEqual(zero);
    });

    it("inverse", () => {
        expect(Trig.acos(zero)).toEqual(Measure.of(0.5, piRadians));
        expect(Trig.asin(zero)).toEqual(zeroRadians);
        expect(Trig.atan(zero)).toEqual(zeroRadians);
        expect(Trig.atan2(Measure.of(5, meters), Measure.of(5, meters))).toEqual(Measure.of(45, degrees));
    });
});
