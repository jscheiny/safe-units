# Generic Measures

The default Safe Units `Measure` class is specifically designed around using measures where the underlying values are represented by the JavaScript `number` type. However, it wouldn't be unreasonable to want measures where the values have different requirements. For example, one might want measures with arbitrary precision or measures on the rational numbers. Creating such a measure class can be accomplished by using the `createMeasureType` function.

## Example

Suppose we have our own number type:

```ts
class WrappedNumber {
    constructor(public readonly value: number) {}

    foo(): WrappedNumber { ... }
}

function wrap(value: number) {
    return new WrappedNumber(value);
}
```

Now we're going to create our own measure type that operates on `WrappedNumber`s, let's call it `WrappedMeasure`:

```ts
import { createMeasureType, GenericMeasure, Unit } from "safe-units";

type WrappedMeasure<U extends Unit> = IGenericMeasure<WrappedNumber, U>;
const WrappedMeasure = createMeasureType({
    one: () => wrap(1),
    neg: x => wrap(-x),
    add: (x, y) => wrap(x.value + y.value),
    sub: (x, y) => wrap(x.value - y.value),
    mult: (x, y) => wrap(x.value * y.value),
    div: (x, y) => wrap(x.value / y.value),
    pow: (x, y) => wrap(x.value ** y),
    compare: (x, y) => x - y,
    format: x => `${x}`,
});
```

We can then use this class just as we would use `Measure`, except anywhere we'd expect a `number` we now expect a `WrappedNumber`.

## Breakdown

Let's deconstruct this example to explain what's going on. First we start with this type definition:

```ts
type WrappedMeasure<U extends Unit> = IGenericMeasure<WrappedNumber, U>;
```

This line isn't strictly necessary, but it is often useful to have our `WrappedMeasure` available as a type. The next line `const WrappedMeasure = ...` creates a value for wrapped measures. Having a type for the measure is useful for writing generic functions on wrapped measures. All this line does is bind the numeric type of `GenericMeasure`. Similarly, the `Measure` type has the following definition:

```ts
type Measure<U extends Unit> = IGenericMeasure<number, U>;
```

After we've defined the type of `WrappedMeasure` we now define the class itself by calling `createMeasureType`. This function takes an object which let's the generic measure type know how to perform operations on our numeric type. Note that for this simple example, we generally just unwrap the value, perform the arithmetic operation and then wrap it back up. Most of these operations should be self-explanatory, however some require some further explanation:

- `one`: A function with no arguments that simply returns the 1 value or multiplicative identity of your number system. This is used to construct base units whose values are implicitly one.
- `pow`: This function is slightly different from the rest of the arithmetic operations in that it doesn't take to values of type `N`, instead its signature is: `pow: (base: N, power: Exponent) => N` where `Exponent` is the union of `-5 | -4 | ... | 4 | 5`. This is due to the computational limitations of the library that we need to be specific in the kinds of exponents we can handle.
- `compare`: A function that returns a negative `number` if its first argument is less than its second, a positive `number` if its first argument is greater than its second, and `0` if the arguments are equal.

##  Usage

The returned `WrappedMeasure` now behaves just like `Measure` does except in the domain of wrapped numbers. This means we can call `WrappedMeasure.dimension` or `WrappedMeasure.of` just as expected. It's important to note that the provided quantities and units (`Length`, `Time`, `meters`, `seconds`, etc) will need to be redefined for other measure types as these types are all specific to `number`s.

## Static Methods

By default, generic measures come with a set of static methods that can be applied to measures of all numeric types. However, certain static methods may only make sense for a given numeric type. For example the `Measure.trunc` method exists because `Math.trunc` applies to `number`s. To add static methods to a generic measure type, simple pass an object as a second argument to `createMeasureType`:

```ts
declare function foo(value: WrappedNumber): WrappedNumber;
declare const mass: WrappedMeasure<{ mass: 1 }>;

const WrappedMeasure = createMeasureType({ ... }, {
    foo: wrapUnaryFn(foo),
});

WrappedMeasure.foo(mass);
```
