import { degrees, piRadians } from "../../unit/angle";
import { meters, radians } from "../../unit/base";
import * as SafeMath from "../math";
import { Measure } from "../measure";

describe("Math", () => {
    it("trig", () => {
        const zeroRadians = Measure.of(0, radians);
        const zero = Measure.dimensionless(0);
        expect(SafeMath.cos(zeroRadians)).toEqual(Measure.dimensionless(1));
        expect(SafeMath.sin(zeroRadians)).toEqual(zero);
        expect(SafeMath.tan(zeroRadians)).toEqual(zero);
        expect(SafeMath.acos(zero)).toEqual(Measure.of(0.5, piRadians));
        expect(SafeMath.asin(zero)).toEqual(zeroRadians);
        expect(SafeMath.atan(zero)).toEqual(zeroRadians);
        expect(SafeMath.atan2(Measure.of(5, meters), Measure.of(5, meters))).toEqual(Measure.of(45, degrees));
    });
});
