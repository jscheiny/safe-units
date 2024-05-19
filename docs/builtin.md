# Built-in Units

While users can [define their own unit system](unit-systems.html), Safe Units also comes with a large collection of built-in quantities and units based on the SI unit system.

All quantities provided are generic and of the form `type Quantity<N = number>` so all quantity types will default to using `number` as the numeric type but may be passed another numeric type.

## Base Units

The built-in units include the standard set of SI base dimension and corresponding units:

* `Length` / `meters`
* `Mass` / `kilograms`
* `Time` / `seconds`
* `ElectricCurrent` / `amperes`
* `Temperature` / `kelvin`
* `AmountOfSubstance` / `moles`
* `LuminousIntensity` / `candelas`

In addition, several extra dimensions are defined:

* `PlaneAngle` / `radians`
* `SolidAngle` / `steradians`
* `Memory` / `bits`

While plane and solid angles are defined as dimensionless in the SI specification, they are defined here in case users want to be more rigorous with their angles. If not, then these can be safely ignored.

## Generic Base Units

The base units are only provided for `number` measures, but users can create the base units for a given measure type through:

```example
builtinBaseUnits.ts
```

These versions of `meters`, `kilograms`, etc. will all operate on measures whose numeric types are `BigNumber`.

## Provided Units

A large number of built in quantities (e.g. distance, velocity, force and magnetic flux density) are provided. See [here](https://github.com/jscheiny/safe-units/blob/master/src/unit/quantities.ts) for a full list.

Many units are provided from the SI, Imperial and U.S. customary unit systems. See [here](https://github.com/jscheiny/safe-units/tree/master/src/unit) for all of the units.

Prefix functions are provided for both standard [SI prefixes](https://github.com/jscheiny/safe-units/blob/master/src/unit/metric.ts) and for [memory prefixes](https://github.com/jscheiny/safe-units/blob/master/src/unit/memory.ts).

Trigonometric functions are provided in the `Trig` namespace for converting between plane angles and dimensionless values, the signatures are as follows:

```ts
namespace Trig {
    function cos(x: PlaneAngle): Dimensionless;
    function sin(x: PlaneAngle): Dimensionless;
    function tan(x: PlaneAngle): Dimensionless;
    function acos(x: Dimensionless): PlaneAngle;
    function asin(x: Dimensionless): PlaneAngle;
    function atan(x: Dimensionless): PlaneAngle;
    function atan2(y: Length, x: Length): PlaneAngle;
}
```
