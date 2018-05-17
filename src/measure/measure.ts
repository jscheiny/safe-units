import { Exponent } from "../exponents";
import { DimensionVector, Unit } from "../units";
import { DivideUnits, ExponentiateUnit, MultiplyUnits, NthRootUnit } from "../units/types";

export class Measure<Basis extends string, Vector extends DimensionVector<Basis>> {
    constructor(public readonly value: number, public readonly unit: Unit<Basis, Vector>) {}

    public static scalar<Basis extends string>(value: number) {
        return Measure.of(value, Unit.scalar<Basis>());
    }

    public static of<Basis extends string, V extends DimensionVector<Basis>>(
        value: number,
        quantity: Unit<Basis, V> | Measure<Basis, V>,
    ): Measure<Basis, V> {
        if (quantity instanceof Measure) {
            return new Measure(value * quantity.value, quantity.unit);
        } else {
            return new Measure(value, quantity);
        }
    }

    // Arithmetic

    public plus(other: Measure<Basis, Vector>): Measure<Basis, Vector> {
        return Measure.of(this.value + other.value, this.unit);
    }

    public minus(other: Measure<Basis, Vector>): Measure<Basis, Vector> {
        return Measure.of(this.value - other.value, this.unit);
    }

    public negate(): Measure<Basis, Vector> {
        return Measure.of(-this.value, this.unit);
    }

    public times<Other extends DimensionVector<Basis>>(
        other: Measure<Basis, Other>,
    ): Measure<Basis, MultiplyUnits<Basis, Vector, Other>> {
        return Measure.of(this.value * other.value, this.unit.times(other.unit));
    }

    public over<Other extends DimensionVector<Basis>>(
        other: Measure<Basis, Other>,
    ): Measure<Basis, DivideUnits<Basis, Vector, Other>> {
        return Measure.of(this.value / other.value, this.unit.over(other.unit));
    }

    public toThe<Power extends Exponent>(power: Power): Measure<Basis, ExponentiateUnit<Basis, Vector, Power>> {
        return Measure.of(Math.pow(this.value, power), this.unit.toThe(power));
    }

    public sqrt(): Measure<Basis, NthRootUnit<Basis, Vector, 2>> {
        return Measure.of(Math.sqrt(this.value), this.unit.sqrt());
    }

    public cbrt(): Measure<Basis, NthRootUnit<Basis, Vector, 3>> {
        return Measure.of(Math.cbrt(this.value), this.unit.cbrt());
    }

    // Comparisons

    public compareTo(other: Measure<Basis, Vector>): number {
        return this.value - other.value;
    }

    public isLessThan(other: Measure<Basis, Vector>): boolean {
        return this.compareTo(other) < 0;
    }

    public isLessThanOrEqualTo(other: Measure<Basis, Vector>): boolean {
        return this.compareTo(other) <= 0;
    }

    public isEqualTo(other: Measure<Basis, Vector>): boolean {
        return this.compareTo(other) === 0;
    }

    public isNotEqualTo(other: Measure<Basis, Vector>): boolean {
        return this.compareTo(other) !== 0;
    }

    public isGreaterThanOrEqualTo(other: Measure<Basis, Vector>): boolean {
        return this.compareTo(other) >= 0;
    }

    public isGreaterThan(other: Measure<Basis, Vector>): boolean {
        return this.compareTo(other) > 0;
    }
}
