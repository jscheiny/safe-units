import { ArithmeticError, Exponent, MaxExponent, MinExponent } from "../exponents/common";
import { Dimension } from "./common";
import { DivideUnits, ExponentiateUnit, MultiplyUnits } from "./types";

export type CompleteDimensionVector = { [Dim in Dimension]: Exponent };

export type DimensionVector = Partial<CompleteDimensionVector>;

export function basisVector<Dim extends Dimension>(dim: Dim): { [D in Dim]: 1 } {
    return { [dim]: 1 } as any;
}

export function addVectors<Left extends DimensionVector, Right extends DimensionVector>(
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

export function subtractVectors<Left extends DimensionVector, Right extends DimensionVector>(
    left: Left,
    right: Right,
): DivideUnits<Left, Right> {
    return addVectors(left, scaleVector(right, -1));
}

export function scaleVector<Vector extends DimensionVector, Power extends Exponent>(
    vector: Vector,
    power: Power,
): ExponentiateUnit<Vector, Power> {
    const result: any = {};
    for (const dimension in vector) {
        const exp = (vector[dimension as Dimension] || 0) * power;
        checkExponent(exp);
        if (exp) {
            result[dimension] = exp;
        }
    }
    return result;
}

export function inverseScaleVector<Vector extends DimensionVector, Root extends Exponent>(vector: Vector, root: Root) {
    const result: any = {};
    for (const dimension in vector) {
        const exp = (vector[dimension as Dimension] || 0) / root;
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
