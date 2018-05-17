import { Unit, DimensionVector } from "../units";
import { MultiplyUnits, DivideUnits, ExponentiateUnit, NthRootUnit } from "../units/types";
import { Exponent } from "../exponents";

export class Measure<Vector extends DimensionVector> {
    constructor(public readonly value: number, public readonly unit: Unit<Vector>) {}

    public static of<V extends DimensionVector>(value: number, unit: Unit<V>) {
        return new Measure(value, unit);
    }

    // Arithmetic

    public plus(other: Measure<Vector>): Measure<Vector> {
        return Measure.of(this.value + other.value, this.unit);
    }

    public minus(other: Measure<Vector>): Measure<Vector> {
        return Measure.of(this.value - other.value, this.unit);
    }

    public negate(): Measure<Vector> {
        return Measure.of(-this.value, this.unit);
    }

    public times<Other extends DimensionVector>(other: Measure<Other>): Measure<MultiplyUnits<Vector, Other>> {
        return Measure.of(this.value * other.value, this.unit.times(other.unit));
    }

    public over<Other extends DimensionVector>(other: Measure<Other>): Measure<DivideUnits<Vector, Other>> {
        return Measure.of(this.value / other.value, this.unit.over(other.unit));
    }

    public toThe<Power extends Exponent>(power: Power): Measure<ExponentiateUnit<Vector, Power>> {
        return Measure.of(Math.pow(this.value, power), this.unit.toThe(power));
    }

    public sqrt(): Measure<NthRootUnit<Vector, 2>> {
        return Measure.of(Math.sqrt(this.value), this.unit.sqrt());
    }

    public cbrt(): Measure<NthRootUnit<Vector, 3>> {
        return Measure.of(Math.cbrt(this.value), this.unit.cbrt());
    }

    // Comparisons

    public compareTo(other: Measure<Vector>): number {
        return this.value - other.value;
    }

    public isLessThan(other: Measure<Vector>): boolean {
        return this.compareTo(other) < 0;
    }

    public isLessThanOrEqualTo(other: Measure<Vector>): boolean {
        return this.compareTo(other) <= 0;
    }

    public isEqualTo(other: Measure<Vector>): boolean {
        return this.compareTo(other) === 0;
    }

    public isNotEqualTo(other: Measure<Vector>): boolean {
        return this.compareTo(other) !== 0;
    }

    public isGreaterThanOrEqualTo(other: Measure<Vector>): boolean {
        return this.compareTo(other) >= 0;
    }

    public isGreaterThan(other: Measure<Vector>): boolean {
        return this.compareTo(other) > 0;
    }
}
