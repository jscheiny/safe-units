import { Exponent } from "../exponent/generated/common";
import { formatUnit } from "./format";
import {
    BaseUnit,
    DivideUnits,
    DivisorUnit,
    ExponentiateUnit,
    MultiplicandUnit,
    MultiplyUnits,
    Unit,
    UnitWithSymbols,
} from "./types";
import { dimension, divideUnits, exponentiateUnit, multiplyUnits } from "./units";

export class Measure<U extends Unit> {
    // Construction functions

    public static dimension<Dim extends string>(dim: Dim, symbol?: string): Measure<{ [D in Dim]: 1 }> {
        return new Measure(1, dimension(dim, symbol), symbol);
    }

    public static dimensionless(value: number): Measure<{}> {
        return new Measure(value, {});
    }

    public static of<U extends Unit>(value: number, quantity: Measure<U>, symbol?: string): Measure<U> {
        return new Measure(value * quantity.value, quantity.unit, symbol);
    }

    public static unsafeConstruct<U extends Unit>(
        value: number,
        unit: UnitWithSymbols<U>,
        symbol?: string,
    ): Measure<U> {
        return new Measure(value, unit, symbol);
    }

    // Instance methods

    private constructor(
        public readonly value: number,
        private readonly unit: UnitWithSymbols<U>,
        private readonly symbol?: string | undefined,
    ) {}

    public withSymbol(symbol: string): Measure<U> {
        return new Measure(this.value, this.unit, symbol);
    }

    public getSymbol(): string | undefined {
        return this.symbol;
    }

    public getUnit(): UnitWithSymbols<U> {
        return this.unit;
    }

    // Arithmetic

    public normalized(): Measure<U> {
        return new Measure(1, this.unit);
    }

    public plus(other: Measure<U>): Measure<U> {
        return new Measure(this.value + other.value, this.unit);
    }

    public minus(other: Measure<U>): Measure<U> {
        return new Measure(this.value - other.value, this.unit);
    }

    public negate(): Measure<U> {
        return new Measure(-this.value, this.unit);
    }

    public scale(value: number | Measure<{}>): Measure<U> {
        const numericValue = typeof value === "number" ? value : value.value;
        return new Measure(numericValue * this.value, this.unit);
    }

    public times<V extends MultiplicandUnit<U>>(other: Measure<V>): Measure<MultiplyUnits<U, V>> {
        return new Measure(this.value * other.value, multiplyUnits(this.unit, other.unit));
    }

    public over<V extends DivisorUnit<U>>(other: Measure<V>): Measure<DivideUnits<U, V>> {
        return new Measure(this.value / other.value, divideUnits(this.unit, other.unit));
    }

    public per<V extends DivisorUnit<U>>(other: Measure<V>): Measure<DivideUnits<U, V>> {
        return this.over(other);
    }

    public inverse(): Measure<ExponentiateUnit<U, -1>> {
        return new Measure(1 / this.value, exponentiateUnit(this.unit, -1));
    }

    public reciprocal(): Measure<ExponentiateUnit<U, -1>> {
        return this.inverse();
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

    // Formatting

    public toString(): string {
        return `${this.value}${formatUnit(this.unit)}`;
    }

    public in(unit: Measure<U>): string {
        if (unit.symbol === undefined) {
            return this.toString();
        }
        const value = this.value / unit.value;
        return `${value} ${unit.symbol}`;
    }
}

// Measure methods that may or may not be available based on the type parameter.
export interface Measure<U extends Unit> {
    squared: U extends BaseUnit<2> ? () => Measure<ExponentiateUnit<U, 2>> : never;
    cubed: U extends BaseUnit<3> ? () => Measure<ExponentiateUnit<U, 3>> : never;
}

Measure.prototype.squared = function(): any {
    return pow(this, 2);
};

Measure.prototype.cubed = function(): any {
    return pow(this, 3);
};

export function square<U extends BaseUnit<2>>(measure: Measure<U>): Measure<ExponentiateUnit<U, 2>> {
    return pow(measure, 2);
}

export function cubic<U extends BaseUnit<3>>(measure: Measure<U>): Measure<ExponentiateUnit<U, 3>> {
    return pow(measure, 3);
}

export function pow<U extends BaseUnit<N>, N extends Exponent>(
    measure: Measure<U>,
    power: N,
): Measure<ExponentiateUnit<U, N>> {
    return Measure.unsafeConstruct(Math.pow(measure.value, power), exponentiateUnit(measure.getUnit(), power));
}
