import { MinimalDimensionVector, Dimension } from "./common";
import { MultiplyUnits, ExponentiateUnit, DivideUnits } from "./typeArithmetic";
import { Exponent, MinExponent, MaxExponent, ArithmeticError } from "../exponents/common";

export function base<Dim extends Dimension>(dim: Dim): { [D in Dim]: 1 } {
    return { [dim]: 1 } as any;
}

export function multiply<Left extends MinimalDimensionVector, Right extends MinimalDimensionVector>(
    left: Left,
    right: Right,
): MultiplyUnits<Left, Right> {
    const result: any = {};
    for (const dimension in left) {
        result[dimension] = left[dimension];
    }
    for (const dimension in right) {
        if (dimension in result) {
            const exp = (result[dimension] += right[dimension]);
            checkExponent(exp);
        } else {
            result[dimension] = right[dimension];
        }
    }
    for (const dimension in result) {
        if (result[dimension] === 0) {
            delete result[dimension];
        }
    }
    return result;
}

export function divide<Left extends MinimalDimensionVector, Right extends MinimalDimensionVector>(
    left: Left,
    right: Right,
): DivideUnits<Left, Right> {
    return multiply(left, exponentiate(right, -1));
}

export function exponentiate<Unit extends MinimalDimensionVector, Power extends Exponent>(
    unit: Unit,
    power: Power,
): ExponentiateUnit<Unit, Power> {
    const result: any = {};
    for (const dimension in unit) {
        const exp = unit[dimension as Dimension] || 0;
        checkExponent(exp);
        if (exp) {
            result[dimension] = exp * power;
        }
    }
    return result;
}

function checkExponent(exp: number) {
    if (exp < MinExponent || exp > MaxExponent) {
        throw new Error(ArithmeticError);
    }
}

export function square<Unit extends MinimalDimensionVector>(unit: Unit): ExponentiateUnit<Unit, 2> {
    return exponentiate(unit, 2);
}

export function cubic<Unit extends MinimalDimensionVector>(unit: Unit): ExponentiateUnit<Unit, 3> {
    return exponentiate(unit, 3);
}
