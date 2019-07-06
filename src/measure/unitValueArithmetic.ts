import { Exponent, NonZeroExponent } from "../exponent";
import { addExponents, divideExponents, multiplyExponents } from "../exponent/exponentValueArithmetic";
import {
    AllowedExponents,
    DivideUnits,
    DivisorUnit,
    ExponentiateUnit,
    MultiplicandUnit,
    MultiplyUnits,
    NthRootUnit,
    RadicandUnit,
    SymbolAndExponent,
    Unit,
    UnitWithSymbols,
} from "./unitTypeArithmetic";

export function dimension<Dim extends string>(dim: Dim, symbol?: string): UnitWithSymbols<{ [D in Dim]: "1" }> {
    return { [dim]: [symbol || dim, "1"] } as any;
}

export function multiplyUnits<L extends Unit, R extends MultiplicandUnit<L>>(
    left: UnitWithSymbols<L>,
    right: UnitWithSymbols<R>,
): UnitWithSymbols<MultiplyUnits<L, R>> {
    const result: UnitWithSymbols = {};
    for (const dimension in left) {
        const symbolAndExponent = copySymbolAndExponent(left, dimension);
        if (symbolAndExponent !== undefined && symbolAndExponent[1] !== "0") {
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
            const newExponent = addExponents(resultValue[1], exponent);
            if (newExponent === "0") {
                delete result[dimension];
            } else {
                resultValue[1] = newExponent;
            }
        } else if (exponent !== "0") {
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

export function divideUnits<L extends Unit, R extends DivisorUnit<L>>(
    left: UnitWithSymbols<L>,
    right: UnitWithSymbols<R>,
): UnitWithSymbols<DivideUnits<L, R>> {
    const rightInverse = exponentiateUnit(right, "-1") as any;
    return multiplyUnits(left, rightInverse) as any;
}

export function exponentiateUnit<U extends Unit, N extends AllowedExponents<U>>(
    unit: UnitWithSymbols<U>,
    power: N,
): UnitWithSymbols<ExponentiateUnit<U, N>> {
    return expAndRootImpl(unit, exponent => multiplyExponents(exponent, power));
}

export function nthRootUnit<U extends RadicandUnit<N>, N extends NonZeroExponent>(
    unit: UnitWithSymbols<U>,
    root: N,
): UnitWithSymbols<NthRootUnit<U, N>> {
    return expAndRootImpl(unit, exponent => divideExponents(exponent, root));
}

function expAndRootImpl(unit: UnitWithSymbols, updateExponent: (exp: Exponent) => Exponent): any {
    const result: UnitWithSymbols = {};
    for (const dimension in unit) {
        const symbolAndExponent = unit[dimension];
        if (symbolAndExponent === undefined) {
            continue;
        }
        const [symbol, exponent] = symbolAndExponent;
        const newExponent = updateExponent(exponent);
        if (newExponent !== "0") {
            result[dimension] = [symbol, newExponent];
        }
    }
    return result;
}
