# Measures

The `Measure` class provides the core of the functionality of Safe Units. A `Measure` is a value associated with a unit (e.g. 5 meters, 10 seconds). A `Measure` may be given a symbol to indicate that it itself represent some unit (for example, 0.3048 meters might be given the symbol `ft`). Measures are immutable and any operation on a measure returns a new measure.

**Note:** The `Measure` class provides functionality for manipulating units with values represented by the JavaScript `number` type. For different numeric types see [Generic Measures](generic-measures.html).

## Construction

### `Measure.of`
```ts
Measure.of<U>(value: number, quantity: Measure<U>, symbol?: string): Measure<U>
```

Creates a measure that is a scalar multiple of a given measure. An optional symbol maybe provided to name the resulting measure. 

*Examples:*

```ts
const d1 = Measure.of(30, meters);
const feet = Measure.of(0.3048, meters, "ft");
const d2 = Measure.of(10, feet);
const minutes = Measure.of(60, seconds, "min");
```

### `Measure.dimensionless`

```ts
Measure.dimensionless(value: number): Measure<{}>
```

Creates a dimensionless measure value.

*Examples:*

```ts
const scalar = Measure.dimensionless(2);
const distance = Measure.of(20, meters);
const doubled = distance.times(scalar); // 40 m
```

### `Measure.dimension`

```ts
Measure.dimension<Dim extends string>(dim: Dim, symbol?: string): Measure<...>
```

Constructs a dimension of a unit system along with a base unit for that dimension. For more information see [Defining Quantities](defining-quantities.html).

### `Measure.isMeasure`

```ts
Measure.isMeasure(value: any): value is Measure<any>
```

Since `Measure` isn't technically a class, you can't check that a value is a measure by using `instanceof`. Instead, use this method to determine if a given value is a `Measure`.

### `Measure.prefix`

```ts
Measure.prefix(prefix: string, multiplier: number): PrefixFn
```

Creates a function which when given a measure applies a prefix to that measure's symbol and multiplies it by a given dimensionless value.

*Examples:*

```ts
const kilo = Measure.prefix("k", 1000);
const km = kilo(meters); // 1000 m

const distance = Measure.of(20, km); // 20000 m
distance.in(km) // 20 km
```

## Operations

### Negation

```ts
Measure<U>.negate(): Measure<U>
```

Returns a new measure containing the negative value of the original.

*Examples:*

```ts
const pos = Measure.of(30, meters);
const neg = pos.negate(); // -30 m
```

### Addition
```ts
Measure<U>.plus(other: Measure<U>): Measure<U>
Measure.add<U>(left: Measure<U>, right: Measure<U>): Measure<U>
Measure.sum<U>(first: Measure<U>, ...rest: Array<Measure<U>>): Measure<U>
```

Measures may only be added if they have the same unit. This will produce a new measure with the same unit. The `Measure.add` static function is an alias for `a.plus(b)`. The `Measure.sum` method must be given a list of one or more units, since we can't infer the unit for an empty list.

*Examples:*

```ts
const d1 = Measure.of(30, meters);
const d2 = Measure.of(10, meters);
const d3 = Measure.of(100, feet);
const t1 = Measure.of(2, minutes);

const sum1 = d1.plus(d2); // 40 m
const sum2 = Measure.add(d1, d2); // 40 m
const sum3 = Measure.dim(d1, d2, d3); // 140m

const good = d1.plus(d3); // Fine because both are lengths
const bad = d1.plus(t1); // ERROR: Cannot add a distance to a time unit
```

### Subtraction

```ts
Measure<U>.minus(other: Measure<U>): Measure<U>
Measure.subtract<U>(left: Measure<U>, right: Measure<U>): Measure<U>
```

Measures may only be subtracted if they have the same unit. This will produce a new measure with the same unit. All of these functions behave the same.

```ts
const d1 = Measure.of(30, meters);
const d2 = Measure.of(10, meters);
const t1 = Measure.of(2, minutes);

const diff1 = d1.minus(d2); // -20 m
const diff2 = Measure.subtract(d2, d1) // 20 m

const bad = t1.minus(d1); // ERROR: Cannot subtract a distance from a time unit
```

### Multiplication

```ts
Measure<U>.times<V>(other: Measure<V>): Measure<MultiplyUnits<U, V>>
Measure.multiply<U, V>(left: Measure<U>, right: Measure<V>): Measure<MultiplyUnits<U, V>>
```

Multiplies two measures together and returns a new measure. The resulting unit is computed at compile time to be the result of multiplying the arguments' units together.

```ts
const mass = Measure.of(10, kilograms);
const acceleration = Measure.of(9.8, metersPerSecondsSquared);

// Works! The result of mass times acceleration is force
const force: Force = mass.times(acceleration); // 98 N

// ERROR: A force quantity cannot be assigned to a pressure quantity
const bad: Pressure = Measure.multiply(mass, acceleration);
```

