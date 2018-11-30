import { GenericMeasure } from "./genericMeasure";
import { BinaryMeasureFunction, PrefixFunction, SpreadMeasureFunction } from "./genericMeasureUtils";
import { DivideUnits, DivisorUnit, MultiplicandUnit, MultiplyUnits, Unit } from "./unitTypeArithmetic";

export interface GenericMeasureStatic<N> {
    /** Sums a list of one or more measures, all of the same unit. */
    sum: SpreadMeasureFunction<N>;

    /** Returns the smallest of a list of one or more measures. */
    min: SpreadMeasureFunction<N>;

    /** Returns the largest of a list of one or more measures. */
    max: SpreadMeasureFunction<N>;

    /** Static version of left + right */
    add<U extends Unit>(left: GenericMeasure<N, U>, right: GenericMeasure<N, U>): GenericMeasure<N, U>;

    /** Static version of left - right */
    subtract<U extends Unit>(left: GenericMeasure<N, U>, right: GenericMeasure<N, U>): GenericMeasure<N, U>;

    /** Static version of left * right */
    multiply<L extends Unit, R extends MultiplicandUnit<L>>(
        left: GenericMeasure<N, L>,
        right: GenericMeasure<N, R>,
    ): GenericMeasure<N, MultiplyUnits<L, R>>;

    /** Static version of left / right */
    divide<L extends Unit, R extends DivisorUnit<L>>(
        left: GenericMeasure<N, L>,
        right: GenericMeasure<N, R>,
    ): GenericMeasure<N, DivideUnits<L, R>>;

    /**
     * Creates a function that takes a measure and applies a symbol to its prefix and scales it by a given multiplier.
     * @param prefix the prefix to add to symbols of measures passed into the resulting function
     * @param multiplier the scalar by which to multiply measures passed into the resulting function
     * @returns a function that takes measures and adds a prefix to their symbols and multiplies them by a given value
     */
    prefix(prefix: string, multiplier: N): PrefixFunction<N>;
}

export const getGenericMeasureStaticMethods = <N>(): GenericMeasureStatic<N> => ({
    sum: reduce((prev, curr) => prev.plus(curr)),
    min: reduce((min, curr) => (curr.lt(min) ? curr : min)),
    max: reduce((max, curr) => (curr.gt(max) ? curr : max)),
    add: (left, right) => left.plus(right),
    subtract: (left, right) => left.minus(right),
    multiply: (left, right) => left.times(right),
    divide: (left, right) => left.over(right),
    prefix: (prefix, multiplier) => {
        return measure => {
            const { symbol } = measure;
            return measure.scale(multiplier).withSymbol(symbol && `${prefix}${symbol}`);
        };
    },
});

function reduce<N>(fn: BinaryMeasureFunction<N>): SpreadMeasureFunction<N> {
    return (first, ...rest) => rest.reduce(fn, first);
}
