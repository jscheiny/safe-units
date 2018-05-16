import { Unit } from "../../units";
import { Measure } from "../measure";

describe("Measures", () => {
    const meter = Unit.basis("length");
    const second = Unit.basis("time");
    const mps = meter.per(second);
    const mps2 = mps.per(second);

    describe("arithmetic", () => {
        it("should negate", () => {
            const value = Measure.of(10, mps);
            expect(value.negate().value).toBe(-10);
            expect(value.negate().unit).toEqual(mps);
        });

        it("should add", () => {
            const left = Measure.of(10, mps);
            const right = Measure.of(5, mps);
            expect(left.plus(right).value).toBe(15);
            expect(left.plus(right).unit).toEqual(mps);
        });

        it("should subtract", () => {
            const left = Measure.of(10, second);
            const right = Measure.of(5, second);
            expect(left.minus(right).value).toBe(5);
            expect(left.minus(right).unit).toEqual(second);
        });

        it("should multiply", () => {
            const left = Measure.of(10, mps);
            const right = Measure.of(5, second);
            expect(left.times(right).value).toBe(50);
            expect(left.times(right).unit).toEqual(meter);
        });

        it("should divide", () => {
            const left = Measure.of(10, mps);
            const right = Measure.of(5, second);
            expect(left.over(right).value).toBe(2);
            expect(left.over(right).unit).toEqual(mps2);
        });

        it("should exponentiate", () => {
            const value = Measure.of(10, meter);

            const toThe0 = value.toThe(0);
            expect(toThe0.value).toBe(1);
            expect(toThe0.unit).toEqual(Unit.scalar());

            const toThe1 = value.toThe(1);
            expect(toThe1.value).toBe(10);
            expect(toThe1.unit).toEqual(meter);

            const toThe2 = value.toThe(2);
            expect(toThe2.value).toBe(100);
            expect(toThe2.unit).toEqual(meter.squared());
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