**Note:** There are limitations on what measures you may multiply and divide. See [Limitations](limitations.html).

### Division
```ts
Measure<U>.div<V>(other: Measure<V>): Measure<DivideUnits<U, V>>
Measure<U>.over<V>(other: Measure<V>): Measure<DivideUnits<U, V>>
Measure<U>.per<V>(other: Measure<V>): Measure<DivideUnits<U, V>>
Measure.divide<U, V>(left: Measure<U>, right: Measure<V>): Measure<DivideUnits<U, V>>
```

Divides two measures together and returns a new measure. The resulting unit is computed at compile time to be the result of dividing the arguments' units together. All of these functions behave the same and a provided to make writing readable units easier.

```ts
const distance = Measure.of(30, meters);
const time = Measure.of(10, seconds);

// Works! The result of distance over time is velocity
const velocity: Velocity = distance.over(time); // 300 m*s

// ERROR: A velocity quantity cannot be assigned to an acceleration quantity
const bad: Acceleration = Measure.divide(distance, time);
```

### Scalar Multiplication

```ts
Measure<U>.scale(value: number): Measure<U>
```

A convenience method for multiplying a measure by a dimensionless value.

```ts
const t = Measure.of(10, seconds);
const doubledShort = t.scale(2); // 20 s
const doubledLong = t.times(Measure.dimensionless(2));
```

### Exponentiation

```ts
Measure<U>.toThe<E>(exponent: E): Measure<ExponentiateUnit<U, E>>
Measure.pow<U, E>(measure: Measure<U>, exponent: E): Measure<ExponentiateUnit<U, E>>

Measure<U>.squared(): Measure<ExponentiateUnit<U, 2>>
Measure<U>.cubed(): Measure<ExponentiateUnit<U, 2>>
```

The first two methods raise a given measures value and unit to a given exponent (within a limited range). The last two methods, `squared` and `cubed` convenience methods for `measure.toThe(2)` and `measure.toThe(3)` respectively.

*Examples:*

```ts
const side = Measure.of(10, meters);

const area: Area = side.squared(); // 100 m^2
const volume: Volume = side.cubed(); // 1000 m^3

const s: Length = volume.toThe(-3); // 10 m
```

**Note:** There are limitations on what measures you may exponentiate. See [Limitations](Limitations).

### Reciprocals

```ts
Measure<U>.inverse(): Measure<ExponentiateUnit<U, -1>>
Measure<U>.reciprocal(): Measure<ExponentiateUnit<U, -1>>
```

Computes the reciprocal of the value and unit of the measure. Both methods are identical and equivalent to `measure.toThe(-1)`.

*Examples:*

```ts
const freq: Frequency = Measure.of(30, hertz); // 30 1/s

const cycle: Time = freq.inverse(); // 1/30 s
```

### Static Math

The `Measure` class contains a number of static methods from the JavaScript `Math` object wrapped to work on measures. Many of these functions take in a single measure and return a single measure without changing its unit:

* `Measure.abs`
* `Measure.ceil`
* `Measure.floor`
* `Measure.fround`
* `Measure.round`
* `Measure.trunc`

There is also a wrapper for `hypot` that takes in one or more measures all with the same unit and returns a single measure of that unit.

Lastly, there are wrappers for `sqrt` and `cbrt`. However, not all units have valid roots and these functions will produce errors when given units that don't produce roots with integer exponents.

*Examples:*

```ts
const distance = Measure.of(-9.8, meters);

Measure.abs(distance); // 9.8 m
Measure.trunc(distance); // -9 m

const width = Measure.of(3, meters);
const height = Measure.of(4, meters);

Measure.hypot(width, height); // 5 m
```

### Roots

The `Measure` class also provides wrappers for `sqrt` and `cbrt` functions. However, not all units have valid roots and these functions will produce errors when given units that don't produce roots with integer exponents.

```ts
const area: Area = Measure.of(64, meters.squared());
const volume: Volume = Measure.of(125, meters.cubed());

Measure.sqrt(area); // 8 m
Measure.cbrt(volume); // 5 m

Measure.cbrt(area); // ERROR: Cannot take the cube root of a unit of the form m^2
Measure.sqrt(volume); // ERROR: Cannot take the square root of a unit of the form m^3
```

### Comparisons

```ts
Measure<U>.lt(other: Measure<U>): boolean;
Measure<U>.lte(other: Measure<U>): boolean;
Measure<U>.eq(other: Measure<U>): boolean;
Measure<U>.neq(other: Measure<U>): boolean;
Measure<U>.gte(other: Measure<U>): boolean;
Measure<U>.gt(other: Measure<U>): boolean;
```

