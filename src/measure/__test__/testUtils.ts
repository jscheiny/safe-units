import { Exponent } from "../../exponent";
import { Unit, UnitWithSymbols } from "../types";

export type IsSame<A, B> = A extends B ? (B extends A ? true : never) : never;

export function addSymbols<U extends Unit>(unit: U): UnitWithSymbols<U> {
    const result: UnitWithSymbols = {};
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
