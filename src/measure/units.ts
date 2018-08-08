import { ArithmeticError, Exponent, MaxExponent, MinExponent } from "../exponent";
import {
    DivideUnits,
    ExponentiateUnit,
    MultiplyUnits,
    NthRootableUnit,
    NthRootUnit,
    SymbolAndExponent,
    Unit,
    UnitWithSymbols,
} from "./types";

export function dimension<D extends string>(dim: D, symbol?: string): UnitWithSymbols<{ [K in D]: 1 }> {
    // TODO Remove cast to any somehow
    return { [dim]: [symbol || dim, 1] } as any;
}

export function multiplyUnits<L extends Unit, R extends Unit>(
    left: UnitWithSymbols<L>,
    right: UnitWithSymbols<R>,
): UnitWithSymbols<MultiplyUnits<L, R>> {
    const result: UnitWithSymbols = {};
    for (const dimension in left) {
        const symbolAndExponent = copySymbolAndExponent(left, dimension);
        if (symbolAndExponent !== undefined) {
            result[dimension] = symbolAndExponent;
        }
    }
    for (const dimension in right) {
        const symbolAndExponent = copySymbolAndExponent(right, dimension);
        if (symbolAndExponent === undefined) {
            continue;
        }
        const [, exponent] = symbolAndExponent;
        const resultValue = result[dimension];
        if (resultValue !== undefined) {
            const newExponent = resultValue[1] + exponent;
            if (isExponent(newExponent)) {
                resultValue[1] = newExponent;
            } else {
                throw new Error(ArithmeticError);
            }
        } else {
            result[dimension] = symbolAndExponent;
        }
    }
    for (const dimension in result) {
        const value = result[dimension];
        if (value !== undefined && value[1] === 0) {
            delete result[dimension];
        }
    }
    return result as any;
}

function copySymbolAndExponent(unit: UnitWithSymbols, dimension: string): SymbolAndExponent | undefined {
    const result = unit[dimension];
    if (result === undefined) {
        return undefined;
    }
    const [symbol, exponent] = result;
    return [symbol, exponent];
}

export function divideUnits<L extends Unit, R extends Unit>(
    left: UnitWithSymbols<L>,
    right: UnitWithSymbols<R>,
): UnitWithSymbols<DivideUnits<L, R>> {
    // TODO Remove cast to any somehow
    return multiplyUnits(left, exponentiateUnit(right, -1)) as any;
}

export function exponentiateUnit<U extends Unit, N extends Exponent>(
    unit: UnitWithSymbols<U>,
    power: N,
): UnitWithSymbols<ExponentiateUnit<U, N>> {
    return expAndRootImpl(unit, exponent => exponent * power);
}

export function nthRootUnit<U extends NthRootableUnit<N>, N extends Exponent>(
    unit: UnitWithSymbols<U>,
    root: N,
): UnitWithSymbols<NthRootUnit<U, N>> {
    return expAndRootImpl(unit, exponent => exponent / root);
}

function expAndRootImpl(unit: UnitWithSymbols, updateExponent: (exp: Exponent) => number): any {
    const result: UnitWithSymbols = {};
    for (const dimension in unit) {
        const symbolAndExponent = unit[dimension];
        if (symbolAndExponent === undefined) {
            continue;
        }
        const [symbol, exponent] = symbolAndExponent;
        const newExponent = updateExponent(exponent);
        if (isExponent(newExponent)) {
            if (newExponent !== 0) {
                result[dimension] = [symbol, newExponent];
            }
        } else {
            throw new Error(ArithmeticError);
        }
    }
    return result;
}

function isExponent(exp: number): exp is Exponent {
    return exp >= MinExponent && exp <= MaxExponent && Math.floor(exp) === exp;
}
