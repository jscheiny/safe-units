# Generic Measures

The default `Measure` class is specifically designed around using measures where the underlying values are represented by the JavaScript `number` type. However, it may be desirable to want measures where the values have different numeric types. For example, one might want measures with arbitrary precision or measures on the rational numbers. Creating such a measure class can be accomplished by using the `createMeasureType` function.

## Example

Suppose we have our own number type:

```example
genericMeasureIntro.ts
```

Now we're going to create our own measure type that operates on `WrappedNumber` types, let's call it `WrappedMeasure`:

```example
genericMeasureWrapped.ts
```

We can then use this class just as we would use `Measure`, except anywhere we'd expect a `number` we now expect a `WrappedNumber`.

## Breakdown

Let's deconstruct this example to explain what's going on. First we start with this type definition:

```ts
type WrappedMeasure<B, U extends Unit<B>> = GenericMeasure<WrappedNumber, B, U>;
```

This line isn't strictly necessary, but it is often useful to have our `WrappedMeasure` available as a type. Having a type for the measure is useful for writing generic functions on wrapped measures. All this line does is bind the numeric type of `GenericMeasure`. Similarly, the `Measure` type has the following definition:

```ts
type Measure<B, U extends Unit<B>> = GenericMeasure<number, B, U>;
```

After we've defined the type of `WrappedMeasure` we now define the class itself by calling `createMeasureType`. This function takes an object which let's the generic measure type know how to perform operations on our numeric type. Note that for this simple example, we generally just unwrap the value, perform the arithmetic operation and then wrap it back up. Most of these operations should be self-explanatory, however some require some further explanation:

- `one`: A function with no arguments that simply returns the 1 value or multiplicative identity of your number system. This is used to construct base units whose values are implicitly one.
- `compare`: A function that returns a negative `number` if its first argument is less than its second, a positive `number` if its first argument is greater than its second, and `0` if the arguments are equal.

##  Usage

The returned `WrappedMeasure` now behaves just like `Measure` does except in the domain of wrapped numbers. This means we can call `WrappedMeasure.of` or `WrappedMeasure.dimensions` just as expected.

## Static Methods

By default, generic measures come with a set of static methods that can be applied to measures of all numeric types. However, certain static methods may only make sense for a given numeric type. For example the `Measure.trunc` method exists because `Math.trunc` applies to `number` types. To add static methods to a generic measure type, simple pass an object as a second argument to `createMeasureType`:

```example
genericMeasuresStaticMethods.ts
```
