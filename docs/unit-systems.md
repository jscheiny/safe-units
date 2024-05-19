# Unit Systems

A unit system defines the set of dimensions and their corresponding units that can be combined together to form a unit within that system. These set of dimensions are called the basis of unit system. Each dimension is associated with a base unit for that dimension. For example, for the SI unit system these dimensions consist of length, time, mass, etc. and these have the corresponding base units of meters, seconds, kilograms respectively. Units are formed by multiplying and dividing these dimensions together. 

Safe Units by default comes with an implementation of the [SI unit system](builtin.html). Safe Units also provides the capability to define a unit system with your own custom dimensions and units.

## Creating a Unit System

To create a unit system we first need to define the basis of that unit system. For this example, suppose we're creating a game engine. We want to track things like in game distance and the frame rate of the game. As such we'll create a unit system with three dimensions: length, time, and frames. We can define our new unit system as follows:

```example
unitSystemsCreating.ts
```

First we define a basis for our unit system which consists of the dimensions that we determined above along with their base units, engine units (`eu`) for in game distance units, milliseconds (`ms`) for time, and `fr` for frames.

After that we do a little extra work to make sure that we have nice intellisense views when working with this unit system in our editor. Defining the unit system basis as an interface allows us and passing that as a type to the `UnitSystem.from` call ensures that we see just `GameUnitSystem` in our types instead of the full object type that would appear from `typeof GameUnitSystemBasis`. If you don't care about making your intellisense views clean, you can simplify this as:


```example
unitSystemsCreatingSimpler.ts
```

## Defining Base Units

Now that we have our unit system, lets pull out our base units and define those as quantities. A **quantity** is the type of a measurement. In the SI unit system length, time, force, and pressure are all examples of quantities.

```example
unitSystemsBaseUnits.ts
```

Let's break down the first three lines of this. First, we define the base unit of length in our unit system by calling `Measure.dimension`. This is a measure which is equivalent to 1 eu.

After that we make a new variable `Length` which is the same as `engineUnits`. This is useful for writing expressive code to derive more quantities from this unit system. We'll see why making this variable is useful when we [derive quantities](#deriving-quantities).

Finally we define our quantity as the type of that base unit. Then whenever we have something that's a length, no matter what unit it represents (engine units, meters, inches), they'll all be assignable to a `Length`.

## Deriving Quantities

Now that we have the quantities representing the base dimensions of our unit system, we want to be able to express types for more complex units such as frame rate or acceleration.

```example
unitSystemsDerivedQuantities.ts
```

Here we can see why creating measures named `Length` and `Time` and `Frames` allowed us to be more expressive when defining these quantities.

Since all of these quantities have corresponding values which are instances of `Measure`, we can manipulate them just like we manipulate measures. This allows the definition of quantities to mirror their usage.

Once we have these, we can then start to define our useful units in those quantities:

```example
unitSystemsDerivedUnits.ts
```

## Generic Quantities

The examples in here are for creating dimensions and quantities for the built in `Measure` type. However, measures can be made for any numeric type (see [Generic Measures](generic-measures.html)). As such we may want to make our quantities generic as well. This can be easily done with the generic `LiftMeasure` type which takes a measure of a given unit and changes its numeric type.

For example, suppose we have a `BigNumber` type for aribtrary precision numbers. We can rewrite our `Velocity` quantity to be generic and allow us to operate on this numeric type.

```example
unitSystemsGenericQuantities.ts
```

This way, we can use `Velocity` to refer to the quantity for numbers, but also use `Velocity<BigNumber>` to operate on `BigNumber` types.