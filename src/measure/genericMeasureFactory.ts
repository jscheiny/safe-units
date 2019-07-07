import { GenericMeasure, NumericOperations } from "./genericMeasure";
import { createMeasureClass } from "./genericMeasureClass";
import { GenericMeasureStatic, getGenericMeasureStaticMethods } from "./genericMeasureStatic";
import { IsSingleStringLiteral } from "./typeUtils";
import { Unit } from "./unitTypeArithmetic";
import { dimension } from "./unitValueArithmetic";

type DimensionResult<N, D extends string> = true extends IsSingleStringLiteral<D>
    ? GenericMeasure<N, { [Dim in D]: "1" }>
    : never;

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
    dimension<D extends string>(dim: D, symbol?: string): DimensionResult<N, D>;

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

type GenericMeasureCommon<N> = GenericMeasureFactory<N> & GenericMeasureStatic<N>;
type Omit<T, K extends string> = Pick<T, Exclude<keyof T, K>>;

/**
 * A complete measure type for a given numeric type. This consists of:
 * - Static methods to construct measures (e.g. `Measure.of`)
 * - Predefined arithmetic static methods (e.g. `Measure.add`)
 * - User defined static methods (e.g. `Measure.abs`)
 */
export type GenericMeasureType<N, StaticMethods extends {}> = GenericMeasureCommon<N> &
    Omit<StaticMethods, keyof GenericMeasureCommon<N>>;

/**
 * Creates a new measure factory for a given numeric type. The numeric type of the measure is inferred from the
 * parameter.
 * @param num the set of numeric operations needed to implement a measure for an arbitrary numeric type
 * @param staticMethods an object containing methods that should be spread into the static definition of a measure,
 * useful for attaching static math operations to the type.
 * @returns a factory for constructing measures of the given numeric type
 * @example
 * type MyMeasure<U extends Unit> = GenericMeasure<MyNumberType, U>;
 * const MyMeasure = createMeasureType({ ... });
 */
export function createMeasureType<N, S extends {} = {}>(
    num: NumericOperations<N>,
    staticMethods?: S,
): GenericMeasureType<N, S> {
    const Measure = createMeasureClass(num);

    const common: GenericMeasureCommon<N> = {
        ...getGenericMeasureStaticMethods(),
        isMeasure: (value): value is GenericMeasure<N, any> => value instanceof Measure,
        dimensionless: value => new Measure(value, {}),
        dimension: <D extends string>(dim: D, symbol?: string) =>
            new Measure(num.one(), dimension(dim, symbol), symbol) as DimensionResult<N, D>,
        of: <U extends Unit>(value: N, quantity: GenericMeasure<N, U>, symbol?: string) =>
            new Measure(num.mult(value, quantity.value), quantity.unit, symbol),
    };

    return {
        ...((staticMethods || {}) as any),
        ...common,
    };
}
