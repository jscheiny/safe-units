import { UnitSystem } from "../unitSystem";

describe("Unit system", () => {
    describe("Basic operations", () => {
        const unitSystem = UnitSystem.from({ length: "m", mass: "kg", time: "s" });
        it("it should return the dimensions of the basis", () => {
            expect(unitSystem.getDimensions()).toEqual(["length", "mass", "time"]);
        });

        it("it should return the symbol of a dimension", () => {
            expect(unitSystem.getSymbol("length")).toEqual("m");
        });

        it("it should create a dimensionless unit", () => {
            expect(unitSystem.createDimensionlessUnit()).toEqual({ length: 0, mass: 0, time: 0 });
        });

        it("it should throw an error when trying to get the symbol of a dimension that doesn't exist", () => {
            expect(() => unitSystem.getSymbol("memory" as any)).toThrow("No symbol found for dimension: memory");
        });

        it("it should create a dimension unit", () => {
            expect(unitSystem.createDimensionUnit("length")).toEqual({ length: 1, mass: 0, time: 0 });
        });
    });

    describe("arithmetic", () => {
        const unitSystem = UnitSystem.from({
            w: "w",
            x: "x",
            y: "y",
            z: "z",
        });

        const x = unitSystem.createDimensionUnit("x");
        const y = unitSystem.createDimensionUnit("y");
        const dimensionless = unitSystem.createDimensionlessUnit();

        describe("multiplication", () => {
            it("should multiply two different base units correctly", () => {
                expect(unitSystem.multiply(x, y)).toEqual({ ...dimensionless, x: 1, y: 1 });
            });

            it("should multiply two of the same base unit correctly", () => {
                expect(unitSystem.multiply(x, x)).toEqual({ ...dimensionless, x: 2 });
            });

            it("should multiply complex units correctly", () => {
                const left = { ...dimensionless, x: 1, y: -2 };
                const right = { ...dimensionless, y: 1, z: 2 };
                expect(unitSystem.multiply(left, right)).toEqual({ ...dimensionless, x: 1, y: -1, z: 2 });
            });

            it("should handle explicitly 0 exponents", () => {
                const left = { ...dimensionless, w: 0, x: 2 };
                const right = { ...dimensionless, y: 0 };
                expect(unitSystem.multiply(left, right)).toEqual({ ...dimensionless, x: 2 });
            });
        });

        describe("reciprocals", () => {
            it("should get the reciprocal of a unit", () => {
                const unit = { ...dimensionless, x: 1, y: -2, z: 3 };
                expect(unitSystem.reciprocal(unit)).toEqual({ ...dimensionless, x: -1, y: 2, z: -3 });
            });

            it("should handle explicitly 0 exponents", () => {
                const unit = { ...dimensionless, w: 0, x: 2 };
                expect(unitSystem.reciprocal(unit)).toEqual({ ...dimensionless, x: -2 });
            });
        });

        describe("division", () => {
            it("should correctly divide units", () => {
                const left = { ...dimensionless, x: 2, y: 2 };
                const right = { ...dimensionless, x: 2, y: -1, z: 2 };
                expect(unitSystem.divide(left, right)).toEqual({ ...dimensionless, y: 3, z: -2 });
            });
        });
    });
});
