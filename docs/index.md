# Safe Units

[![NPM Version](https://img.shields.io/npm/v/safe-units.svg)](https://www.npmjs.com/package/safe-units) [![MIT License](https://img.shields.io/npm/l/safe-units.svg)](https://github.com/jscheiny/safe-units/blob/master/LICENSE)

Safe Units is a type safe library for using units of measurement in TypeScript. Check it out on [github](https://github.com/jscheiny/safe-units). Safe Units provides an implementation of an SI based unit system but is flexible enough to allow users to create their own unit systems. Users can also make unit systems for any numeric type they'd like not just the JavaScript `number` type.

```example
intro.ts
```

**Features include:**

⭐&nbsp; Compile-time unit arithmetic for typesafe dimensional analysis (with exponents between -5 and +5)!

⭐&nbsp; Large library of predefined units including metric (with prefixes), Imperial, and US customary units!

⭐&nbsp; Ability to define your own custom unit systems!

⭐&nbsp; Long build times & cryptic error messages!

## Prerequisites

Safe units is written in TypeScript and should be consumed by TypeScript users to take full advantage of what it provides. Make sure that you enable [strict null checks](https://www.typescriptlang.org/docs/handbook/compiler-options.html) for your project.

## Installation

```
npm install safe-units
```

or 

```
yarn add safe-units
```

## Examples

### Unit arithmetic

```example
introUnitArithmetic.ts
```

### Type errors

```example
introTypeErrors.ts
```

### Naming units

```example
introNamingUnits.ts
```

### Deriving quantities

```example
introDerivingQuantities.ts
```

### Defining unit systems

```example
introUnitSystem.ts
```
