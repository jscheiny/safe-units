import { Exponent } from "../exponents";
import { formatUnit, setDimensionSymbol } from "./format";
import { DivideUnits, ExponentiateUnit, MultiplyUnits, NthRootUnit } from "./types";
import { dimension, divideUnits, exponentiateUnit, multiplyUnits, nthRootUnit, Unit } from "./units";

export class Measure<U extends Unit> {
    protected constructor(
        public readonly value: number,
        private readonly unit: U,
        private readonly symbol?: string | undefined,
    ) {}

    public static dimension<Dimension extends string>(dim: Dimension, symbol?: string) {
        if (symbol) {
            setDimensionSymbol(dim, symbol);
        }
        return new Measure(1, dimension(dim));
    }

    public static scalar(value: number): Measure<{}> {
        return new Measure(value, {});
    }

    public static of<U extends Unit>(value: number, quantity: Measure<U>, symbol?: string): Measure<U> {
        return new Measure(value * quantity.value, quantity.unit, symbol);
    }

    public withSymbol(symbol: string): Measure<U> {
        return new Measure(this.value, this.unit, symbol);
    }

    public getSymbol(): string | undefined {
        return this.symbol;
    }

    public getUnit(): U {
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

    public times<V extends Unit>(other: Measure<V>): Measure<MultiplyUnits<U, V>> {
        return new Measure(this.value * other.value, multiplyUnits(this.unit, other.unit));
    }

    public over<V extends Unit>(other: Measure<V>): Measure<DivideUnits<U, V>> {
        return new Measure(this.value / other.value, divideUnits(this.unit, other.unit));
    }

    public per<V extends Unit>(other: Measure<V>): Measure<DivideUnits<U, V>> {
        return this.over(other);
    }

    public toThe<N extends Exponent>(power: N): Measure<ExponentiateUnit<U, N>> {
        return new Measure(Math.pow(this.value, power), exponentiateUnit(this.unit, power));
    }

    public squared(): Measure<ExponentiateUnit<U, 2>> {
        return this.toThe(2);
    }

    public cubed(): Measure<ExponentiateUnit<U, 3>> {
        return this.toThe(3);
    }

    public inverse(): Measure<ExponentiateUnit<U, -1>> {
        return new Measure(1 / this.value, exponentiateUnit(this.unit, -1));
    }

    public reciprocal(): Measure<ExponentiateUnit<U, -1>> {
        return this.inverse();
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

    // Formatting

    public toString(): string {
        return `${this.value} ${formatUnit(this.unit)}`;
    }

    public in(unit: Measure<U>): string {
        if (unit.symbol === undefined) {
            return this.toString();
        }
        const value = this.value / unit.value;
        return `${value} ${unit.symbol}`;
    }
}

export function square<U extends Unit>(measure: Measure<U>): Measure<ExponentiateUnit<U, 2>> {
    return measure.squared();
}

export function cubic<U extends Unit>(measure: Measure<U>): Measure<ExponentiateUnit<U, 3>> {
    return measure.cubed();
}