Comparison methods between two measures. Measures are only comparable if they are of the same unit.

*Examples:*

```ts
const t1 = Measure.of(30, minutes);
const t2 = Measure.of(0.25, hours);
const d1 = Measure.of(10, meters);

t1.gt(t2); // true
t1.eq(d1) // ERROR: Cannot compare temporal and distance values
```

### Symbols

```ts
Measure<U>.withSymbol(symbol: string): Measure<U>;
```

Duplicates the current measure and gives the new measure a symbol. Symbols are specific to an instance of a measure, performing operations on that measure will not forward along any symbols to the resulting measures. Calling `m.withSymbol(s)` is equivalent to calling `Measure.of(1, m, s)`. The symbol of a measure can be seen by accessing the readonly `symbol` field.

```ts
const squareMeters = meters.squared().withSymbol("sq. m");

squareMeters.symbol; // "sq. m"

// All of the following lose the symbol from squareMeters:
const r1 = squareMeters.scale(2);
const r2 = Measure.of(10, squareMeters);
const r3 = Measure.divide(squareMeters, meters);
```

Symbols are used in the converting other measures into strings as can be seen below.

### Formatting

```ts
Measure<U>.toString(): string;
Measure<U>.in(unit: Measure<U>): string;
```

The first method, `toString`, creates a string version of the unit, ignoring any [symbol](#symbols) information on that measure. The second method, `in`, will format a given unit as if its given in units of the second measure, assuming the second measure has a symbol. If not, this is equivalent to calling `toString()`.

*Examples:*

```ts
const kilometers = Measure.of(1000, meters, "km");
// Could be written as: Measure.of(1000, meters).withSymbol("km")

const distance = Measure.of(5, kilometers);
console.log(distance.toString()); // 5000 m
console.log(distance.in(kilometers)); // 5 km
console.log(kilometers.in(kilometers)); // 1 km

const force = Measure.of(30, newtons);
console.log(force.toString()); // 30 kg * m * s^-2
console.log(force.in(newtons)); // 30 N
```

### Unsafe Transformations

```ts
Measure<U>.unsafeMap(valueMap: (value: number) => number): Measure<U>;
Measure<U>.unsafeMap<V>(
   valueMap: (value: number) => number,
   unitMap: (unit: UnitWithSymbols<U>) => UnitWithSymbols<V>,
): Measure<V>;
```

If only one argument is passed, performs a mapping on the value of a measure without affecting the unit of the measure. If both arguments are passed maps both the unit and value of a measure. This is generally used for internal purposes and should be avoided when possible. Instead consider using a [function wrapper](#function-wrappers).

## Representation

A `Measure` represents a value in terms its most basic units. For example, consider we build up a unit system for currency as follows:

```ts
const dollars = Measure.dimension("currency", "$");
const Currency = dollars;
type Currency = typeof dollars;

const CashFlowRate = Currency.over(Time);
type CashFlowRate = typeof CashFlowRate;

const pounds: Currency = Measure.of(1.31, dollars, "£");
```

Then when deriving values from `pounds`, the underlying values are still represented as dollars:

```ts
const profit: Currency = Measure.of(60, pounds); // 78.6 dollars
const elapsed: Time = Measure.of(1, minutes);    // 60 seconds
const rate: CashFlowRate = profit.per(elapsed);  // 1.31 dollars / second
```

In this way, we never actually have to perform unit conversions since, under the hood, all measures with the same dimension are always represented with the same units. We can format these values using any unit we want with the `in` method:

```ts
const poundsPerSecond: CashFlowRate = pounds.per(seconds).withSymbol("£/s");

profit.in(pounds); // 60 £
elapsed.in(minutes); // 1 min
rate.in(poundsPerSecond); // 1 £/s
``` 

## Function Wrappers

It is often desirable to convert operations on numbers into operations on measures. Frequently these functions make no difference on the unit of a value. For example, suppose we want to make an absolute value function that operates on measures. We'd expect the function perserve the unit of the given measure. We can simply wrap an existing absolute value function using `wrapUnaryFn`:

```ts
const measureAbs = wrapUnaryFn(Math.abs);
const time = Measure.of(-30, seconds);
measureAbs(time); // 30 s
```

The following function wrappers are provided:

* `wrapUnaryFn` - Wraps a function of a single number.
* `wrapBinaryFn` - Wraps a function of two numbers, returning a function that expects two measures of the same unit.
* `wrapSpreadFn` - Wraps a function that takes any number of numbers and returns a function that takes one or more measures of the same unit.
* `wrapRootFn` - Wraps a function that takes the nth root of a given number for a specific n and returns a function that takes nth root of a measure's value and unit.