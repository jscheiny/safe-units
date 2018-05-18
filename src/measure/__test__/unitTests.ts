import { addVectors, basisVector, DimensionVector, inverseScaleVector, scaleVector, subtractVectors } from "../vector";

describe("Units", () => {
    const x = basisVector("x");
    const y = basisVector("y");

    function unit<U extends DimensionVector>(unit: U): U {
        return unit;
    }

    describe("bases", () => {
        it("should construct base units", () => {
            expect(basisVector("x")).toEqual({ x: 1 });
        });
    });

    describe("multiplication", () => {
        it("should multiply two different base units correctly", () => {
            expect(addVectors(x, y)).toEqual({ x: 1, y: 1 });
        });

        it("should multiply two of the same base unit correctly", () => {
            expect(addVectors(x, x)).toEqual({ x: 2 });
        });

        it("should multiply complex units correctly", () => {
            const left = unit({ x: 1, y: -2 });
            const right = unit({ y: 1, z: 2 });
            expect(addVectors(left, right)).toEqual({ x: 1, y: -1, z: 2 });
        });

        it("should remove zero exponents from the result", () => {
            const left = unit({ x: 1, y: 2, z: 3 });
            const right = unit({ x: -1, y: -2, z: -3 });
            expect(addVectors(left, right)).toEqual({});
        });

        it("should throw an error when an exponent is out of bounds", () => {
            const positive = unit({ x: 3 });
            expect(() => addVectors(positive, positive)).toThrow();

            const negative = unit({ x: -3 });
            expect(() => addVectors(negative, negative)).toThrow();
        });

        it("should handle explicitly undefined and 0 exponents", () => {
            const left = unit({ x: 2, y: undefined });
            const right = unit({ x: undefined, y: 0, z: undefined });
            expect(addVectors(left, right)).toEqual({ x: 2 });
        });
    });

    describe("division", () => {
        it("should correctly divide units", () => {
            const left = unit({ x: 2, y: 2 });
            const right = unit({ x: 2, y: -1, z: 2 });
            expect(subtractVectors(left, right)).toEqual({ y: 3, z: -2 });
        });
    });

    describe("exponentiation", () => {
        it("should square a simple unit", () => {
            expect(scaleVector(x, 2)).toEqual({ x: 2 });
        });

        it("should cube a simple unit", () => {
            expect(scaleVector(x, 3)).toEqual({ x: 3 });
        });

        it("should square a complex unit", () => {
            expect(scaleVector(unit({ x: 1, y: -2 }), 2)).toEqual({ x: 2, y: -4 });
        });

        it("should invert a unit", () => {
            expect(scaleVector(unit({ x: -1, y: 2, z: -3 }), -1)).toEqual({ x: 1, y: -2, z: 3 });
        });

        it("should return the same unit when raised to the one", () => {
            const input = unit({ x: -1, y: 2, z: -3 });
            expect(scaleVector(input, 1)).toEqual(input);
        });

        it("should return a scalar unit when raised to the zero", () => {
            expect(scaleVector(unit({ x: -1, y: 2, z: -3 }), 0)).toEqual({});
        });

        it("should throw an error when an exponent is out of bounds", () => {
            expect(() => scaleVector(unit({ x: 3 }), 2)).toThrow();
            expect(() => scaleVector(unit({ x: 2 }), -3)).toThrow();
        });

        it("should handle explicitly undefined and 0 exponents", () => {
            expect(scaleVector(unit({ x: 2, y: undefined, z: 0 }), 2)).toEqual({ x: 4 });
        });
    });

    describe("roots", () => {
        it("should square root the unit", () => {
            expect(inverseScaleVector(unit({ x: 4, y: -2 }), 2)).toEqual({ x: 2, y: -1 });
        });

        it("should cube root the unit", () => {
            expect(inverseScaleVector(unit({ x: 3, y: -3 }), 3)).toEqual({ x: 1, y: -1 });
        });

        it("should throw an error when an exponent can't be divided", () => {
            const u = unit({ x: 4, y: -3 });
            expect(() => inverseScaleVector(u, 2)).toThrow();
            expect(() => inverseScaleVector(u, 3)).toThrow();
        });

        it("should handle explicitly undefined and 0 exponents", () => {
            expect(inverseScaleVector(unit({ x: 2, y: undefined, z: 0 }), 2)).toEqual({ x: 1 });
        });
    });
});
