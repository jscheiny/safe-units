import { Exponent } from "../exponents";
import { Dimension } from "./common";
import { DivideUnits, ExponentiateUnit, MultiplyUnits, NthRootUnit } from "./types";
import { addVectors, basisVector, DimensionVector, inverseScaleVector, scaleVector, subtractVectors } from "./vector";

export class Unit<Vector extends DimensionVector> {
    constructor(public readonly vector: Vector) {}

    public static scalar() {
        return new Unit({});
    }

    public static basis<Dim extends Dimension>(dimension: Dim) {
        return new Unit(basisVector(dimension));
    }

    public times<Other extends DimensionVector>(other: Unit<Other>): Unit<MultiplyUnits<Vector, Other>> {
        return new Unit(addVectors(this.vector, other.vector));
    }

    public per<Other extends DimensionVector>(other: Unit<Other>): Unit<DivideUnits<Vector, Other>> {
        return new Unit(subtractVectors(this.vector, other.vector));
    }

    public over<Other extends DimensionVector>(other: Unit<Other>): Unit<DivideUnits<Vector, Other>> {
        return this.per(other);
    }

    public toThe<Power extends Exponent>(power: Power): Unit<ExponentiateUnit<Vector, Power>> {
        return new Unit(scaleVector(this.vector, power));
    }

    public root<Root extends Exponent>(root: Root): Unit<NthRootUnit<Vector, Root>> {
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
