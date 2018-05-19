import { ArithmeticError, Exponent, MaxExponent, MinExponent } from "../exponents/common";
import { DivideUnits, ExponentiateUnit, MultiplyUnits, NthRootUnit } from "./types";

export type Unit = Partial<{ [dimension: string]: Exponent }>;

export function dimension<D extends string>(dim: D): { [K in D]: 1 } {
    // TODO Remove cast to any somehow
    return { [dim]: 1 } as any;
}

export function multiplyUnits<L extends Unit, R extends Unit>(left: L, right: R): MultiplyUnits<L, R> {
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

export function divideUnits<L extends Unit, R extends Unit>(left: L, right: R): DivideUnits<L, R> {
    // TODO Remove cast to any somehow
    return multiplyUnits(left, exponentiateUnit(right, -1)) as any;
}

export function exponentiateUnit<U extends Unit, N extends Exponent>(unit: U, power: N): ExponentiateUnit<U, N> {
    const result: any = {};
    for (const dimension in unit) {
        // TODO Remove cast to exponent somehow
        const originalExp = (unit[dimension] as Exponent) || 0;
        const exp = originalExp * power;
        checkExponent(exp);
        if (exp) {
            result[dimension] = exp;
        }
    }
    return result;
}

export function nthRootUnit<U extends Unit, N extends Exponent>(unit: U, root: N): NthRootUnit<U, N> {
    const result: any = {};
    for (const dimension in unit) {
        // TODO Remove cast to exponent somehow
        const originalExp = (unit[dimension] as Exponent) || 0;
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

export function unitToString(unit: Unit): string {
    if (isScalarUnit(unit)) {
        return "scalar";
    }
    let result = "";
    let first = true;
    for (const dimension in unit) {
        const exponent = unit[dimension];
        if (exponent === 0 || exponent == null) {
            continue;
        }
        if (!first) {
            result += " * ";
        }
        result += dimension;
        if (exponent !== 1) {
            result += `^${exponent}`;
        }
        first = false;
    }

    return result;
}

function isScalarUnit(unit: Unit): boolean {
    for (const dimension in unit) {
        if (unit.hasOwnProperty(dimension) && unit[dimension] !== 0 && unit[dimension] != null) {
            return false;
        }
    }
    return true;
}
