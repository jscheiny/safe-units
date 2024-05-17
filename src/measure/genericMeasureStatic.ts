import { GenericMeasure } from "./genericMeasure";
import { BinaryFn, PrefixFn, SpreadFn } from "./genericMeasureUtils";
import { DivideUnits, MultiplyUnits, Unit } from "./unitTypeArithmetic";

export interface GenericMeasureStatic<N> {
    // /** Sums a list of one or more measures, all of the same unit. */
    sum: SpreadFn<N>;

    // /** Returns the smallest of a list of one or more measures. */
    min: SpreadFn<N>;

    // /** Returns the largest of a list of one or more measures. */
    max: SpreadFn<N>;

    /** Static version of `left.plus(right)` */
    add: BinaryFn<N>;

    /** Static version of `left.minus(right)` */
    subtract: BinaryFn<N>;

    /** Static version of `left.times(right)` */
    multiply<Basis, Left extends Unit<Basis>, Right extends Unit<Basis>>(
        left: GenericMeasure<N, Basis, Left>,
        right: GenericMeasure<N, Basis, Right>,
    ): GenericMeasure<N, Basis, MultiplyUnits<Basis, Left, Right>>;

    /** Static version of `left.div(right)` */
    divide<Basis, Left extends Unit<Basis>, Right extends Unit<Basis>>(
        left: GenericMeasure<N, Basis, Left>,
        right: GenericMeasure<N, Basis, Right>,
    ): GenericMeasure<N, Basis, DivideUnits<Basis, Left, Right>>;

    /**
     * Creates a function that takes a measure and applies a symbol to its prefix and scales it by a given multiplier.
     * @param prefix the prefix to add to symbols of measures passed into the resulting function
     * @param multiplier the scalar by which to multiply measures passed into the resulting function
     * @returns a function that takes measures and adds a prefix to their symbols and multiplies them by a given value
     */
    prefix(prefix: string, multiplier: N): PrefixFn<N>;
}

export const getGenericMeasureStaticMethods = <N>(): GenericMeasureStatic<N> => {
    const add: BinaryFn<N> = (left, right) => left.plus(right);
    const min: BinaryFn<N> = (min, curr) => (curr.lt(min) ? curr : min);
    const max: BinaryFn<N> = (max, curr) => (curr.gt(max) ? curr : max);
    return {
        sum: reduce(add as any),
        min: reduce(min as any),
        max: reduce(max as any),
        add,
        subtract: (left, right) => left.minus(right),
        multiply: (left, right) => left.times(right),
        divide: (left, right) => left.over(right),
        prefix: (prefix, multiplier) => {
            return measure => {
                const { symbol } = measure;
                return measure.scale(multiplier).withSymbol(symbol && `${prefix}${symbol}`);
            };
        },
    };
};

export function reduce<N>(
    fn: <Basis, U extends Unit<Basis>>(
        left: GenericMeasure<N, Basis, U>,
        right: GenericMeasure<N, Basis, U>,
    ) => GenericMeasure<N, any, U>,
): SpreadFn<N> {
    return (first, ...rest) => rest.reduce(fn, first);
}
