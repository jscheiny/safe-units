import { Exponent } from "../exponent";
import { formatUnit } from "./format";
import { GenericMeasure, Numeric } from "./genericMeasure";
import {
    BaseUnit,
    DivideUnits,
    DivisorUnit,
    ExponentiateUnit,
    MultiplicandUnit,
    MultiplyUnits,
    Unit,
    UnitWithSymbols,
} from "./unitTypeArithmetic";
import { dimension, divideUnits, exponentiateUnit, multiplyUnits } from "./unitValueArithmetic";

/** The functions needed to construct a measure of a given numeric type */
export interface GenericMeasureFactory<N> {
    /** The constructor for this generic measure type, useful for doing `instanceof` checks. */
    isMeasure(value: any): value is GenericMeasure<any, N>;

    /**
     * Creates a new dimension base unit.
     * @param dim a unique string literal which names this dimension (e.g. "length")
     * @param symbol the symbol of the base unit of the dimension (e.g. "m")
     * @returns A measure representing 1 base unit of the dimension (1 m)
     */
    dimension<Dim extends string>(dim: Dim, symbol?: string): GenericMeasure<{ [D in Dim]: 1 }, N>;

    /**
     * Creates a dimensionless measure.
     * @param value the value of the measure
     * @returns a measure with no dimensions
     */
    dimensionless(value: N): GenericMeasure<{}, N>;

    /**
     * Creates a measure as a multiple of another measure.
     * @param value the number of measures
     * @param quantity the measure to be multiplied
     * @param symbol an optional unit symbol for this measure
     * @returns a measure of value number of quantities.
     */
    of<U extends Unit>(value: N, quantity: GenericMeasure<U, N>, symbol?: string): GenericMeasure<U, N>;

    /**
     * Creates a measure from a raw unit, should be avoided unless you know what you're doing.
     * @param value the value of the measure
     * @param unit the raw unit of the measure
     * @param symbol an optional unit symbo for this measure
     */
    unsafeConstruct<U extends Unit>(value: N, unit: UnitWithSymbols<U>, symbol?: string): GenericMeasure<U, N>;
}

/**
 * Creates a new measure factory for a given numeric type. The numeric type of the measure is inferred from the
 * parameter.
 * @param num the set of numeric operations needed to implement a measure for an arbitrary numeric type
 * @returns a factory for constructing measures of the given numeric type
 * @example
 * type MyMeasure<U extends Unit> = GenericMeasure<U, MyNumberType>;
 * const MyMeasure = createMeasureType({ ... });
 */
