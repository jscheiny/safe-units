import { Measure } from "../../measure/measure";
import * as Units from "../../unit";
import { meters } from "../base";
import { kilo, micro } from "../metric";

describe("Predefined Units", () => {
    const UnitNames = Object.keys(Units);

    function forEachUnit(fn: (unit: Measure<any>, name: string) => void): void {
        UnitNames.forEach(name => {
            const value = (Units as any)[name];
            if (value instanceof Measure) {
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
                expect(unit.getSymbol()).not.toBeUndefined();
            } catch (e) {
                console.log(`Unit ${name} has no symbol defined.`);
                throw e;
            }
        });
    });

    describe("prefixes", () => {
        it("should scale the base unit", () => {
            const km = kilo(meters);
            expect(km.getUnit()).toEqual(meters.getUnit());
            expect(km.value).toBe(1000);
        });

        it("should apply a prefix when a symbol is present on the base unit", () => {
            expect(kilo(meters).getSymbol()).toBe("km");
        });

        it("should not apply a prefix when a symbo is not present on the base unit", () => {
            const blargs = Measure.of(1_000_000, meters);
            const microblargs = micro(blargs);
            expect(microblargs.getSymbol()).toBeUndefined();
            expect(microblargs.value).toBe(1);
        });
    });
});
