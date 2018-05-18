import { Measure } from "../measure";

describe("Measures", () => {
    const meter = Measure.dimension("length");
    const second = Measure.dimension("time");
    const mps = meter.per(second);
    const mps2 = mps.per(second);

    describe("construction", () => {
        it("should construct from a number of and a unit", () => {
            const measure = Measure.of(10, mps2);
            expect(measure.value).toBe(10);
            expect(measure.getUnit()).toEqual(mps2.getUnit());
        });

        it("should construct from a number and another measure", () => {
            const kilometer = Measure.of(1000, meter);
            const measure = Measure.of(5.2, kilometer);
            expect(measure.value).toBe(5200);
            expect(measure.getUnit()).toEqual(meter.getUnit());
        });

        it("should construct scalar values", () => {
            const scalar = Measure.scalar(3);
            expect(scalar.value).toBe(3);
            expect(scalar.getUnit()).toEqual({});
        });
    });

    describe("arithmetic", () => {
        it("should negate", () => {
            const value = Measure.of(10, mps);
            expect(value.negate()).toEqual(Measure.of(-10, mps));
        });

        it("should add", () => {
            const left = Measure.of(10, mps);
            const right = Measure.of(5, mps);
            expect(left.plus(right)).toEqual(Measure.of(15, mps));
        });

        it("should subtract", () => {
            const left = Measure.of(10, second);
            const right = Measure.of(5, second);
            expect(left.minus(right)).toEqual(Measure.of(5, second));
        });

        it("should multiply", () => {
            const left = Measure.of(10, mps);
            const right = Measure.of(5, second);
            expect(left.times(right)).toEqual(Measure.of(50, meter));
        });

        it("should divide", () => {
            const left = Measure.of(10, mps);
            const right = Measure.of(5, second);
            expect(left.over(right)).toEqual(Measure.of(2, mps2));
            expect(left.per(right)).toEqual(Measure.of(2, mps2));
        });

        it("should exponentiate", () => {
            const value = Measure.of(10, meter);

            expect(value.inverse()).toEqual(Measure.of(0.1, meter.inverse()));
            expect(value.reciprocal()).toEqual(Measure.of(0.1, meter.inverse()));
            expect(value.toThe(0)).toEqual(Measure.scalar(1));
            expect(value.toThe(1)).toEqual(Measure.of(10, meter));
            expect(value.squared()).toEqual(Measure.of(100, meter.squared()));
            expect(value.cubed()).toEqual(Measure.of(1000, meter.cubed()));
        });

        it("should square root", () => {
            const value = Measure.of(100, meter.squared());
            expect(value.sqrt()).toEqual(Measure.of(10, meter));
        });

        it("should cube root", () => {
            const value = Measure.of(64, mps.cubed());
            expect(value.cbrt()).toEqual(Measure.of(4, mps));
        });
    });

    describe("Comparison", () => {
        const zero = Measure.of(0, meter);
        const five = Measure.of(5, meter);
        const ten = Measure.of(10, meter);

        it("should compare less than", () => {
            expect(five.isLessThan(zero)).toBe(false);
            expect(five.isLessThan(five)).toBe(false);
            expect(five.isLessThan(ten)).toBe(true);
        });

        it("should compare less than or equal to", () => {
            expect(five.isLessThanOrEqualTo(zero)).toBe(false);
            expect(five.isLessThanOrEqualTo(five)).toBe(true);
            expect(five.isLessThanOrEqualTo(ten)).toBe(true);
        });

        it("should compare equal to", () => {
            expect(five.isEqualTo(zero)).toBe(false);
            expect(five.isEqualTo(five)).toBe(true);
            expect(five.isEqualTo(ten)).toBe(false);
        });

        it("should compare not equal to", () => {
            expect(five.isNotEqualTo(zero)).toBe(true);
            expect(five.isNotEqualTo(five)).toBe(false);
            expect(five.isNotEqualTo(ten)).toBe(true);
        });

        it("should compare greater than or equal to", () => {
            expect(five.isGreaterThanOrEqualTo(zero)).toBe(true);
            expect(five.isGreaterThanOrEqualTo(five)).toBe(true);
            expect(five.isGreaterThanOrEqualTo(ten)).toBe(false);
        });

        it("should compare greater than", () => {
            expect(five.isGreaterThan(zero)).toBe(true);
            expect(five.isGreaterThan(five)).toBe(false);
            expect(five.isGreaterThan(ten)).toBe(false);
        });
    });
});
