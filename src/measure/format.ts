import { Unit } from "./units";

// TODO Remove cache and do this statelessly
const DimensionSymbolCache: { [dimension: string]: string } = {};

export function setDimensionSymbol(dimension: string, symbol: string) {
    if (dimension in DimensionSymbolCache) {
        throw new Error(`UniTS: Dimension "${dimension}" has already been declared.`);
    }
    DimensionSymbolCache[dimension] = symbol;
}

export function formatUnit(unit: Unit): string {
    if (isScalarUnit(unit)) {
        return "scalar";
    }

    const parts: string[] = [];
    for (const dimension in unit) {
        const exponent = unit[dimension];
        if (exponent === 0 || exponent === undefined) {
            continue;
        }
        parts.push(formatDimension(dimension, exponent));
    }

    return parts.join(" * ");
}

function formatDimension(dimension: string, exponent: number) {
    const dimensionStr = dimension in DimensionSymbolCache ? DimensionSymbolCache[dimension] : dimension;
    const exponentStr = exponent !== 1 ? `^${exponent}` : "";
    return `${dimensionStr}${exponentStr}`;
}

function isScalarUnit(unit: Unit): boolean {
    for (const dimension in unit) {
        if (unit.hasOwnProperty(dimension) && unit[dimension] !== 0 && unit[dimension] !== undefined) {
            return false;
        }
    }
    return true;
}
