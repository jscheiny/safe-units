import { dimension, divideUnits, exponentiateUnit, multiplyUnits, nthRootUnit, Unit } from "../units";

describe("Units", () => {
    const x = dimension("x");
    const y = dimension("y");

    function unit<U extends Unit>(unit: U): U {
        return unit;
    }

    describe("bases", () => {
        it("should construct base units", () => {
            expect(dimension("x")).toEqual({ x: 1 });
        });
    });

    describe("multiplication", () => {
        it("should multiply two different base units correctly", () => {
            expect(multiplyUnits(x, y)).toEqual({ x: 1, y: 1 });
        });

        it("should multiply two of the same base unit correctly", () => {
            expect(multiplyUnits(x, x)).toEqual({ x: 2 });
        });

        it("should multiply complex units correctly", () => {
            const left = unit({ x: 1, y: -2 });
            const right = unit({ y: 1, z: 2 });
            expect(multiplyUnits(left, right)).toEqual({ x: 1, y: -1, z: 2 });
        });

        it("should remove zero exponents from the result", () => {
            const left = unit({ x: 1, y: 2, z: 3 });
            const right = unit({ x: -1, y: -2, z: -3 });
            expect(multiplyUnits(left, right)).toEqual({});
        });

        it("should throw an error when an exponent is out of bounds", () => {
            const positive = unit({ x: 3 });
            expect(() => multiplyUnits(positive, positive)).toThrow();

            const negative = unit({ x: -3 });
            expect(() => multiplyUnits(negative, negative)).toThrow();
        });

        it("should handle explicitly undefined and 0 exponents", () => {
            const left = unit({ x: 2, y: undefined });
            const right = unit({ x: undefined, y: 0, z: undefined });
            expect(multiplyUnits(left, right)).toEqual({ x: 2 });
        });
    });

    describe("division", () => {
        it("should correctly divide units", () => {
            const left = unit({ x: 2, y: 2 });
            const right = unit({ x: 2, y: -1, z: 2 });
            expect(divideUnits(left, right)).toEqual({ y: 3, z: -2 });
        });
    });

    describe("exponentiation", () => {
        it("should square a simple unit", () => {
            expect(exponentiateUnit(x, 2)).toEqual({ x: 2 });
        });

        it("should cube a simple unit", () => {
            expect(exponentiateUnit(x, 3)).toEqual({ x: 3 });
        });

        it("should square a complex unit", () => {
            expect(exponentiateUnit(unit({ x: 1, y: -2 }), 2)).toEqual({ x: 2, y: -4 });
        });

        it("should invert a unit", () => {
            expect(exponentiateUnit(unit({ x: -1, y: 2, z: -3 }), -1)).toEqual({ x: 1, y: -2, z: 3 });
        });

        it("should return the same unit when raised to the one", () => {
            const input = unit({ x: -1, y: 2, z: -3 });
            expect(exponentiateUnit(input, 1)).toEqual(input);
        });

        it("should return a dimensionless unit when raised to the zero", () => {
            expect(exponentiateUnit(unit({ x: -1, y: 2, z: -3 }), 0)).toEqual({});
        });

        it("should throw an error when an exponent is out of bounds", () => {
            expect(() => exponentiateUnit(unit({ x: 3 }), 2)).toThrow();
            expect(() => exponentiateUnit(unit({ x: 2 }), -3)).toThrow();
        });

        it("should handle explicitly undefined and 0 exponents", () => {
            expect(exponentiateUnit(unit({ x: 2, y: undefined, z: 0 }), 2)).toEqual({ x: 4 });
        });
    });

    describe("roots", () => {
        it("should square root the unit", () => {
            expect(nthRootUnit(unit({ x: 4, y: -2 }), 2)).toEqual({ x: 2, y: -1 });
        });

        it("should cube root the unit", () => {
            expect(nthRootUnit(unit({ x: 3, y: -3 }), 3)).toEqual({ x: 1, y: -1 });
        });

        it("should throw an error when an exponent can't be divided", () => {
            const u = unit({ x: 4, y: -3 });
            expect(() => nthRootUnit(u as any, 2)).toThrow();
            expect(() => nthRootUnit(u as any, 3)).toThrow();
        });

        it("should handle explicitly undefined and 0 exponents", () => {
            expect(nthRootUnit(unit({ x: 2, y: undefined, z: 0 }), 2)).toEqual({ x: 1 });
        });
    });
});
