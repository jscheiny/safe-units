import { Measure } from "../../measure";
import * as Quantity from "../quantities";

describe("Quantity", () => {
    const QuantityNames = Object.keys(Quantity);

    function forEachQuantity(fn: (quantity: Measure<any>, name: string) => void) {
        QuantityNames.forEach(name => {
            fn((Quantity as any)[name], name);
        });
    }

    it("No two quantities should be the same", () => {
        forEachQuantity((a, aName) => {
            forEachQuantity((b, bName) => {
                if (aName === bName) {
                    return;
                }
                try {
                    expect(a.getUnit()).not.toEqual(b.getUnit());
                } catch (e) {
                    console.log(`Quantities '${aName}' and '${bName}' are the same.`);
                    throw e;
                }
            });
        });
    });

    it("All quantities should be normalized", () => {
        forEachQuantity(quantity => {
            expect(quantity.value).toBe(1);
        });
    });
});
