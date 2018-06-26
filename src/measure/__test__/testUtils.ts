import { Exponent } from "../../exponent";
import { Unit } from "../types";

type UnitWithoutSymbols = { [dimension: string]: Exponent | undefined };
export type AddSymbols<U extends UnitWithoutSymbols> = {
    [D in keyof U]: undefined extends U[D] ? undefined : [string, U[D]]
};

export function addSymbols<U extends UnitWithoutSymbols>(unit: U): AddSymbols<U> {
    const result: Unit = {};
    for (const dimension in unit) {
        const exponent: Exponent | undefined = unit[dimension];
        if (exponent === undefined) {
            result[dimension] = undefined;
        } else {
            result[dimension] = [dimension, exponent];
        }
    }
    return result as any;
}
