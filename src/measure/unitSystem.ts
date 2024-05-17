import {
    DimensionUnit,
    DimensionlessUnit,
    DivideUnits,
    MultiplyUnits,
    ReciprocalUnit,
    Unit,
} from "./unitTypeArithmetic";

type UnitSystemResult<Basis> = [Basis[keyof Basis]] extends [string]
    ? UnitSystem<Basis>
    : `Dimension ${NonStringValuedKeys<Basis>} does not have a symbol`;

type NonStringValuedKeys<T> = keyof {
    [K in keyof T as [T[K]] extends [string] ? never : K]: K;
};

/**
 * A unit system consists of a set of dimensions and corresponding base units. The base dimensions for a unit system
 * are defined by the keys of the Basis type parameter. The base units are given by the symbol map passed into the
 * constructor.
 */
export class UnitSystem<Basis> implements UnitSystem<Basis> {
    private readonly dimensions: Array<keyof Basis>;

    /**
     * Constructs a unit system given a map from dimension to the symbol for the base unit of that dimension. To
     * improve intellisense views for all safe-units types, make sure to pass an interface as a type argument to this
     * constructor.
     *
     * @param symbols a map from dimension to the unit symbol for the base unit of that dimension.
     * @example
     * interface MetricSystem extends UnitBasis<"length" | "time" | "mass" | ... > {}
     * // We pass the type parameter below even though it could be inferred.
     * const MetricSystem = UnitSystem.from<MetricSystem>({
     *     length: "m",
     *     mass: "kg",
     *     time: "s",
     *     ...
     * });
     */
    public static from<Basis>(symbols: Basis): UnitSystemResult<Basis> {
        return new UnitSystem(symbols) as UnitSystemResult<Basis>;
    }

    private constructor(private readonly symbols: Basis) {
        this.dimensions = Object.keys(symbols as {}) as Array<keyof Basis>;
    }

    /** @returns the list of dimension names for this unit system. */
    public getDimensions(): ReadonlyArray<keyof Basis> {
        return this.dimensions;
    }

    /** @returns the symbol of the base unit of a given dimension. */
    public getSymbol(dimension: keyof Basis): string {
        const symbol = this.symbols[dimension];
        if (typeof symbol === "string") {
            return symbol;
        }

        throw new Error(`No symbol found for dimension: ${String(dimension)}`);
    }

    /** @returns a unit representing a dimensionless value, all dimensions having an exponent of 0. */
    public createDimensionlessUnit(): DimensionlessUnit<Basis> {
        return this.createUnit(() => 0) as DimensionlessUnit<Basis>;
    }

    /** @returns a unit representing a given dimension, only that dimension having an exponent of 1. */
    public createDimensionUnit<Dimension extends keyof Basis>(dimension: Dimension): DimensionUnit<Basis, Dimension> {
        return this.createUnit(dim => (dim === dimension ? 1 : 0)) as DimensionUnit<Basis, Dimension>;
    }

    public multiply<Left extends Unit<Basis>, Right extends Unit<Basis>>(
        left: Left,
        right: Right,
    ): MultiplyUnits<Basis, Left, Right> {
        return this.createUnit(dimension => left[dimension] + right[dimension]) as MultiplyUnits<Basis, Left, Right>;
    }

    public divide<Left extends Unit<Basis>, Right extends Unit<Basis>>(
        left: Left,
        right: Right,
    ): DivideUnits<Basis, Left, Right> {
        return this.createUnit(dimension => left[dimension] - right[dimension]) as DivideUnits<Basis, Left, Right>;
    }

    public reciprocal<U extends Unit<Basis>>(unit: U): ReciprocalUnit<Basis, U> {
        return this.createUnit(dimension => {
            const exponent = unit[dimension];
            return exponent === 0 ? 0 : -exponent;
        }) as ReciprocalUnit<Basis, U>;
    }
    /**
     * Creates a unit by mapping each dimension of the unit system to a given exponent defined by a mapping function.
     *
     * @param getExponent a function which maps a given dimension of the unit system to the exponent of the resulting
     * unit.
     */
    public createUnit(getExponent: (dimension: keyof Basis) => number): Unit<Basis> {
        const partial: Partial<Unit<Basis>> = {};

        for (const dimension of this.dimensions) {
            partial[dimension] = getExponent(dimension);
        }

        return partial as Unit<Basis>;
    }
}
