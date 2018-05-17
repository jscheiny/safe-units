import { ArithmeticError, Exponent, MaxExponent, MinExponent } from "../exponents/common";
import { DivideUnits, ExponentiateUnit, MultiplyUnits, NthRootUnit } from "./types";

export type DimensionVector<Basis extends string> = { [Dim in Basis]?: Exponent };

export function basisVector<Basis extends string, Dim extends Basis>(dim: Dim): { [D in Dim]: 1 } {
    return { [dim]: 1 } as any;
}

export function addVectors<
    Basis extends string,
    Left extends DimensionVector<Basis>,
    Right extends DimensionVector<Basis>
>(left: Left, right: Right): MultiplyUnits<Basis, Left, Right> {
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

export function subtractVectors<
    Basis extends string,
    Left extends DimensionVector<Basis>,
    Right extends DimensionVector<Basis>
>(left: Left, right: Right): DivideUnits<Basis, Left, Right> {
    return addVectors(left, scaleVector(right, -1));
}

export function scaleVector<Basis extends string, Vector extends DimensionVector<Basis>, Power extends Exponent>(
    vector: Vector,
    power: Power,
): ExponentiateUnit<Basis, Vector, Power> {
    const result: any = {};
    for (const dimension in vector) {
        const exp = (vector[dimension as Basis] || 0) * power;
        checkExponent(exp);
        if (exp) {
            result[dimension] = exp;
        }
    }
    return result;
}

export function inverseScaleVector<Basis extends string, Vector extends DimensionVector<Basis>, Root extends Exponent>(
    vector: Vector,
    root: Root,
): NthRootUnit<Basis, Vector, Root> {
    const result: any = {};
    for (const dimension in vector) {
        const exp = (vector[dimension as Basis] || 0) / root;
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
