import { Numeric } from "../genericMeasure";
import { createMeasureType } from "../genericMeasureFactory";
import { wrapBinaryFn, wrapSpreadFn, wrapUnaryFn } from "../genericMeasureUtils";
import { Measure } from "../numberMeasure";

describe("Generic measures", () => {
    describe("function wrappers", () => {
        const meters = Measure.dimension("length", "m");

        it("unary wrapper", () => {
            const increment = wrapUnaryFn((x: number) => x + 1);
            const result = increment(Measure.of(10, meters));
            expect(result).toEqual(Measure.of(11, meters));
        });

        it("binary wrapper", () => {
            const add = wrapBinaryFn((left: number, right: number) => left + right);
            const result = add(Measure.of(5, meters), Measure.of(10, meters));
            expect(result).toEqual(Measure.of(15, meters));
        });

        it("spread wrapper", () => {
            const sum = wrapSpreadFn((...values: number[]) => values.reduce((a, b) => a + b, 0));
            const result = sum(Measure.of(5, meters), Measure.of(10, meters), Measure.of(15, meters));
            expect(result).toEqual(Measure.of(30, meters));
        });
    });

    describe("static methods", () => {
        const numericOps: Numeric<number> = {
            one: () => 1,
            neg: x => -x,
            add: (x, y) => x + y,
            sub: (x, y) => x - y,
            mult: (x, y) => x * y,
            div: (x, y) => x / y,
            pow: (x, y) => x ** y,
            compare: (x, y) => x - y,
            format: x => `${x}`,
        };

        it("should attach static methods when given", () => {
            const LocalMeasure = createMeasureType(numericOps, {
                staticMethod: () => "method",
            });
            expect("staticMethod" in LocalMeasure).toBe(true);
        });

        it("should not attach static methods when omitted", () => {
            const LocalMeasure = createMeasureType(numericOps);
            expect("staticMethod" in LocalMeasure).toBe(false);
        });
    });
});
