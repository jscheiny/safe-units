# Safe Units

[![NPM Version](https://img.shields.io/npm/v/safe-units.svg)](https://www.npmjs.com/package/safe-units) [![MIT License](https://img.shields.io/npm/l/safe-units.svg)](https://github.com/jscheiny/safe-units/blob/master/LICENSE)

Safe Units is a type safe library for using units of measurement in TypeScript.  Safe Units provides an implementation of an SI based unit system but is flexible enough to allow users to create their own unit systems which can be independent or can interoperate with the built-in units. Users can also make unit systems for any numeric type they'd like not just the JavaScript `number` type. This library requires TypeScript 3.2 or higher.

example: intro.ts

## Features

⭐&nbsp; Compile-time unit arithmetic for typesafe dimensional analysis (with exponents between -5 and +5)!

⭐&nbsp; Large library of predefined units including SI (with prefixes), Imperial, and US customary units!

⭐&nbsp; Ability to add your own unit system that can work with built-in units!

⭐&nbsp; Long build times & cryptic error messages!

## Prerequisites

Safe units is written in TypeScript and should be consumed by TypeScript users to take full advantage of what it provides. In addition you will need the following:

- [TypeScript](http://www.typescriptlang.org/) 3.2 or later
- [Strict null checks](https://www.typescriptlang.org/docs/handbook/compiler-options.html) enabled for your project

## Installation

```
npm install safe-units
```

or 

```
yarn add safe-units
```

## Examples

### Unit Arithmetic

example: introUnitArithmetic.ts

### Type Errors

example: introTypeErrors.ts

### Naming Units

example: introNamingUnits.ts

### Deriving Quantities

example: introDerivingQuantities.ts

### Defining Unit Systems

example: introUnitSystem.ts
