import { cubic, Measure, square } from "../measure";
import { addSymbols } from "./testUtils";

describe("Measures", () => {
    const meter = Measure.dimension("L");
    const second = Measure.dimension("T");
    const mps = meter.per(second);
    const mps2 = mps.per(second);

    describe("dimension", () => {
        it("should create dimensions with value 1", () => {
            expect(Measure.dimension("foo", "f")).toEqual({ value: 1, unit: { foo: ["f", 1] }, symbol: "f" });
        });
    });

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

        it("should construct dimensionless values", () => {
            const dimensionless = Measure.dimensionless(3);
            expect(dimensionless.value).toBe(3);
            expect(dimensionless.getUnit()).toEqual({});
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

        it("should scale", () => {
            const value = Measure.of(10, mps);
            const three = Measure.dimensionless(3);
            expect(value.scale(2)).toEqual(Measure.of(20, mps));
            expect(value.scale(three)).toEqual(Measure.of(30, mps));
        });

        it("should exponentiate", () => {
            const value = Measure.of(10, meter);

            expect(value.inverse()).toEqual(Measure.of(0.1, meter.inverse()));
            expect(value.reciprocal()).toEqual(Measure.of(0.1, meter.inverse()));
            expect(value.toThe(0)).toEqual(Measure.dimensionless(1));
            expect(value.toThe(1)).toEqual(Measure.of(10, meter));
            expect(value.squared()).toEqual(Measure.of(100, meter.squared()));
            expect(square(value)).toEqual(Measure.of(100, meter.squared()));
            expect(cubic(value)).toEqual(Measure.of(1000, meter.cubed()));
        });
    });

    describe("comparison", () => {
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

    describe("symbols", () => {
        it("should assign a symbol via .of()", () => {
            expect(Measure.of(1000, meter, "km").getSymbol()).toBe("km");
        });

        it("should copy assign a symbol via .withSymbol()", () => {
            const original = Measure.of(1000, meter);
            const result = original.withSymbol("km");
            expect(result).not.toBe(original);
            expect(original.getSymbol()).toBeUndefined();
            expect(result.getSymbol()).toBe("km");
        });

        it("should not pass along symbols through operations", () => {
            const km = Measure.of(1000, meter.squared()).withSymbol("km2");
            const dm = Measure.of(10, meter.squared()).withSymbol("dm2");
            expect(km.normalized().getSymbol()).toBeUndefined();
            expect(km.negate().getSymbol()).toBeUndefined();
            expect(km.squared().getSymbol()).toBeUndefined();
            expect(km.inverse().getSymbol()).toBeUndefined();
            expect(km.plus(dm).getSymbol()).toBeUndefined();
            expect(km.minus(dm).getSymbol()).toBeUndefined();
            expect(km.times(dm).getSymbol()).toBeUndefined();
            expect(km.over(dm).getSymbol()).toBeUndefined();
        });
    });

    describe("formatting", () => {
        it("should format dimensionless units", () => {
            expect(Measure.dimensionless(10).toString()).toBe("10");
            expect(Measure.unsafeConstruct(10, addSymbols({ x: 0, y: undefined })).toString()).toBe("10");
        });

        it("should format base units", () => {
            expect(meter.toString()).toBe("1 L");
            expect(Measure.of(5.3, meter).toString()).toBe("5.3 L");
        });

        it("should format complex units", () => {
            expect(Measure.of(5, meter.squared()).toString()).toBe("5 L^2");
            expect(Measure.of(5, second.inverse()).toString()).toBe("5 T^-1");
            expect(Measure.of(5, meter.times(second)).toString()).toBe("5 L * T");
            expect(Measure.of(5, meter.over(second)).toString()).toBe("5 L * T^-1");
            expect(Measure.of(5, meter.cubed().over(second)).toString()).toBe("5 L^3 * T^-1");
            expect(Measure.of(5, meter.cubed().over(second.squared())).toString()).toBe("5 L^3 * T^-2");
        });

        it("should have consistent formatting no matter how the unit is constructed", () => {
            const metersTimesSecond = "5 L * T";
            expect(Measure.of(5, meter.times(second)).toString()).toBe(metersTimesSecond);
            expect(Measure.of(5, second.times(meter)).toString()).toBe(metersTimesSecond);

            const metersPerSecond = "5 L * T^-1";
            expect(Measure.of(5, meter.per(second)).toString()).toBe(metersPerSecond);
            expect(Measure.of(5, second.inverse().times(meter)).toString()).toBe(metersPerSecond);
        });

        it("should not format using symbol even if present", () => {
            expect(
                Measure.of(5, meter.squared())
                    .withSymbol("m2")
                    .toString(),
            ).toBe("5 L^2");
            expect(
                Measure.dimensionless(0)
                    .withSymbol("rad")
                    .toString(),
            ).toBe("0");
        });

        it("should skip formatting explicitly 0 and undefined dimension", () => {
            expect(Measure.unsafeConstruct(10, addSymbols({ x: 0, y: undefined, z: 2 })).toString()).toBe("10 z^2");
        });

        it("should format measures as other measures with symbols", () => {
            const glorbs = Measure.of(100, meter, "glb");
            expect(Measure.of(1000, meter).in(glorbs)).toBe("10 glb");
        });

        it("should use normal formatting if the other measure has no symbol", () => {
            const glorbs = Measure.of(100, meter);
            expect(Measure.of(1000, meter).in(glorbs)).toBe("1000 L");
        });

        it("should use base unit symbols to format when available", () => {
            const m = Measure.dimension("test-length", "meter");
            const s = Measure.dimension("test-time", "second");
            expect(m.toString()).toBe("1 meter");
            expect(Measure.of(1, m.per(s)).toString()).toBe("1 meter * second^-1");
            expect(Measure.of(1, m.squared().per(s.squared())).toString()).toBe("1 meter^2 * second^-2");
        });
    });
});
