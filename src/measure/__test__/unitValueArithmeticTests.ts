import { Exponent } from "../../exponent";
import { Unit, UnitWithSymbols } from "../unitTypeArithmetic";
import { dimension, divideUnits, exponentiateUnit, multiplyUnits, nthRootUnit } from "../unitValueArithmetic";

describe("Unit value arithmetic", () => {
    function addSymbols<U extends Unit>(unit: U): UnitWithSymbols<U> {
        const result: UnitWithSymbols = {};
        for (const dimension in unit) {
            const exponent: Exponent | undefined = unit[dimension];
            result[dimension] = exponent === undefined ? undefined : [dimension, exponent];
        }
        return result as any;
    }

    const x = dimension("x");
    const y = dimension("y");

    describe("bases", () => {
        it("should construct base units", () => {
            expect(dimension("x")).toEqual(addSymbols({ x: "1" }));
        });
    });

    describe("multiplication", () => {
        it("should multiply two different base units correctly", () => {
            expect(multiplyUnits(x, y)).toEqual(addSymbols({ x: "1", y: "1" }));
        });

        it("should multiply two of the same base unit correctly", () => {
            expect(multiplyUnits(x, x)).toEqual(addSymbols({ x: "2" }));
        });

        it("should multiply complex units correctly", () => {
            const left = addSymbols({ x: "1", y: "-2" });
            const right = addSymbols({ y: "1", z: "2" });
            expect(multiplyUnits(left, right)).toEqual(addSymbols({ x: "1", y: "-1", z: "2" }));
        });

        it("should remove zero exponents from the result", () => {
            const left = addSymbols({ x: "1", y: "2", z: "3" });
            const right = addSymbols({ x: "-1", y: "-2", z: "-3" });
            expect(multiplyUnits(left, right)).toEqual({});
        });

        it("should handle explicitly undefined and 0 exponents", () => {
            const left = addSymbols({ w: "0", x: "2", y: undefined });
            const right = addSymbols({ x: undefined, y: "0", z: undefined });
            expect(multiplyUnits(left, right)).toEqual(addSymbols({ x: "2" }));
        });
    });

    describe("division", () => {
        it("should correctly divide units", () => {
            const left = addSymbols({ x: "2", y: "2" });
            const right = addSymbols({ x: "2", y: "-1", z: "2" });
            expect(divideUnits(left, right)).toEqual(addSymbols({ y: "3", z: "-2" }));
        });
    });

    describe("exponentiation", () => {
        it("should square a simple unit", () => {
            expect(exponentiateUnit(x, "2")).toEqual(addSymbols({ x: "2" }));
        });

        it("should cube a simple unit", () => {
            expect(exponentiateUnit(x, "3")).toEqual(addSymbols({ x: "3" }));
        });

        it("should square a complex unit", () => {
            expect(exponentiateUnit(addSymbols({ x: "1", y: "-2" }), "2")).toEqual(addSymbols({ x: "2", y: "-4" }));
        });

        it("should invert a unit", () => {
            expect(exponentiateUnit(addSymbols({ x: "-1", y: "2", z: "-3" }), "-1")).toEqual(
                addSymbols({ x: "1", y: "-2", z: "3" }),
            );
        });

        it("should return the same unit when raised to the one", () => {
            const input = addSymbols({ x: "-1", y: "2", z: "-3" });
            expect(exponentiateUnit(input, "1")).toEqual(input);
        });

        it("should return a dimensionless unit when raised to the zero", () => {
            expect(exponentiateUnit(addSymbols({ x: "-1", y: "2", z: "-3" }), "0")).toEqual({});
        });

        it("should handle explicitly undefined and 0 exponents", () => {
            expect(exponentiateUnit(addSymbols({ x: "2", y: undefined, z: "0" }), "2")).toEqual(addSymbols({ x: "4" }));
        });
    });

    describe("roots", () => {
        it("should square root the unit", () => {
            expect(nthRootUnit(addSymbols({ x: "4", y: "-2" }), "2")).toEqual(addSymbols({ x: "2", y: "-1" }));
        });

        it("should cube root the unit", () => {
            expect(nthRootUnit(addSymbols({ x: "3", y: "-3" }), "3")).toEqual(addSymbols({ x: "1", y: "-1" }));
        });

        it("should handle explicitly undefined and 0 exponents", () => {
            expect(nthRootUnit(addSymbols({ x: "2", y: undefined, z: "0" }), "2")).toEqual(addSymbols({ x: "1" }));
        });
    });
});
