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

/** A function which applies a prefix multiplier to a given measure */
export type PrefixFunction<N> = <U extends Unit>(measure: GenericMeasure<N, U>) => GenericMeasure<N, U>;

/** The functions needed to construct a measure of a given numeric type */
export interface GenericMeasureFactory<N> {
    /** The constructor for this generic measure type, useful for doing `instanceof` checks. */
    isMeasure(value: any): value is GenericMeasure<N, any>;

    /**
     * Creates a new dimension base unit.
     * @param dim a unique string literal which names this dimension (e.g. "length")
     * @param symbol the symbol of the base unit of the dimension (e.g. "m")
     * @returns A measure representing 1 base unit of the dimension (1 m)
     */
    dimension<Dim extends string>(dim: Dim, symbol?: string): GenericMeasure<N, { [D in Dim]: 1 }>;

    /**
     * Creates a dimensionless measure.
     * @param value the value of the measure
     * @returns a measure with no dimensions
     */
    dimensionless(value: N): GenericMeasure<N, {}>;

    /**
     * Creates a measure as a multiple of another measure.
     * @param value the number of measures
     * @param quantity the measure to be multiplied
     * @param symbol an optional unit symbol for this measure
     * @returns a measure of value number of quantities.
     */
    of<U extends Unit>(value: N, quantity: GenericMeasure<N, U>, symbol?: string): GenericMeasure<N, U>;

    /**
     * Creates a function that takes a measure and applies a symbol to its prefix and scales it by a given multiplier.
     * @param prefix the prefix to add to symbols of measures passed into the resulting function
     * @param multiplier the scalar by which to multiply measures passed into the resulting function
     * @returns a function that takes measures and adds a prefix to their symbols and multiplies them by a given value
     */
    prefix(prefix: string, multiplier: N): PrefixFunction<N>;

    /**
     * Creates a measure from a raw unit, should be avoided unless you know what you're doing.
     * @param value the value of the measure
     * @param unit the raw unit of the measure
     * @param symbol an optional unit symbo for this measure
     */
    unsafeConstruct<U extends Unit>(value: N, unit: UnitWithSymbols<U>, symbol?: string): GenericMeasure<N, U>;
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
    class InternalMeasure<U extends Unit> implements GenericMeasure<N, U> {
        public readonly symbol: string | undefined;
        public squared!: U extends BaseUnit<2> ? () => GenericMeasure<N, ExponentiateUnit<U, 2>> : never;
        public cubed!: U extends BaseUnit<3> ? () => GenericMeasure<N, ExponentiateUnit<U, 3>> : never;

        constructor(public readonly value: N, public readonly unit: UnitWithSymbols<U>, symbol?: string | undefined) {
            this.symbol = symbol;
        }

        public withSymbol(symbol: string): GenericMeasure<N, U> {
            return new InternalMeasure(this.value, this.unit, symbol);
        }

        // Arithmetic

        public plus(other: GenericMeasure<N, U>): GenericMeasure<N, U> {
            return new InternalMeasure(num.add(this.value, other.value), this.unit);
        }

        public minus(other: GenericMeasure<N, U>): GenericMeasure<N, U> {
            return new InternalMeasure(num.sub(this.value, other.value), this.unit);
        }

        public negate(): GenericMeasure<N, U> {
            return new InternalMeasure(num.neg(this.value), this.unit);
        }

        public scale(value: N): GenericMeasure<N, U> {
            return new InternalMeasure(num.mult(this.value, value), this.unit);
        }

        public times<V extends MultiplicandUnit<U>>(
            other: GenericMeasure<N, V>,
        ): GenericMeasure<N, MultiplyUnits<U, V>> {
            return new InternalMeasure(num.mult(this.value, other.value), multiplyUnits(this.unit, other.unit));
        }

        public over<V extends DivisorUnit<U>>(other: GenericMeasure<N, V>): GenericMeasure<N, DivideUnits<U, V>> {
            return new InternalMeasure(num.div(this.value, other.value), divideUnits(this.unit, other.unit));
        }

        public per<V extends DivisorUnit<U>>(other: GenericMeasure<N, V>): GenericMeasure<N, DivideUnits<U, V>> {
            return this.over(other);
        }

        public div<V extends DivisorUnit<U>>(other: GenericMeasure<N, V>): GenericMeasure<N, DivideUnits<U, V>> {
            return this.over(other);
        }

        public pow<E extends Exponent>(
            power: E,
        ): U extends BaseUnit<E> ? GenericMeasure<N, ExponentiateUnit<U, E>> : never {
            return new InternalMeasure(num.pow(this.value, power), exponentiateUnit(this.unit as any, power)) as any;
        }

        public toThe<E extends Exponent>(
            power: E,
        ): U extends BaseUnit<E> ? GenericMeasure<N, ExponentiateUnit<U, E>> : never {
            return this.pow(power);
        }

        public inverse(): GenericMeasure<N, ExponentiateUnit<U, -1>> {
            return this.pow(-1);
        }

        public reciprocal(): GenericMeasure<N, ExponentiateUnit<U, -1>> {
            return this.pow(-1);
        }

        public unsafeMap(fn: (value: N) => N): GenericMeasure<N, U> {
            return new InternalMeasure(fn(this.value), this.unit);
        }

        // Comparisons

        public compare(other: GenericMeasure<N, U>): number {
            return num.compare(this.value, other.value);
        }

        public lt(other: GenericMeasure<N, U>): boolean {
            return this.compare(other) < 0;
        }

        public lte(other: GenericMeasure<N, U>): boolean {
            return this.compare(other) <= 0;
        }

        public eq(other: GenericMeasure<N, U>): boolean {
            return this.compare(other) === 0;
        }

        public neq(other: GenericMeasure<N, U>): boolean {
            return this.compare(other) !== 0;
        }

        public gte(other: GenericMeasure<N, U>): boolean {
            return this.compare(other) >= 0;
        }

        public gt(other: GenericMeasure<N, U>): boolean {
            return this.compare(other) > 0;
        }

        // Formatting

        public toString(): string {
            return `${num.format(this.value)}${formatUnit(this.unit)}`;
        }

        public in(unit: GenericMeasure<N, U>): string {
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
        isMeasure: (value): value is GenericMeasure<N, any> => value instanceof InternalMeasure,
        dimension: <Dim extends string>(dim: Dim, symbol?: string): GenericMeasure<N, { [D in Dim]: 1 }> => {
            return new InternalMeasure(num.one(), dimension(dim, symbol), symbol);
        },
        dimensionless: (value: N): GenericMeasure<N, {}> => {
            return new InternalMeasure(value, {});
        },
        of: <U extends Unit>(value: N, quantity: GenericMeasure<N, U>, symbol?: string): GenericMeasure<N, U> => {
            return new InternalMeasure(num.mult(value, quantity.value), quantity.unit, symbol);
        },
        prefix: (prefix: string, multiplier: N): PrefixFunction<N> => {
            return unit => {
                const { value, symbol } = unit;
                const newSymbol = symbol !== undefined ? `${prefix}${symbol}` : undefined;
                return new InternalMeasure(num.mult(multiplier, value), unit.unit, newSymbol);
            };
        },
        unsafeConstruct: <U extends Unit>(
            value: N,
            unit: UnitWithSymbols<U>,
            symbol?: string,
        ): GenericMeasure<N, U> => {
            return new InternalMeasure(value, unit, symbol);
        },
    };
}
