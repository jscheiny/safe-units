# Safe Units

Safe Units is a library for using units of measurement in TypeScript in a type safe manner. Check it out on [github](https://github.com/jscheiny/safe-units). Safe Units provides an implementation of an SI based unit system but is flexible enough to allow users to create their own unit systems which can be independent or can interoperate with the built-in units. Users can also make unit systems for any numeric type they'd like not just the JavaScript `number` type. This library makes heavy use of conditional types and thus requires TypeScript 2.9+.

```ts
import { Length, Measure, meters, seconds, Time, Velocity } from "safe-units";

const length: Length = Measure.of(30, meters);
const time: Time = Measure.of(15, seconds);
const velocity: Velocity = length.over(time);

console.log(length.toString());   // 30 m
console.log(time.toString());     // 15 s
console.log(velocity.toString()); // 2 m * s^-1

const error: Velocity = length.times(time); // Error: A measure of m*s isn't assignable to a measure of m/s.
```

## Prerequisites

Safe units is written and TypeScript and should be consumed by TypeScript users to take full advantage of what it provides. In addition you will need the following:

- TypeScript 2.9 or later
- Strict null checks enabled for your project

## Installation

```
npm install safe-units
```

or 

```
yarn add safe-units
```

