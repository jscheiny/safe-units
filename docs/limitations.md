# Limitations

Since Safe Units is typesafe, it must compute units at compile time. Due to some technical limitations of what you can do with types in TypeScript, there is one major limitation to this library: The exponents for dimensions of your units are limited to integers between -5 and 5, inclusive. (However, under the hood these are represented by string literals between `"-5"` and `"5"`). This means that you can not represent a value of 30 m<sup>6</sup> in this library (though, why would you?).

In the research I've conducted for this library I cannot find any instances in which it would be useful to use units with such extreme exponents. If you're aware of any such use cases, please [file an issue](https://github.com/jscheiny/safe-units/issues/new) to discuss it.

The result of this limitation is that certain operations may fail somewhat unexpectedly. With any luck, these should never occur in practice, but just in case, here's a list of what can fail:

## Multiplication / Division

If two units will multiply or divide together to create an exponent out of range a compile error will occur. This will fail at compile time by marking the argument as invalid.

```ts
const a = Measure.of(1, meters.cubed());
const b = Measure.of(1, meters.toThe("-3"));
const product = a.times(a);
//                      ~  Error: The result would have unit m^6
const quotient = a.over(b);
//                      ~  Error: The result would have unit m^-6
```

## Exponentiation

The `squared` and `cubed` methods of measure will fail when applied to measures that would create invalid results. This will fail at compile time because for measures which cannot be squared or cubed these methods will have type `never`. The `toThe` method of measure will fail at compile time by marking the argument as invalid.

```ts
const m = Measure.of(30, meters.cubed());
const a = m.squared();
//        ~~~~~~~~~~~  Error: squared has type never
const b = m.cubed();
//        ~~~~~~~~~    Error: cubed has type never
const c = m.toThe("3");
//                ~~~  Error: m cannot be cubed so "3" is an invalid argument
```
