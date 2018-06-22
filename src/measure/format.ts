import { SymbolAndExponent, Unit } from "./types";

export function formatUnit(unit: Unit): string {
    const sorted = sortDimensions(unit);
    if (sorted.length === 0) {
        return "";
    }

    return " " + sorted.map(formatDimension).join(" * ");
}

function sortDimensions(unit: Unit): SymbolAndExponent[] {
    const dimensions: SymbolAndExponent[] = [];
    for (const dimension in unit) {
        const symbolAndExponent = unit[dimension];
        if (symbolAndExponent === undefined) {
            continue;
        }
        const [, exponent] = symbolAndExponent;
        if (exponent === 0) {
            continue;
        }
        dimensions.push(symbolAndExponent);
    }

    dimensions.sort(([leftSymbol], [rightSymbol]) => {
        if (leftSymbol < rightSymbol) {
            return -1;
        }
        return 1;
    });

    return dimensions;
}

function formatDimension([symbol, exponent]: SymbolAndExponent): string {
    const exponentStr = exponent !== 1 ? `^${exponent}` : "";
    return `${symbol}${exponentStr}`;
}
