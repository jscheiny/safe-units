import { GenericMeasure, NumericOperations } from "./genericMeasure";
import { createMeasureClass } from "./genericMeasureClass";
import { GenericMeasureStatic, getGenericMeasureStaticMethods } from "./genericMeasureStatic";
import { UnitSystem } from "./unitSystem";
import { DimensionUnit, DimensionlessUnit, Unit } from "./unitTypeArithmetic";

/** The functions needed to construct a measure of a given numeric type */
interface GenericMeasureFactory<N> {
    /** The constructor for this generic measure type, useful for doing `instanceof` checks. */
    isMeasure(value: any): value is GenericMeasure<N, any, any>;

    /**
     * Creates a new dimension base unit.
     * @param dim a unique string literal which names this dimension (e.g. "length")
     * @param symbol the symbol of the base unit of the dimension (e.g. "m")
     * @returns A measure representing 1 base unit of the dimension (1 m)
     */
    dimension<Basis, Dimension extends keyof Basis>(
        unitSystem: UnitSystem<Basis>,
        dimension: Dimension,
        symbol?: string,
    ): GenericMeasure<N, Basis, DimensionUnit<Basis, Dimension>>;

    /**
     * Creates a dimensionless measure.
     * @param value the value of the measure
     * @returns a measure with no dimensions
     */
    dimensionless<Basis>(unitSystem: UnitSystem<Basis>, value: N): GenericMeasure<N, Basis, DimensionlessUnit<Basis>>;

    /**
     * Creates a measure as a multiple of another measure.
     * @param value the number of measures
     * @param quantity the measure to be multiplied
     * @param symbol an optional unit symbol for this measure
     * @returns a measure of value number of quantities.
     */
    of<Basis, U extends Unit<Basis>>(
        value: N,
        quantity: GenericMeasure<N, Basis, U>,
        symbol?: string,
    ): GenericMeasure<N, Basis, U>;
}

type GenericMeasureCommon<N> = GenericMeasureFactory<N> & GenericMeasureStatic<N>;

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
    const { createMeasure, isMeasure } = createMeasureClass(num);

    const common: GenericMeasureCommon<N> = {
        ...getGenericMeasureStaticMethods(),
        isMeasure,
        dimensionless: (unitSystem, value) => createMeasure(value, unitSystem.createDimensionlessUnit(), unitSystem),
        dimension: (unitSystem, dimension, symbol) =>
            createMeasure(
                num.one(),
                unitSystem.createDimensionUnit(dimension),
                unitSystem,
                symbol ?? unitSystem.getSymbol(dimension),
            ),
        of: (value, quantity, symbol) =>
            createMeasure(num.mult(value, quantity.value), quantity.unit, quantity.unitSystem, symbol),
    };

    return {
        ...((staticMethods || {}) as any),
        ...common,
    };
}
