import { Unit } from "../unit";
import { DimensionVector } from "../vector";

describe("Units", () => {
    const length = Unit.basis("length");
    const time = Unit.basis("time");

    function expectVector(unit: Unit<any>, vector: DimensionVector) {
        expect(unit.vector).toEqual(vector);
    }

    it("should create scalar units", () => {
        expectVector(Unit.scalar(), {});
    });

    it("should create base units", () => {
        expectVector(length, { length: 1 });
        expectVector(time, { time: 1 });
    });

    describe("multiplication", () => {
        it("should multiply two different base units correctly", () => {
            expectVector(length.times(time), {
                length: 1,
                time: 1,
            });
        });

        it("should multiply two of the same base unit correctly", () => {
            expectVector(length.times(length), {
                length: 2,
            });
        });

        it("should multiply complex units correctly", () => {
            const left = new Unit({
                length: 1,
                time: -2,
            });
            const right = new Unit({
                time: 1,
                mass: 2,
            });
            expectVector(left.times(right), {
                length: 1,
                time: -1,
                mass: 2,
            });
        });

        it("should remove zero exponents from the result", () => {
            const left = new Unit({
                length: 1,
                time: 2,
                mass: 3,
            });
            const right = new Unit({
                length: -1,
                time: -2,
                mass: -3,
            });
            expectVector(left.times(right), {});
        });

        it("should throw an error when an exponent is out of bounds", () => {
            const positive = new Unit({ length: 3 });
            expect(() => positive.times(positive)).toThrow();

            const negative = positive.inverse();
            expect(() => negative.times(negative)).toThrow();
        });

        it("should handle explicitly undefined and 0 exponents", () => {
            const left = new Unit({
                length: 2,
                time: undefined,
            });
            const right = new Unit({
                length: undefined,
                mass: undefined,
                time: 0,
            });
            expectVector(left.times(right), {
                length: 2,
            });
        });
    });

    describe("exponentiation", () => {
        it("should square a simple unit", () => {
            expectVector(length.squared(), {
                length: 2,
            });
            expectVector(time.squared(), {
                time: 2,
            });
        });

        it("should cube a simple unit", () => {
            expectVector(length.cubed(), {
                length: 3,
            });
        });

        it("should square a complex unit", () => {
            const unit = new Unit({
                length: 1,
                time: -2,
            });
            expectVector(unit.squared(), {
                length: 2,
                time: -4,
            });
        });

        it("should invert a unit", () => {
            const unit = new Unit({
                length: -1,
                time: 2,
                mass: -3,
            });
            expectVector(unit.inverse(), {
                length: 1,
                time: -2,
                mass: 3,
            });
        });

        it("should return the same unit when raised to the one", () => {
            const unit = new Unit({
                length: -1,
                time: 2,
                mass: -3,
            });
            expectVector(unit.toThe(1), unit.vector);
        });

        it("should return a scalar unit when raised to the zero", () => {
            const unit = new Unit({
                length: -1,
                time: 2,
                mass: -3,
            });
            expectVector(unit.toThe(0), {});
        });

        it("should throw an error when an exponent is out of bounds", () => {
            const unitA = new Unit({ length: 3 });
            expect(() => unitA.squared()).toThrow();

            const unitB = new Unit({ length: 2 });
            expect(() => unitB.toThe(-3)).toThrow();
        });

        it("should handle explicitly undefined and 0 exponents", () => {
            const left = new Unit({
                length: 2,
                time: undefined,
                mass: 0,
            });
            expectVector(left.squared(), {
                length: 4,
            });
        });
    });

    describe("division", () => {
        it("should correctly divide units", () => {
            const left = new Unit({
                length: 2,
                mass: 2,
            });
            const right = new Unit({
                length: 2,
                mass: -1,
                time: 2,
            });
            const quotient: DimensionVector = {
                mass: 3,
                time: -2,
            };
            expectVector(left.per(right), quotient);
            expectVector(left.over(right), quotient);
        });
    });
});
