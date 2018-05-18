import { Exponent } from "../exponents";
import { DivideUnits, ExponentiateUnit, MultiplyUnits, NthRootUnit } from "./types";
import { dimension, DimensionVector, divideUnits, exponentiateUnit, multiplyUnits, nthRootUnit } from "./units";

export class Measure<U extends DimensionVector> {
    constructor(public readonly value: number, private readonly unit: U) {}

    public static dimension<Dimension extends string>(dim: Dimension) {
        return new Measure(1, dimension(dim));
    }

    public static scalar(value: number): Measure<{}> {
        return new Measure(value, {});
    }

    public static of<V extends DimensionVector>(value: number, quantity: Measure<V>): Measure<V> {
        return new Measure(value * quantity.value, quantity.unit);
    }

    public normalized(): Measure<U> {
        return new Measure(1, this.unit);
    }

    public getUnit(): U {
        return this.unit;
    }

    // Arithmetic

    public plus(other: Measure<U>): Measure<U> {
        return new Measure(this.value + other.value, this.unit);
    }

    public minus(other: Measure<U>): Measure<U> {
        return new Measure(this.value - other.value, this.unit);
    }

    public negate(): Measure<U> {
        return new Measure(-this.value, this.unit);
    }

    public times<V extends DimensionVector>(other: Measure<V>): Measure<MultiplyUnits<U, V>> {
        return new Measure(this.value * other.value, multiplyUnits(this.unit, other.unit));
    }

    public over<V extends DimensionVector>(other: Measure<V>): Measure<DivideUnits<U, V>> {
        return new Measure(this.value / other.value, divideUnits(this.unit, other.unit));
    }

    public per<V extends DimensionVector>(other: Measure<V>): Measure<DivideUnits<U, V>> {
        return this.over(other);
    }

    public toThe<Power extends Exponent>(power: Power): Measure<ExponentiateUnit<U, Power>> {
        return new Measure(Math.pow(this.value, power), exponentiateUnit(this.unit, power));
    }

    public squared(): Measure<ExponentiateUnit<U, 2>> {
        return this.toThe(2);
    }

    public cubed(): Measure<ExponentiateUnit<U, 3>> {
        return this.toThe(3);
    }

    public sqrt(): Measure<NthRootUnit<U, 2>> {
        return new Measure(Math.sqrt(this.value), nthRootUnit(this.unit, 2));
    }

    public cbrt(): Measure<NthRootUnit<U, 3>> {
        return new Measure(Math.cbrt(this.value), nthRootUnit(this.unit, 3));
    }

    // Comparisons

    public compareTo(other: Measure<U>): number {
        return this.value - other.value;
    }

    public isLessThan(other: Measure<U>): boolean {
        return this.compareTo(other) < 0;
    }

    public isLessThanOrEqualTo(other: Measure<U>): boolean {
        return this.compareTo(other) <= 0;
    }

    public isEqualTo(other: Measure<U>): boolean {
        return this.compareTo(other) === 0;
    }

    public isNotEqualTo(other: Measure<U>): boolean {
        return this.compareTo(other) !== 0;
    }

    public isGreaterThanOrEqualTo(other: Measure<U>): boolean {
        return this.compareTo(other) >= 0;
    }

    public isGreaterThan(other: Measure<U>): boolean {
        return this.compareTo(other) > 0;
    }
}
