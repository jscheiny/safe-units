import { GenericMeasure } from "./genericMeasure";
import { PrefixFunction } from "./genericMeasureUtils";
import { DivideUnits, DivisorUnit, MultiplicandUnit, MultiplyUnits, Unit } from "./unitTypeArithmetic";

export interface GenericMeasureStatic<N> {
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

    /** Sums a list of one or more measures, all of the same unit. */
    sum<U extends Unit>(first: GenericMeasure<N, U>, ...rest: Array<GenericMeasure<N, U>>): GenericMeasure<N, U>;

    /** Returns the smallest of a list of one or more measures. */
    min<U extends Unit>(first: GenericMeasure<N, U>, ...rest: Array<GenericMeasure<N, U>>): GenericMeasure<N, U>;

    /** Returns the largest of a list of one or more measures. */
    max<U extends Unit>(first: GenericMeasure<N, U>, ...rest: Array<GenericMeasure<N, U>>): GenericMeasure<N, U>;

    /**
     * Creates a function that takes a measure and applies a symbol to its prefix and scales it by a given multiplier.
     * @param prefix the prefix to add to symbols of measures passed into the resulting function
     * @param multiplier the scalar by which to multiply measures passed into the resulting function
     * @returns a function that takes measures and adds a prefix to their symbols and multiplies them by a given value
     */
    prefix(prefix: string, multiplier: N): PrefixFunction<N>;
}

export const getGenericMeasureStaticMethods = <N>(): GenericMeasureStatic<N> => ({
    add: (left, right) => left.plus(right),
    subtract: (left, right) => left.minus(right),
    multiply: (left, right) => left.times(right),
    divide: (left, right) => left.over(right),
    sum: (first, ...rest) => {
        let result = first.clone();
        for (const curr of rest) {
            result = result.plus(curr);
        }
        return result;
    },
    min: (first, ...rest) => {
        let min = first;
        for (const curr of rest) {
            if (curr.lt(min)) {
                min = curr;
            }
        }
        return min;
    },
    max: (first, ...rest) => {
        let max = first;
        for (const curr of rest) {
            if (curr.gt(max)) {
                max = curr;
            }
        }
        return max;
    },
    prefix: (prefix, multiplier) => {
        return measure => {
            const { symbol } = measure;
            const newSymbol = symbol !== undefined ? `${prefix}${symbol}` : undefined;
            return measure.scale(multiplier).withSymbol(newSymbol);
        };
    },
});
