import { getExponentValue, negateExponent } from "../exponent/exponentValueArithmetic";
import { SymbolAndExponent, UnitWithSymbols } from "./unitTypeArithmetic";

export function defaultFormatUnit(unit: UnitWithSymbols): string {
    const dimensions = Object.keys(unit)
        .map(dimension => unit[dimension])
        .filter(isDimensionPresent)
        .sort(orderDimensions);

    if (dimensions.length === 0) {
        return "";
    }

    const positive = dimensions.filter(([_, dim]) => getExponentValue(dim) > 0);
    const negative = dimensions.filter(([_, dim]) => getExponentValue(dim) < 0);

    if (positive.length === 0) {
        return formatDimensions(negative);
    }

    const numerator = formatDimensions(positive);
    if (negative.length === 0) {
        return numerator;
    }

    const denominator = formatDimensions(negative.map(negateDimension));
    return `${numerator} / ${maybeParenthesize(denominator, negative.length !== 1)}`;
}

function isDimensionPresent(dimension: SymbolAndExponent | undefined): dimension is SymbolAndExponent {
    return dimension !== undefined && dimension[1] !== "0";
}

function orderDimensions([leftSymbol]: SymbolAndExponent, [rightSymbol]: SymbolAndExponent): number {
    return leftSymbol < rightSymbol ? -1 : 1;
}

function formatDimensions(dimensions: SymbolAndExponent[]): string {
    return dimensions
        .map(([symbol, exponent]) => {
            const exponentStr = exponent !== "1" ? `^${exponent}` : "";
            return `${symbol}${exponentStr}`;
        })
        .join(" * ");
}

function negateDimension([symbol, exponent]: SymbolAndExponent): SymbolAndExponent {
    return [symbol, negateExponent(exponent)];
}

function maybeParenthesize(text: string, parenthesize: boolean): string {
    return parenthesize ? `(${text})` : text;
}
