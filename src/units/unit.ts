import { Exponent } from "../exponents";
import { DivideUnits, ExponentiateUnit, MultiplyUnits, NthRootUnit } from "./types";
import { addVectors, basisVector, DimensionVector, inverseScaleVector, scaleVector, subtractVectors } from "./vector";

export class Unit<Basis extends string, Vector extends DimensionVector<Basis>> {
    constructor(public readonly vector: Vector) {}

    public static scalar<Basis extends string>() {
        return new Unit<Basis, {}>({});
    }

    public static basis<Basis extends string, Dim extends Basis>(dimension: Dim) {
        return new Unit(basisVector(dimension));
    }

    public times<Other extends DimensionVector<Basis>>(
        other: Unit<Basis, Other>,
    ): Unit<Basis, MultiplyUnits<Basis, Vector, Other>> {
        return new Unit(addVectors(this.vector, other.vector));
    }

    public per<Other extends DimensionVector<Basis>>(
        other: Unit<Basis, Other>,
    ): Unit<Basis, DivideUnits<Basis, Vector, Other>> {
        return new Unit(subtractVectors(this.vector, other.vector));
    }

    public over<Other extends DimensionVector<Basis>>(
        other: Unit<Basis, Other>,
    ): Unit<Basis, DivideUnits<Basis, Vector, Other>> {
        return this.per(other);
    }

    public toThe<Power extends Exponent>(power: Power): Unit<Basis, ExponentiateUnit<Basis, Vector, Power>> {
        return new Unit(scaleVector(this.vector, power));
    }

    public root<Root extends Exponent>(root: Root): Unit<Basis, NthRootUnit<Basis, Vector, Root>> {
        return new Unit(inverseScaleVector(this.vector, root));
    }

    public inverse() {
        return this.toThe(-1);
    }

    public squared() {
        return this.toThe(2);
    }

    public cubed() {
        return this.toThe(3);
    }

    public sqrt() {
        return this.root(2);
    }

    public cbrt() {
        return this.root(3);
    }
}
