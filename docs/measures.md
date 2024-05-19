# Measures

The `Measure` class provides the core of the functionality for Safe Units. A `Measure` is a value associated with a unit (e.g. 5 meters, 10 seconds) in a given unit system (e.g. SI units). A `Measure` may be given a symbol to indicate that it itself represents some unit. For example, 0.3048 meters is one foot and therefore might be given the symbol `ft`. Measures are immutable and any operation on a measure returns a new measure.

The Measure class takes two type parameters `B` and `U`. The `B` type parameter is the basis for the unit system being used by the measure. The `U` type parameter is the type of the unit that the measure represents. 

**Note:** The `Measure` class provides functionality for manipulating units with numeric values represented by the JavaScript `number` type. For different numeric types see [Generic Measures](generic-measures.html).

## Construction

The following functions are static functions on the Measure class used to construct or manipulate measures.

### `Measure.of`
```ts
Measure.of<B, U>(
   value: number,
   quantity: Measure<B, U>,
   symbol?: string,
): Measure<B, U>
```

Creates a measure that is a scalar multiple of a given measure. An optional symbol may be provided to name the resulting measure.

*Examples:*

```example
measuresOf.ts
```

### `Measure.dimensionless`

```ts
Measure.dimensionless<B>(
   unitSystem: UnitSystem<B>,
   value: number,
): Measure<B, DimensionlessUnit<B>>
```

Creates a dimensionless measure value in the given unit system.

*Examples:*

```example
measuresDimensionless.ts
```

### `Measure.dimension`

```ts
Measure.dimension<B, D extends keyof B>(
   unitSystem: UnitSystem<B>,
   dimension: D,
   symbol?: string,
): Measure<...>
```

Constructs a measure which represents a single dimension of the given unit system. The resulting measure is 1 of the base unit for that dimension. For more information see [Defining Quantities](defining-quantities.html).

```example
measuresDimension.ts
```

### `Measure.isMeasure`

```ts
Measure.isMeasure(value: any): value is Measure<any, any>
```

Since `Measure` isn't technically a class, you can't check that a value is a measure by using `instanceof`. Instead, use this method to determine if a given value is a `Measure`.

### `Measure.prefix`

```ts
Measure.prefix(prefix: string, multiplier: number): PrefixFn
```

Creates a function which, when given a measure, applies a prefix to that measure's symbol and multiplies it by a given dimensionless value.

*Examples:*

```example
measuresPrefix.ts
```

## Operations

### Negation

```ts
Measure<B, U>.negate(): Measure<B, U>
```

Returns a new measure containing the negative value of the original.

*Examples:*

```example
measuresNegate.ts
```

### Addition
```ts
// Instance method
Measure<B, U>.plus(other: Measure<B, U>): Measure<B, U>

// Static functions
Measure.add<B, U>(left: Measure<B, U>, right: Measure<B, U>): Measure<B, U>
Measure.sum<B, U>(first: Measure<B, U>, ...rest: Array<Measure<B, U>>): Measure<B, U>
```

Measures may only be added if they have the same unit. This will produce a new measure with the same unit. The `Measure.add` static function is an alias for `a.plus(b)`. The `Measure.sum` method must be given a list of one or more units, since we can't infer the unit for an empty list.

*Examples:*

```example
measuresAddition.ts
```

### Subtraction

```ts
// Instance method
Measure<B, U>.minus(other: Measure<B, U>): Measure<B, U>

// Static function
Measure.subtract<B, U>(left: Measure<B, U>, right: Measure<B, U>): Measure<U>
```

Measures may only be subtracted if they have the same unit. This will produce a new measure with the same unit. All of these functions behave the same.

```example
measuresSubtraction.ts
```

### Multiplication

```ts
// Instance method
Measure<B, U>.times<V>(other: Measure<B, V>): Measure<B, MultiplyUnits<B, U, V>>

// Static function
Measure.multiply<B, U, V>(
   left: Measure<B, U>,
   right: Measure<B, V>,
): Measure<B, MultiplyUnits<B, U, V>>
```

Multiplies two measures together and returns a new measure. The resulting unit is computed at compile time to be the result of multiplying the arguments' units together.

```example
measuresMultiplication.ts
```

### Division

```ts
// Instance methods
Measure<B, U>.div<V>(other: Measure<B, V>): Measure<B, DivideUnits<B, U, V>>
Measure<B, U>.over<V>(other: Measure<B, V>): Measure<B, DivideUnits<B, U, V>>
Measure<B, U>.per<V>(other: Measure<B, V>): Measure<B, DivideUnits<B, U, V>>

// Static function
Measure.divide<B, U, V>(
   left: Measure<B, U>,
   right: Measure<B, V>,
): Measure<B, DivideUnits<B, U, V>>
```

Divides two measures together and returns a new measure. The resulting unit is computed at compile time to be the result of dividing the arguments' units together. All of these functions behave the same and are provided to make writing readable units easier.

```example
measuresDivision.ts
```

### Scalar Multiplication

```ts
Measure<B, U>.scale(value: number): Measure<B, U>
```

A convenience method for multiplying a measure by a dimensionless value.

```example
measuresScale.ts
```

### Exponentiation

```ts
Measure<B, U>.squared(): Measure<B, SqareUnit<B, U>>
Measure<B, U>.cubed(): Measure<B, CubeUnit<B, U>>
```

Convenience methods to square and cube a measure respectively. These are equivalent to multiplying a unit by itself the corresponding number of times.

