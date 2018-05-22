import { Exponent } from "../exponent";
import { Unit } from "./units";

// TODO Remove cache and do this statelessly
const DimensionSymbolCache: { [dimension: string]: string } = {};

export function setDimensionSymbol(dimension: string, symbol: string) {
    if (dimension in DimensionSymbolCache) {
        throw new Error(`UniTS: Dimension "${dimension}" has already been declared.`);
    }
    DimensionSymbolCache[dimension] = symbol;
}

type DimensionAndExponent = [string, Exponent];

export function formatUnit(unit: Unit): string {
    const sorted = sortDimensions(unit);
    if (sorted.length === 0) {
        return "scalar";
    }

    return sorted.map(formatDimension).join(" * ");
}

function sortDimensions(unit: Unit): DimensionAndExponent[] {
    const dimensions: DimensionAndExponent[] = [];
    for (const dimension in unit) {
        const exponent = unit[dimension];
        if (exponent === 0 || exponent === undefined) {
            continue;
        }
        dimensions.push([dimension, exponent]);
    }

    dimensions.sort(([leftDim], [rightDim]) => {
        if (leftDim < rightDim) {
            return -1;
        }
        return 1;
    });

    return dimensions;
}

function formatDimension([dimension, exponent]: DimensionAndExponent): string {
    const dimensionStr = dimension in DimensionSymbolCache ? DimensionSymbolCache[dimension] : dimension;
    const exponentStr = exponent !== 1 ? `^${exponent}` : "";
    return `${dimensionStr}${exponentStr}`;
}
