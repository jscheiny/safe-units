import { SymbolAndExponent, UnitWithSymbols } from "./unitTypeArithmetic";

export function formatUnit(unit: UnitWithSymbols): string {
    const formatted = Object.keys(unit)
        .map(dimension => unit[dimension])
        .filter(isDimensionPresent)
        .sort(orderDimensions)
        .map(formatDimension);
    return formatted.length === 0 ? "" : " " + formatted.join(" * ");
}

function isDimensionPresent(dimension: SymbolAndExponent | undefined): dimension is SymbolAndExponent {
    return dimension !== undefined && dimension[1] !== 0;
}

function orderDimensions([leftSymbol]: SymbolAndExponent, [rightSymbol]: SymbolAndExponent): number {
    if (leftSymbol < rightSymbol) {
        return -1;
    }
    return 1;
}

function formatDimension([symbol, exponent]: SymbolAndExponent): string {
    const exponentStr = exponent !== 1 ? `^${exponent}` : "";
    return `${symbol}${exponentStr}`;
}
