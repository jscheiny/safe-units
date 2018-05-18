import * as SafeMath from "../math";
import { Measure } from "../measure";

describe("Math", () => {
    const meter = Measure.dimension("length");
    const second = Measure.dimension("time");
    const mps = meter.per(second);

    it("arithmetic", () => {
        expect(SafeMath.add(Measure.of(5, mps), Measure.of(-5, mps))).toEqual(Measure.of(0, mps));
        expect(SafeMath.subtract(Measure.of(5, mps), Measure.of(-5, mps))).toEqual(Measure.of(10, mps));
        expect(SafeMath.multiply(Measure.of(5, mps), Measure.of(10, second))).toEqual(Measure.of(50, meter));
        expect(SafeMath.divide(Measure.of(50, meter), Measure.of(10, second))).toEqual(Measure.of(5, mps));
    });

    it("abs", () => {
        expect(SafeMath.abs(Measure.of(-10, mps))).toEqual(Measure.of(10, mps));
    });

    it("cbrt", () => {
        expect(SafeMath.cbrt(Measure.of(64, second.cubed()))).toEqual(Measure.of(4, second));
    });

    it("ceil", () => {
        expect(SafeMath.ceil(Measure.of(3.4, mps))).toEqual(Measure.of(4, mps));
    });

    it("floor", () => {
        expect(SafeMath.floor(Measure.of(7.8, mps))).toEqual(Measure.of(7, mps));
    });

    it("hypot", () => {
        expect(SafeMath.hypot(Measure.of(3, meter), Measure.of(4, meter))).toEqual(Measure.of(5, meter));
    });

    it("max", () => {
        expect(SafeMath.max(Measure.of(10, mps), Measure.of(5, mps), Measure.of(15, mps))).toEqual(Measure.of(15, mps));
    });

    it("min", () => {
        expect(SafeMath.min(Measure.of(10, mps), Measure.of(5, mps), Measure.of(15, mps))).toEqual(Measure.of(5, mps));
    });

    it("pow", () => {
        expect(SafeMath.pow(Measure.of(10, meter), 3)).toEqual(Measure.of(1000, meter.cubed()));
    });

    it("round", () => {
        expect(SafeMath.round(Measure.of(7.8, mps))).toEqual(Measure.of(8, mps));
    });

    it("sqrt", () => {
        expect(SafeMath.sqrt(Measure.of(25, meter.squared()))).toEqual(Measure.of(5, meter));
    });

    it("sum", () => {
        expect(SafeMath.sum(Measure.of(10, mps), Measure.of(5, mps), Measure.of(15, mps))).toEqual(Measure.of(30, mps));
    });

    it("trunc", () => {
        expect(SafeMath.trunc(Measure.of(-7.8, mps))).toEqual(Measure.of(-7, mps));
    });
});
