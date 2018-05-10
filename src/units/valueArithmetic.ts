import { MinimalUnit, Dimensions, Dimension } from "./common";
import { MultiplyUnits, ExponentiateUnit, DivideUnits } from "./typeArithmetic";
import { Exponent } from "../exponents/common";

export function multiply<Left extends MinimalUnit, Right extends MinimalUnit>(
    left: Left,
    right: Right,
): MultiplyUnits<Left, Right> {
    const result: any = {};
    for (const dimension of Dimensions) {
        const leftExp = left[dimension] || 0;
        const rightExp = right[dimension] || 0;
        const resultExp = leftExp + rightExp;
        if (resultExp !== 0) {
            result[dimension] = resultExp;
        }
    }
    return result;
}

export function divide<Left extends MinimalUnit, Right extends MinimalUnit>(
    left: Left,
    right: Right,
): DivideUnits<Left, Right> {
    return multiply(left, exponentiate(right, -1));
}

export function exponentiate<Unit extends MinimalUnit, Power extends Exponent>(
    unit: Unit,
    power: Power,
): ExponentiateUnit<Unit, Power> {
    const result: any = {};
    for (const dimension in unit) {
        const exp = unit[dimension as Dimension];
        if (exp) {
            result[dimension] = exp * power;
        }
    }
    return result;
}