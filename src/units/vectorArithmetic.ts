import { MinimalDimensionVector, Dimension } from "./common";
import { MultiplyUnits, ExponentiateUnit, DivideUnits } from "./typeArithmetic";
import { Exponent, MinExponent, MaxExponent, ArithmeticError } from "../exponents/common";

export function basisVector<Dim extends Dimension>(dim: Dim): { [D in Dim]: 1 } {
    return { [dim]: 1 } as any;
}

export function addVectors<Left extends MinimalDimensionVector, Right extends MinimalDimensionVector>(
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

export function scaleVector<Unit extends MinimalDimensionVector, Power extends Exponent>(
    unit: Unit,
    power: Power,
): ExponentiateUnit<Unit, Power> {
    const result: any = {};
    for (const dimension in unit) {
        const exp = (unit[dimension as Dimension] || 0) * power;
        checkExponent(exp);
        if (exp) {
            result[dimension] = exp;
        }
    }
    return result;
}

export function subtractVectors<Left extends MinimalDimensionVector, Right extends MinimalDimensionVector>(
    left: Left,
    right: Right,
): DivideUnits<Left, Right> {
    return addVectors(left, scaleVector(right, -1));
}

function checkExponent(exp: number) {
    if (exp < MinExponent || exp > MaxExponent) {
        throw new Error(ArithmeticError);
    }
}
