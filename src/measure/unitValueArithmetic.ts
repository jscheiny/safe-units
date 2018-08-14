import { Exponent } from "../exponent";
import {
    BaseUnit,
    DivideUnits,
    ExponentiateUnit,
    MultiplyUnits,
    NthRootUnit,
    RadicandUnit,
    SymbolAndExponent,
    Unit,
    UnitWithSymbols,
} from "./unitTypeArithmetic";

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
        if (symbolAndExponent !== undefined && symbolAndExponent[1] !== 0) {
            result[dimension] = symbolAndExponent;
        }
    }
    for (const dimension in right) {
        const symbolAndExponent = copySymbolAndExponent(right, dimension);
        if (symbolAndExponent === undefined) {
            continue;
        }
        const [, exponent] = symbolAndExponent;
        const resultValue: SymbolAndExponent | undefined = result[dimension];
        if (resultValue !== undefined) {
            const newExponent = (resultValue[1] + exponent) as Exponent;
            if (newExponent === 0) {
                delete result[dimension];
            } else {
                resultValue[1] = newExponent;
            }
        } else if (exponent !== 0) {
            result[dimension] = symbolAndExponent;
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
    return multiplyUnits(left, exponentiateUnit(right, -1)) as any;
}

export function exponentiateUnit<U extends BaseUnit<N>, N extends Exponent>(
    unit: UnitWithSymbols<U>,
    power: N,
): UnitWithSymbols<ExponentiateUnit<U, N>> {
    return expAndRootImpl(unit, exponent => exponent * power);
}

export function nthRootUnit<U extends RadicandUnit<N>, N extends Exponent>(
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
        const newExponent = updateExponent(exponent) as Exponent;
        if (newExponent !== 0) {
            result[dimension] = [symbol, newExponent];
        }
    }
    return result;
}