export function createMeasureType<N>(num: Numeric<N>): GenericMeasureFactory<N> {
    class InternalMeasure<U extends Unit> implements GenericMeasure<U, N> {
        public readonly symbol: string | undefined;
        public squared!: U extends BaseUnit<2> ? () => GenericMeasure<ExponentiateUnit<U, 2>, N> : never;
        public cubed!: U extends BaseUnit<3> ? () => GenericMeasure<ExponentiateUnit<U, 3>, N> : never;

        constructor(public readonly value: N, public readonly unit: UnitWithSymbols<U>, symbol?: string | undefined) {
            this.symbol = symbol;
        }

        public withSymbol(symbol: string): GenericMeasure<U, N> {
            return new InternalMeasure(this.value, this.unit, symbol);
        }

        // Arithmetic

        public plus(other: GenericMeasure<U, N>): GenericMeasure<U, N> {
            return new InternalMeasure(num.add(this.value, other.value), this.unit);
        }

        public minus(other: GenericMeasure<U, N>): GenericMeasure<U, N> {
            return new InternalMeasure(num.sub(this.value, other.value), this.unit);
        }

        public negate(): GenericMeasure<U, N> {
            return new InternalMeasure(num.neg(this.value), this.unit);
        }

        public scale(value: N): GenericMeasure<U, N> {
            return new InternalMeasure(num.mult(this.value, value), this.unit);
        }

        public times<V extends MultiplicandUnit<U>>(
            other: GenericMeasure<V, N>,
        ): GenericMeasure<MultiplyUnits<U, V>, N> {
            return new InternalMeasure(num.mult(this.value, other.value), multiplyUnits(this.unit, other.unit));
        }

        public over<V extends DivisorUnit<U>>(other: GenericMeasure<V, N>): GenericMeasure<DivideUnits<U, V>, N> {
            return new InternalMeasure(num.div(this.value, other.value), divideUnits(this.unit, other.unit));
        }

        public per<V extends DivisorUnit<U>>(other: GenericMeasure<V, N>): GenericMeasure<DivideUnits<U, V>, N> {
            return this.over(other);
        }

        public div<V extends DivisorUnit<U>>(other: GenericMeasure<V, N>): GenericMeasure<DivideUnits<U, V>, N> {
            return this.over(other);
        }

        public pow<E extends Exponent>(
            power: E,
        ): U extends BaseUnit<E> ? GenericMeasure<ExponentiateUnit<U, E>, N> : never {
            return new InternalMeasure(num.pow(this.value, power), exponentiateUnit(this.unit as any, power)) as any;
        }

        public toThe<E extends Exponent>(
            power: E,
        ): U extends BaseUnit<E> ? GenericMeasure<ExponentiateUnit<U, E>, N> : never {
            return this.pow(power);
        }

        public inverse(): GenericMeasure<ExponentiateUnit<U, -1>, N> {
            return this.pow(-1);
        }

        public reciprocal(): GenericMeasure<ExponentiateUnit<U, -1>, N> {
            return this.pow(-1);
        }

        public unsafeMap(fn: (value: N) => N): GenericMeasure<U, N> {
            return new InternalMeasure(fn(this.value), this.unit);
        }

        // Comparisons

        public compare(other: GenericMeasure<U, N>): number {
            return num.compare(this.value, other.value);
        }

        public lt(other: GenericMeasure<U, N>): boolean {
            return this.compare(other) < 0;
        }

        public lte(other: GenericMeasure<U, N>): boolean {
            return this.compare(other) <= 0;
        }

        public eq(other: GenericMeasure<U, N>): boolean {
            return this.compare(other) === 0;
        }

        public neq(other: GenericMeasure<U, N>): boolean {
            return this.compare(other) !== 0;
        }

        public gte(other: GenericMeasure<U, N>): boolean {
            return this.compare(other) >= 0;
        }

        public gt(other: GenericMeasure<U, N>): boolean {
            return this.compare(other) > 0;
        }

        // Formatting

        public toString(): string {
            return `${num.format(this.value)}${formatUnit(this.unit)}`;
        }

        public in(unit: GenericMeasure<U, N>): string {
            if (unit.symbol === undefined) {
                return this.toString();
            }
            const value = num.format(num.div(this.value, unit.value));
            return `${value} ${unit.symbol}`;
        }
    }

    InternalMeasure.prototype.squared = function(): any {
        return this.toThe(2);
    };

    InternalMeasure.prototype.cubed = function(): any {
        return this.toThe(3);
    };

    return {
        isMeasure: (value): value is GenericMeasure<any, N> => value instanceof InternalMeasure,
        dimension: <Dim extends string>(dim: Dim, symbol?: string): GenericMeasure<{ [D in Dim]: 1 }, N> => {
            return new InternalMeasure(num.one(), dimension(dim, symbol), symbol);
        },
        dimensionless: (value: N): GenericMeasure<{}, N> => {
            return new InternalMeasure(value, {});
        },
        of: <U extends Unit>(value: N, quantity: GenericMeasure<U, N>, symbol?: string): GenericMeasure<U, N> => {
            return new InternalMeasure(num.mult(value, quantity.value), quantity.unit, symbol);
        },
        unsafeConstruct: <U extends Unit>(
            value: N,
            unit: UnitWithSymbols<U>,
            symbol?: string,
        ): GenericMeasure<U, N> => {
            return new InternalMeasure(value, unit, symbol);
        },
    };
}
