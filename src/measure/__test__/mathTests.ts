import { degrees, pi } from "../../unit/angle";
import { meters, radians, seconds } from "../../unit/base";
import * as SafeMath from "../math";
import { Measure } from "../measure";

describe("Math", () => {
    const mps = meters.per(seconds);

    it("arithmetic", () => {
        expect(SafeMath.add(Measure.of(5, mps), Measure.of(-5, mps))).toEqual(Measure.of(0, mps));
        expect(SafeMath.subtract(Measure.of(5, mps), Measure.of(-5, mps))).toEqual(Measure.of(10, mps));
        expect(SafeMath.multiply(Measure.of(5, mps), Measure.of(10, seconds))).toEqual(Measure.of(50, meters));
        expect(SafeMath.divide(Measure.of(50, meters), Measure.of(10, seconds))).toEqual(Measure.of(5, mps));
    });

    it("trig", () => {
        const zeroRadians = Measure.of(0, radians);
        const zero = Measure.dimensionless(0);
        expect(SafeMath.cos(zeroRadians)).toEqual(Measure.dimensionless(1));
        expect(SafeMath.sin(zeroRadians)).toEqual(zero);
        expect(SafeMath.tan(zeroRadians)).toEqual(zero);
        expect(SafeMath.acos(zero)).toEqual(Measure.of(0.5, pi));
        expect(SafeMath.asin(zero)).toEqual(zeroRadians);
        expect(SafeMath.atan(zero)).toEqual(zeroRadians);
        expect(SafeMath.atan2(Measure.of(5, meters), Measure.of(5, meters))).toEqual(Measure.of(45, degrees));
    });

    it("abs", () => {
        expect(SafeMath.abs(Measure.of(-10, mps))).toEqual(Measure.of(10, mps));
    });

    it("cbrt", () => {
        expect(SafeMath.cbrt(Measure.of(64, seconds.cubed()))).toEqual(Measure.of(4, seconds));
    });

    it("ceil", () => {
        expect(SafeMath.ceil(Measure.of(3.4, mps))).toEqual(Measure.of(4, mps));
    });

    it("floor", () => {
        expect(SafeMath.floor(Measure.of(7.8, mps))).toEqual(Measure.of(7, mps));
    });

    it("hypot", () => {
        expect(SafeMath.hypot(Measure.of(3, meters), Measure.of(4, meters))).toEqual(Measure.of(5, meters));
    });

    it("max", () => {
        expect(SafeMath.max(Measure.of(10, mps), Measure.of(5, mps), Measure.of(15, mps))).toEqual(Measure.of(15, mps));
    });

    it("min", () => {
        expect(SafeMath.min(Measure.of(10, mps), Measure.of(5, mps), Measure.of(15, mps))).toEqual(Measure.of(5, mps));
    });

    it("pow", () => {
        expect(SafeMath.pow(Measure.of(10, meters), 3)).toEqual(Measure.of(1000, meters.cubed()));
    });

    it("round", () => {
        expect(SafeMath.round(Measure.of(7.8, mps))).toEqual(Measure.of(8, mps));
    });

    it("sqrt", () => {
        expect(SafeMath.sqrt(Measure.of(25, meters.squared()))).toEqual(Measure.of(5, meters));
    });

    it("sum", () => {
        expect(SafeMath.sum(Measure.of(10, mps), Measure.of(5, mps), Measure.of(15, mps))).toEqual(Measure.of(30, mps));
    });

    it("trunc", () => {
        expect(SafeMath.trunc(Measure.of(-7.8, mps))).toEqual(Measure.of(-7, mps));
    });
});
