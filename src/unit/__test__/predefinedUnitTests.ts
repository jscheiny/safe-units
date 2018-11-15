import * as Units from "..";
import { Measure } from "../../measure/numberMeasure";
import { meters } from "../base";
import { kilo, micro } from "../metric";

describe("Predefined units", () => {
    const UnitNames = Object.keys(Units);

    function forEachUnit(fn: (unit: Measure<any>, name: string) => void): void {
        UnitNames.forEach(name => {
            const value = (Units as any)[name];
            if (Measure.isMeasure(value)) {
                fn(value, name);
            } else {
                for (const subName in value) {
                    if (value.hasOwnProperty(subName)) {
                        const unit = value[subName];
                        fn(unit, subName);
                    }
                }
            }
        });
    }

    it("all units should have a symbol", () => {
        forEachUnit((unit, name) => {
            try {
                expect(unit.symbol).not.toBeUndefined();
            } catch (e) {
                console.log(`Unit ${name} has no symbol defined.`);
                throw e;
            }
        });
    });

    describe("prefixes", () => {
        it("should scale the base unit", () => {
            const km = kilo(meters);
            expect(km.unit).toEqual(meters.unit);
            expect(km.value).toBe(1000);
        });

        it("should apply a prefix when a symbol is present on the base unit", () => {
            expect(kilo(meters).symbol).toBe("km");
        });

        it("should not apply a prefix when a symbo is not present on the base unit", () => {
            const blargs = Measure.of(1_000_000, meters);
            const microblargs = micro(blargs);
            expect(microblargs.symbol).toBeUndefined();
            expect(microblargs.value).toBe(1);
        });
    });
});
