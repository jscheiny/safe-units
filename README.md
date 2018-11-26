# Safe Units

[![Build Status](https://travis-ci.org/jscheiny/safe-units.svg?branch=master)](https://travis-ci.org/jscheiny/safe-units)

Safe Units is a type-safe units of measurement framework for performing dimensional analysis in TypeScript at compile time. Safe Units provides an implementation of an SI based unit system but is flexible enough to allow users to create their own unit systems which can be independent or can interoperate with the built-in units. This library makes heavy use of conditional types and thus requires TypeScript 2.9+.

```typescript
import { Length, Measure, meters, seconds, Time, Velocity } from "safe-units";

const length: Length = Measure.of(30, meters);
const time: Time = Measure.of(15, seconds);
const velocity: Velocity = length.over(time);

console.log(length.toString());   // 30 m
console.log(time.toString());     // 15 s
console.log(velocity.toString()); // 2 m * s^-1

const error: Velocity = length.times(time); // Error: A measure of m*s isn't assignable to a measure of m/s.
```

## Features

⭐&nbsp; Compile-time unit arithmetic for typesafe dimensional analysis (with exponents between -5 and +5)!

⭐&nbsp; Large library of predefined units including metric (with prefixes), Imperial, and US customary units!

⭐&nbsp; Ability to add your own unit system that can work with built-in units!

⭐&nbsp; Long build times & cryptic error messages!

## Examples

### Measure arithmetic

```typescript
import { Acceleration, Area, Force, Length, Mass, Measure, Pressure, Unit, Volume } from "safe-units";

const length: Length = Measure.of(30, Unit.feet);
const width: Length = Measure.of(20, Unit.miles);
const height: Length = Measure.of(10, Unit.meters);
const area: Area = length.times(width);
const squareSide: Length = Measure.sqrt(area);
const volume: Volume = area.times(height);
const perimeter: Length = length.scale(2).plus(width.scale(2));
const mass: Mass = Measure.of(100, Unit.pounds);
const force: Force = Measure.of(50, Unit.newtons);
const acceleration: Acceleration = force.over(mass);
const pressure: Pressure = force.over(area);
```

### Type errors

```typescript
import { Force, Length, Measure, meters, seconds, Time } from "safe-units";

const length: Length = Measure.of(10, meters);
const time: Time = Measure.of(10, seconds);
length.plus(time); // Error: Measures of different units cannot be added
length.minus(time); // Error: Measures of different units cannot be subtracted

const force: Force = length.over(time); // Error: Measure of m/s is not assignable to measure of kg*m/s^2
const root = Measure.sqrt(length); // Error: Can't take sqrt of measure of m since it's not a perfect square
```

### Naming units

```typescript
import { days, Measure, miles, speedOfLight, yards } from "safe-units";

const furlongs = Measure.of(220, yards, "fur");

console.log(Measure.of(8, furlongs).in(miles)); // 1 mi
console.log(Measure.of(1, miles).in(furlongs)); // 8 fur

const fortnights = Measure.of(14, days, "ftn");
const megaFurlongsPerMicroFornight = mega(furlongs)
    .per(micro(fortnights))
    .withSymbol("Mfur/µftn");

console.log(speedOfLight.in(megaFurlongsPerMicroFornight)); // 1.8026174997852542 Mfur/µftn
```

### Deriving quantities

```typescript
import { Acceleration, Measure, meters, seconds, Time } from "safe-units";

const Jerk = Acceleration.over(Time);
type Jerk = typeof Jerk;

const mps2 = meters.per(seconds.squared());
const acceleration = Measure.of(9.8, mps2);
const jerk: Jerk = acceleration.over(Measure.of(2, seconds));

console.log(jerk.toString()); // 4.9 m * s^-3
```

### Defining dimensions

```typescript
import { Area, Measure, seconds, Time } from "safe-units";

const bits = Measure.dimension("data", "b");

type Data = typeof bits;
const Data = bits;

const DataRate = Data.over(Time);
type DataRate = typeof DataRate;

const DataDensity = Data.over(Area);
type DataDensity = typeof DataDensity;

const bytes: Data = Measure.of(8, bits, "B");
const memory: Data = Measure.of(1024, bytes);
const rate: DataRate = memory.over(Measure.of(10, seconds));

console.log(memory.in(bytes)); // 1024 B
console.log(rate.toString()); // 819.2 b * s^-1

const density: DataDensity = rate; // Error: Cannot assign measure of type b/s to measure of type b/s^2
```
