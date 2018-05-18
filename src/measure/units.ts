import { ArithmeticError, Exponent, MaxExponent, MinExponent } from "../exponents/common";
import { DivideUnits, ExponentiateUnit, MultiplyUnits, NthRootUnit } from "./types";

export type DimensionVector = Partial<{ [dimension: string]: Exponent }>;

export function dimension<Dimension extends string>(dim: Dimension): { [D in Dimension]: 1 } {
    // TODO Remove cast to any somehow
    return { [dim]: 1 } as any;
}

export function multiplyUnits<Left extends DimensionVector, Right extends DimensionVector>(
    left: Left,
    right: Right,
): MultiplyUnits<Left, Right> {
    const result: any = {};
    for (const dimension in left) {
        result[dimension] = left[dimension] || 0;
    }
    for (const dimension in right) {
        if (dimension in result) {
            const exp = (result[dimension] += right[dimension] || 0);
            checkExponent(exp);
        } else {
            result[dimension] = right[dimension] || 0;
        }
    }
    for (const dimension in result) {
        if (result[dimension] === 0) {
            delete result[dimension];
        }
    }
    return result;
}

export function divideUnits<Left extends DimensionVector, Right extends DimensionVector>(
    left: Left,
    right: Right,
): DivideUnits<Left, Right> {
    // TODO Remove cast to any somehow
    return multiplyUnits(left, exponentiateUnit(right, -1)) as any;
}

export function exponentiateUnit<Vector extends DimensionVector, Power extends Exponent>(
    vector: Vector,
    power: Power,
): ExponentiateUnit<Vector, Power> {
    const result: any = {};
    for (const dimension in vector) {
        // TODO Remove cast to exponent somehow
        const originalExp = (vector[dimension] as Exponent) || 0;
        const exp = originalExp * power;
        checkExponent(exp);
        if (exp) {
            result[dimension] = exp;
        }
    }
    return result;
}

export function nthRootUnit<Vector extends DimensionVector, Root extends Exponent>(
    vector: Vector,
    root: Root,
): NthRootUnit<Vector, Root> {
    const result: any = {};
    for (const dimension in vector) {
        // TODO Remove cast to exponent somehow
        const originalExp = (vector[dimension] as Exponent) || 0;
        const exp = originalExp / root;
        checkExponent(exp);
        if (exp) {
            result[dimension] = exp;
        }
    }
    return result;
}

function checkExponent(exp: number): void {
    if (exp < MinExponent || exp > MaxExponent || Math.floor(exp) !== exp) {
        throw new Error(ArithmeticError);
    }
}
