import { UnitSystem } from "./unitSystem";
import { Unit } from "./unitTypeArithmetic";

type SymbolAndExponent = [symbol: string, exponent: number];

export function defaultFormatUnit<Basis>(unit: Unit<Basis>, unitSystem: UnitSystem<Basis>): string {
    const positive: SymbolAndExponent[] = [];
    const negative: SymbolAndExponent[] = [];
    unitSystem.getDimensions().forEach(dimension => {
        const exponent = unit[dimension];
        if (exponent < 0) {
            negative.push([unitSystem.getSymbol(dimension), unit[dimension]]);
        } else if (exponent > 0) {
            positive.push([unitSystem.getSymbol(dimension), unit[dimension]]);
        }
    });

    if (positive.length === 0 && negative.length === 0) {
        return "";
    }

    positive.sort(orderDimensions);
    negative.sort(orderDimensions);

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

function orderDimensions([leftSymbol]: SymbolAndExponent, [rightSymbol]: SymbolAndExponent): number {
    return leftSymbol < rightSymbol ? -1 : 1;
}

function formatDimensions(dimensions: SymbolAndExponent[]): string {
    return dimensions
        .map(([symbol, exponent]) => {
            const exponentStr = exponent !== 1 ? `^${exponent}` : "";
            return `${symbol}${exponentStr}`;
        })
        .join(" * ");
}

function negateDimension([symbol, exponent]: SymbolAndExponent): SymbolAndExponent {
    return [symbol, -exponent];
}

function maybeParenthesize(text: string, parenthesize: boolean): string {
    return parenthesize ? `(${text})` : text;
}
