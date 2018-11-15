import { GenericMeasure, Numeric } from "./genericMeasure";
import { createMeasureClass } from "./genericMeasureClass";
import { GenericMeasureStatic, getGenericMeasureStaticMethods } from "./genericMeasureStatic";
import { Unit } from "./unitTypeArithmetic";
import { dimension } from "./unitValueArithmetic";

/** The functions needed to construct a measure of a given numeric type */
interface GenericMeasureFactory<N> {
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
}

export type GenericMeasureType<N, StaticMethods extends {}> = GenericMeasureFactory<N> &
    GenericMeasureStatic<N> &
    StaticMethods;

/**
 * Creates a new measure factory for a given numeric type. The numeric type of the measure is inferred from the
 * parameter.
 * @param num the set of numeric operations needed to implement a measure for an arbitrary numeric type
 * @returns a factory for constructing measures of the given numeric type
 * @example
 * type MyMeasure<U extends Unit> = GenericMeasure<U, MyNumberType>;
 * const MyMeasure = createMeasureType({ ... });
 */
export function createMeasureType<N, S extends {} = {}>(num: Numeric<N>, staticMethods: S): GenericMeasureType<N, S> {
    const Measure = createMeasureClass(num);

    const type: GenericMeasureFactory<N> & GenericMeasureStatic<N> = {
        ...getGenericMeasureStaticMethods(),
        isMeasure: (value): value is GenericMeasure<N, any> => value instanceof Measure,
        dimension: <Dim extends string>(dim: Dim, symbol?: string): GenericMeasure<N, { [D in Dim]: 1 }> => {
            return new Measure(num.one(), dimension(dim, symbol), symbol);
        },
        dimensionless: (value: N): GenericMeasure<N, {}> => {
            return new Measure(value, {});
        },
        of: <U extends Unit>(value: N, quantity: GenericMeasure<N, U>, symbol?: string): GenericMeasure<N, U> => {
            return new Measure(num.mult(value, quantity.value), quantity.unit, symbol);
        },
    };

    return {
        ...((staticMethods || {}) as any),
        ...type,
    };
}
