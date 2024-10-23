# Changelog

## v2.0.2
- Fixed an issue where large memory prefix functions (`tebi` and up) were using the wrong scalar values.

## v2.0.0

**Breaking changes**
- The `Measure.dimension` and `Measure.dimensionless` functions now require a unit system as their first parameter. The `Measure.dimension` function can no longer arbitrarily produce new dimensions. To add new dimensions, create a new `UnitSystem`.
- Changed the way in which unit exponents are represented. Exponents are now numbers instead of strings and units contain every dimension in their unit system even if the exponent is zero.
- Removed the ability to arbitrarily perform exponentiation on measures. The `measure.toThe` and `Measure.pow` functions have been removed. 
- Removed the ability to perform roots of measures. The `Measure.sqrt` and `Measure.cbrt` functions have been removed.

**New features**
- Introduced the concept of a [unit system](unit-systems.html). Unit systems define a fixed set of dimensions and their corresponding base units. Measures of a given unit system are not assignable to measures of other unit systems. Safe units ships with a default implementation of the SI unit system as `SIUnitSystem`.
- Removed the limitations on exponents. Previously, exponents of dimensions had to be between -5 and +5. Now the limit on exponents is much larger and should no longer present any issues.
- Added a new `valueIn` method to the `Measure` class. Calling `measure.valueIn(unit)` is syntactic sugar for `measure.div(unit).value`.

**Fixes**
- Fixed an issue where measures could be assigned to measures of different unit types if they contained a superset of the other measure's dimensions. In order to fix this, the concept of unit systems was introduced.
- Fixed incorrect symbols for the `joules` and `watts` units.

## v1.1.1

**Fixes**
- Fixed an issue where `wrapRootFn` would allow non-positive values as the root parameter.

## v1.1.0

**Improvements**
- Added a custom formatter argument that can be passed into the `Measure.in` and `Measure.toString` methods.

## v1.0.0

**Breaking changes**
- Changed all interface names to no longer be I- prefixed.
- Fixed the definition of the `bar` unit.