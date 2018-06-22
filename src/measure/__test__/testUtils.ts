import { Exponent } from "../../exponent";
import { Unit } from "../types";

type UnitWithoutSymbols = Partial<{ [dimension: string]: Exponent }>;
export type AddSymbols<U extends UnitWithoutSymbols> = {
    [D in keyof U]: undefined extends U[D] ? undefined : [D, U[D]]
};

export function addSymbols<U extends UnitWithoutSymbols>(unit: U): AddSymbols<U> {
    const result: Unit = {};
    for (const dimension in unit) {
        if (unit[dimension] === undefined) {
            result[dimension] = undefined;
        } else {
            result[dimension] = [dimension, unit[dimension] as Exponent];
        }
    }
    return result as any;
}