*Examples:*

```example
measuresExponentiation.ts
```

### Reciprocals

```ts
Measure<B, U>.reciprocal(): Measure<B, ReciprocalUnit<B, U>>
Measure<B, U>.inverse(): Measure<B, ReciprocalUnit<B, U>>
```

Computes the reciprocal of the value and unit of the measure. Both methods are identical.

*Examples:*

```example
measuresReciprocals.ts
```

### Static Math

The `Measure` class contains a number of static methods from the JavaScript `Math` object wrapped to work on measures. Many of these functions take in a single measure and return a single measure without changing its unit:

* `Measure.abs`
* `Measure.ceil`
* `Measure.floor`
* `Measure.fround`
* `Measure.round`
* `Measure.trunc`

There is also a wrapper for `Math.hypot` that takes in one or more measures all with the same unit and returns a single measure of that unit.

*Examples:*

```example
measuresStaticMath.ts
```

### Comparisons

```ts
Measure<B, U>.lt(other: Measure<B, U>): boolean;
Measure<B, U>.lte(other: Measure<B, U>): boolean;
Measure<B, U>.eq(other: Measure<B, U>): boolean;
Measure<B, U>.neq(other: Measure<B, U>): boolean;
Measure<B, U>.gte(other: Measure<B, U>): boolean;
Measure<B, U>.gt(other: Measure<B, U>): boolean;
```

Measures are only comparable if they are of the same unit. Attempting to compare measures with different units is a compile time error.

*Examples:*

```example
measuresComparisons.ts
```

### Symbols

```ts
Measure<B, U>.withSymbol(symbol: string): Measure<B, U>;
```

Duplicates the current measure and gives the new measure a symbol. Symbols are specific to an instance of a measure, performing operations on that measure will not forward along any symbols to the resulting measures. Calling `measure.withSymbol(symbol)` is equivalent to calling `Measure.of(1, measure, symbol)`. The symbol of a measure can be seen by accessing the readonly `symbol` field.

```example
measuresSymbols.ts
```

Symbols are used in converting other measures into strings as can be seen below.

### Formatting

```ts
Measure<B, U>.toString(formatter?: MeasureFormatter): string;
```

Returns a string version of the unit, ignoring any [symbol](#symbols) information on that measure. This method optionally takes a formatter which has the following interface:

```ts
interface MeasureFormatter {
    formatValue?: (value: number) => string;
    formatUnit?: (unit: Unit, unitSystem: UnitSystem) => string;
}
```

The `formatValue` function, if provided, will be applied to customize the formatting of the numeric value of the measure in the resulting string. The `formatUnit`, if provided, will be passed the unit and unit system of the measure in order to customize how that is formatted. When calling the `Measure.in` method, the `formatUnit` function will only be used if the unit being used to express the measure has no symbol.

*Examples:*

```example
measuresFormatting.ts
```

### Conversions

```ts
Measure<B, U>.in(unit: Measure<B, U>, formatter?: MeasureFormatter): string;
Measure<B, U>.valueIn(unit: Measure<B, U>): number;
```

These methods can be used if you want to display or represent a measure in terms of another measure that represents a unit. The measures must have the same unit in order for the conversion to be valid.

The `in` method will return a formatted string containing the unit information. This takes an optional formatter parameter that behaves just like the [`toString()`](#formatting) method.

The `valueIn` will just return the numeric value of the conversion. Be careful when using `valueIn` as this erases the type information of the unit and is no longer type safe.

*Examples:*

```example
measuresConversion.ts
```

### Unsafe Mappings

```ts
Measure<B, U>.unsafeMap(valueMap: (value: number) => number): Measure<B, U>;
Measure<B, U>.unsafeMap<V>(
   valueMap: (value: number) => number,
   unitMap: (unit: U) => V,
): Measure<B, V>;
```

If only one argument is passed, performs a mapping on the value of a measure without affecting the unit of the measure. If both arguments are passed maps both the unit and value of a measure. This is generally used for internal purposes and should be avoided whenever possible. Instead consider using a [function wrapper](#function-wrappers).

## Representation

A `Measure` represents a value in terms its base units. For example, in the SI unit system, the base unit for length, mass, and time are meters, kilograms, and seconds respectively. We can define values units for feet, pounds, and minutes in this system but they will be represented under the hood as those base units.

```example
measuresRepresentationIntro.ts
```

If we use these units to derive new values, those resulting values will still be represented using meters, kilograms, and seconds:

```example
measuresRepresentationDerived.ts
```

In this way, we never actually have to perform unit conversions since, under the hood, all measures with the same dimension are always represented with the same units. We can format these values using any unit we want with the [`in` method](#conversions)

## Function Wrappers

It is often desirable to convert operations on numbers into operations on measures. Frequently, these functions make no change on the unit of a value. For example, suppose we want to make an absolute value function that operates on measures. We'd expect the function perserve the unit of the input. We can simply wrap an existing absolute value function using `wrapUnaryFn`:

```example
measuresFunctionWrappers.ts
```

The following function wrappers are provided:

* `wrapUnaryFn` - Wraps a function of a single number.
* `wrapBinaryFn` - Wraps a function of two numbers, returning a function that expects two measures of the same unit.
* `wrapSpreadFn` - Wraps a function that takes any number of numbers and returns a function that takes one or more measures of the same unit.
* `wrapReducerFn* - Wraps a function that takes two numbers and returns a function which takes one or more measures and performs a reduce across its inputs.
