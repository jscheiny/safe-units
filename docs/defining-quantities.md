# Defining Quantities

We define a **quantity** as the type of a measurement. This includes things like length, time, force, velocity, and pressure. Safe Units contains many built in quantities so we can write typesafe code simply:

```ts
import { Acceleration, Time, Velocity } from "safe-units";

function computeAcceleration(speed: Velocity, time: Time): Acceleration {
   return speed.over(time);
}
```

## Dimensions and Base Units

A **dimension** is the basis of a unit system. Units are composed of multiplying together multiple dimensions. For example, in the SI unit system there are the following dimensions, each corresponding to a base unit of the system

- Length - meters (m)
- Mass - kilograms (kg)
- Time - seconds (s)
- Electric Current - amperes (A)
- Temperature - kelvin (K)
- Amount of substance - moles (mol)
- Luminous intensity - candelas (cd)

We can use the `Measure.dimension` static method to define base units for a given dimension. Here's how Safe Units defines the dimensions and base units for length and time:

```ts
const meters = Measure.dimension("length", "m");
const Length = meters;
type Length = typeof meters;

const seconds = Measure.dimension("time", "s");
const Time = seconds;
type Time = typeof seconds;
```

Let's break this down:

```ts
const meters = Measure.dimension("length", "m");
```
The first argument should be a unique string literal that defines the name of the dimension that we are creating. Note that if two calls to `Measure.dimension` are made with the same first argument, they will be considered the same dimension. The second argument is the symbol for the base unit of that dimension. This returns a `Measure` that represents 1 base unit (in the example above 1 meter and 1 second).

```ts
type Length = typeof meters;
```
Next, we create a type for the quantity that this unit represents. This type is useful for specifying the types of values we use later on (e.g. `const l: Length = Measure.of(30, feet)`). As noted above, a quantity is just the type of a measure so we define just that way.

```ts
const Length = meters;
```
Finally, we create a value for the quantity. This is very useful for expressively deriving more quantities from this base unit as can be seen below.

## Derived Quantities

Now that we have a set of base units and dimensions, we can derive more interesting quantities by using the quantity values we defined just above. Let's create velocity and acceleration quantities:

```ts
const Velocity = Length.over(Time);
type Velocity = typeof Velocity;

const Acceleration = Velocity.over(Time);
type Acceleration = typeof Acceleration;
```

Now we can see how the values for `Length` and `Time` came in handy for writing this nicely. If we didn't have values for this we would need to define velocity as:

```ts
const Velocity = meters.over(seconds);
```

While not technically wrong, `Length.over(Time)` is a much cleaner definition of velocity.

It's worth noting that since our quantities defined thus far are instances of `Measure`, we can perform all the same operations on `Measures` on quantities. For example, here is how Safe Units defines the quantity of magnetic flux density:

```ts
const MagneticFluxDensity = Voltage.times(Time).over(Area);
```

This can then mirror how this measure might be computed:

```ts
function computeMagneticFluxDensity(
   voltage: Voltage,
   time: Time,
   area: Area,
): MagneticFluxDensity {
   return voltage.times(time).over(area);
}
```

## Generic Quantities

The examples in here are for creating dimensions and quantities for the built in `Measure` type. However, measures can be made for any numeric type (see [Generic Measures](generic-measures.html)). As such we may want to make our quantities generic as well. This can be easily done with the generic `LiftMeasure` type which takes a measure of a given unit and changes its numeric type. 

For example, suppose we have a `WrappedNumber` type, we can change a `Velocity` quantity from operating on number measures to `WrappedNumber` measures as follows:

```ts
type WrappedVelocity = LiftMeasure<Velocity, WrappedNumber>
```

We could also just define the `Velocity` type to be generic in the first place. The recommended way of doing this is as follows:

```ts
const Velocity = Length.over(Time);
type Velocity<N = number> = LiftMeasure<typeof Velocity, N>;
```

This way, we can use `Velocity` to refer to the quantity on numbers, but also use `Velocity<WrappedNumber>` to operate on `WrappedMeasure`s.