import {
    DivideUnits,
    MultiplyUnits,
    ReciprocalUnit,
    SymbolAndExponent,
    Unit,
    UnitWithSymbols,
} from "./unitTypeArithmetic";

export function dimension<Dim extends string>(dim: Dim, symbol?: string): UnitWithSymbols<{ [D in Dim]: 1 }> {
    return { [dim]: [symbol ?? dim, 1] } as any;
}

export function multiplyUnits<Left extends Unit, Right extends Unit>(
    left: UnitWithSymbols<Left>,
    right: UnitWithSymbols<Right>,
): UnitWithSymbols<MultiplyUnits<Left, Right>> {
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
            const newExponent = resultValue[1] + exponent;
            if (newExponent === 0) {
                delete result[dimension];
            } else {
                resultValue[1] = newExponent;
            }
        } else if (exponent !== 0) {
            result[dimension] = symbolAndExponent;
        }
    }
    return result as UnitWithSymbols<MultiplyUnits<Left, Right>>;
}

export function divideUnits<Left extends Unit, Right extends Unit>(
    left: UnitWithSymbols<Left>,
    right: UnitWithSymbols<Right>,
): UnitWithSymbols<DivideUnits<Left, Right>> {
    return multiplyUnits(left, reciprocalUnit(right)) as unknown as UnitWithSymbols<DivideUnits<Left, Right>>;
}

function copySymbolAndExponent(unit: UnitWithSymbols, dimension: string): SymbolAndExponent | undefined {
    const result = unit[dimension];
    if (result === undefined) {
        return undefined;
    }
    const [symbol, exponent] = result;
    return [symbol, exponent];
}

export function reciprocalUnit<U extends Unit>(unit: UnitWithSymbols<U>): UnitWithSymbols<ReciprocalUnit<U>> {
    const result: UnitWithSymbols = {};
    for (const dimension in unit) {
        const symbolAndExponent = unit[dimension];
        if (symbolAndExponent === undefined) {
            continue;
        }
        const [symbol, exponent] = symbolAndExponent;
        if (exponent !== 0) {
            result[dimension] = [symbol, -exponent];
        }
    }
    return result as UnitWithSymbols<ReciprocalUnit<U>>;
}
