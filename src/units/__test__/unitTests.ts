import { addVectors, basisVector, DimensionVector, inverseScaleVector, scaleVector, subtractVectors } from "../vector";

describe("Units", () => {
    const x = basisVector("x");
    const y = basisVector("y");

    function vector<V extends DimensionVector>(v: V): V {
        return v;
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
            const left = vector({ x: 1, y: -2 });
            const right = vector({ y: 1, z: 2 });
            expect(addVectors(left, right)).toEqual({ x: 1, y: -1, z: 2 });
        });

        it("should remove zero exponents from the result", () => {
            const left = vector({ x: 1, y: 2, z: 3 });
            const right = vector({ x: -1, y: -2, z: -3 });
            expect(addVectors(left, right)).toEqual({});
        });

        it("should throw an error when an exponent is out of bounds", () => {
            const positive = vector({ x: 3 });
            expect(() => addVectors(positive, positive)).toThrow();

            const negative = vector({ x: -3 });
            expect(() => addVectors(negative, negative)).toThrow();
        });

        it("should handle explicitly undefined and 0 exponents", () => {
            const left = vector({ x: 2, y: undefined });
            const right = vector({ x: undefined, y: 0, z: undefined });
            expect(addVectors(left, right)).toEqual({ x: 2 });
        });
    });

    describe("division", () => {
        it("should correctly divide units", () => {
            const left = vector({ x: 2, y: 2 });
            const right = vector({ x: 2, y: -1, z: 2 });
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
            const unit = vector({ x: 1, y: -2 });
            expect(scaleVector(unit, 2)).toEqual({ x: 2, y: -4 });
        });

        it("should invert a unit", () => {
            const unit = vector({ x: -1, y: 2, z: -3 });
            expect(scaleVector(unit, -1)).toEqual({ x: 1, y: -2, z: 3 });
        });

        it("should return the same unit when raised to the one", () => {
            const unit = vector({ x: -1, y: 2, z: -3 });
            expect(scaleVector(unit, 1)).toEqual(unit);
        });

        it("should return a scalar unit when raised to the zero", () => {
            const unit = vector({ x: -1, y: 2, z: -3 });
            expect(scaleVector(unit, 0)).toEqual({});
        });

        it("should throw an error when an exponent is out of bounds", () => {
            const unitA = vector({ x: 3 });
            expect(() => scaleVector(unitA, 2)).toThrow();

            const unitB = vector({ x: 2 });
            expect(() => scaleVector(unitB, -3)).toThrow();
        });

        it("should handle explicitly undefined and 0 exponents", () => {
            const unit = vector({ x: 2, y: undefined, z: 0 });
            expect(scaleVector(unit, 2)).toEqual({ x: 4 });
        });
    });

    describe("roots", () => {
        it("should square root the unit", () => {
            const unit = vector({ x: 4, y: -2 });
            expect(inverseScaleVector(unit, 2)).toEqual({ x: 2, y: -1 });
        });

        it("should cube root the unit", () => {
            const unit = vector({ x: 3, y: -3 });
            expect(inverseScaleVector(unit, 3)).toEqual({ x: 1, y: -1 });
        });

        it("should throw an error when an exponent can't be divided", () => {
            const unit = vector({ x: 4, y: -3 });
            expect(() => inverseScaleVector(unit, 2)).toThrow();
            expect(() => inverseScaleVector(unit, 3)).toThrow();
        });

        it("should handle explicitly undefined and 0 exponents", () => {
            const unit = vector({ x: 2, y: undefined, z: 0 });
            expect(inverseScaleVector(unit, 2)).toEqual({ x: 1 });
        });
    });
});
