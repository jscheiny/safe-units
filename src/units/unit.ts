import { MinimalDimensionVector, Dimension } from "./common";
import { MultiplyUnits, DivideUnits, ExponentiateUnit } from "./typeArithmetic";
import { multiply, divide, exponentiate, base } from "./vectorArithmetic";
import { Exponent } from "../exponents/common";

export class Unit<Vector extends MinimalDimensionVector> {
    constructor(public readonly vector: Vector) {}

    public static scalar() {
        return new Unit({});
    }

    public static basis<Dim extends Dimension>(dimension: Dim) {
        return new Unit(base(dimension));
    }

    public times<Other extends MinimalDimensionVector>(other: Unit<Other>): Unit<MultiplyUnits<Vector, Other>> {
        return new Unit(multiply(this.vector, other.vector));
    }

    public per<Other extends MinimalDimensionVector>(other: Unit<Other>): Unit<DivideUnits<Vector, Other>> {
        return new Unit(divide(this.vector, other.vector));
    }

    public toThe<Power extends Exponent>(power: Power): Unit<ExponentiateUnit<Vector, Power>> {
        return new Unit(exponentiate(this.vector, power));
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
}
