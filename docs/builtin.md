# Built-in Units

While users can [define their own unit system](unit-systems.html), Safe Units also comes with a large collection of built-in quantities and units based on the SI unit system.

All quantities provided are generic and of the form `type Quantity<N = number>` so all quantity types will default to using `number` as the numeric type but may be passed another numeric type.

## Dimensions

The built-in units include the standard set of SI base dimension and corresponding units:

* `Length` / `meters` (m)
* `Mass` / `kilograms` (kg)
* `Time` / `seconds` (s)
* `ElectricCurrent` / `amperes` (A)
* `Temperature` / `kelvin` (K)
* `AmountOfSubstance` / `moles` (mol)
* `LuminousIntensity` / `candelas` (cd)

In addition, several extra dimensions are defined:

* `PlaneAngle` / `radians` (rd)
* `SolidAngle` / `steradians` (sr)
* `Memory` / `bits` (b)

While plane and solid angles are defined as dimensionless in the SI specification, they are defined here in case users want to be more rigorous with their angles. If not, then these can be safely ignored.

### Generic Base Units

The base units are only provided for `number` measures, but users can create the base units for a given measure type through:

```example
builtinBaseUnits.ts
```

These versions of `meters`, `kilograms`, etc. will all operate on measures whose numeric types are `BigNumber`.

## Derived Units

The following is a list of the provided quantities and measures given by the library. Units are grouped by their type (also referred to as a quantity). Some quanties do not have a corresponding unit. US customary units and imperial units are placed into `US` and `Imperial` namespaces respectively to avoid name clashes.

- `Length` - m
    - `meters` (m) _[base unit]_
    - `inches` (in)
    - `thous` (th)
    - `feet` (ft)
    - `yards` (yd)
    - `chains` (ch)
    - `furlongs` (fur)
    - `miles` (mi)
    - `leagues` (lea)
    - `fathoms` (ftm)
    - `cables` (cable)
    - `nauticalMiles` (nmi)
    - `links` (li)
    - `rods` (rd)
    - `angstroms` (Å)
    - `US.points` (p)
    - `US.picas` (pica)
- `Mass` - kg
    - `kilograms` (kg) _[base unit]_
    - `grams` (g)
    - `pounds` (lb)
    - `grains` (gr)
    - `ounces` (oz)
    - `carats` (ct)
    - `Imperial.drachms` (dr)
    - `Imperial.stone` (st)
    - `Imperial.quarters` (qtr)
    - `Imperial.hundredweights` (cwd)
    - `Imperial.tons` (t)
    - `US.drams` (dr)
    - `US.pennyweights` (dwt)
    - `US.hundredweights` (cwd)
    - `US.tons` (ton)
- `Time` - s
    - `seconds` (s) _[base unit]_
    - `minutes` (min)
    - `hours` (hr)
    - `days` (d)
- `ElectricCurrent` - A
    - `amperes` (A) _[base unit]_
- `Temperature` - K
    - `kelvin` (K) _[base unit]_
- `AmountOfSubstance` - mol
    - `moles` (mol) _[base unit]_
- `LuminousIntesity` - cd
    - `candelas` (cd) _[base unit]_
- `PlaneAngle` - rad
    - `radians` (rad) _[base unit]_
    - `piRadians` (pi rad)
    - `tauRadians` (tau rad)
    - `arcSeconds` (arcsec)
    - `arcMinutes` (arcmin)
    - `degrees` (deg)
- `SolidAngle` - sr
    - `steradians` (sr) _[base unit]_
- `Memory` - b
    - `bits` (b) _[base unit]_
    - `bytes` (B)
- `Frequency` - 1 / s
    - `hertz` (Hz)
- `FrequencyDrift` - 1 / s²
- `FuelEfficiency` - 1 / m²
- `Wavenumber` - 1 / m
- `Area` - m²
    - `perches` (perch)
    - `roods` (rood)
    - `acres` (acre)
    - `ares` (a)
    - `hectares` (ha)
- `Volume` - m³
    - `liters` (L)
    - `Imperial.fluidOunces` (fl oz);
    - `Imperial.gills` (gi)
    - `Imperial.pints` (pt)
    - `Imperial.quarts` (qt)
    - `Imperial.gallons` (gal)
    - `US.minims` (min)
    - `US.fluidDrams` (fl dr)
    - `US.teaspoons` (tsp)
    - `US.tablespoons` (Tbsp)
    - `US.fluidOunces` (fl oz)
    - `US.shots` (jig)
    - `US.gills` (gi)
    - `US.cups` (cp)
    - `US.pints` (pt)
    - `US.quarts` (qt)
    - `US.gallons` (gal)
    - `US.barrels` (liq bbl)
    - `US.oilBarrels` (bbl)
    - `US.hogsheads` (hogshead)
    - `US.dryPints` (dry pt)
    - `US.dryQuarts` (dry qt)
    - `US.dryGallons` (dry gal)
    - `US.pecks` (pk)
    - `US.bushels` (bu)
    - `US.dryBarrels` (dry bbl)
- `Absement` - m ⋅ s
- `Velocity` - m / s
    - `speedOfLight` (C)
- `Acceleration` - m / s²
- `Jerk` - m / s³
- `Jounce` - m / s⁴
- `Crackle` - m / s⁵
- `Pop` - m / s⁶
- `VolumetricFlow` - m³ / s
- `MassFlowRate` - kg / s
- `LinearDensity` - kg / m
- `AreaDensity` - kg / m²
- `VolumeDensity` - kg / m³
- `Force` - kg ⋅ m / s²
    - `newtons` (N)
- `Yank` - km ⋅ m / s³
- `Pressure` - kg / (m ⋅ s²)
    - `pascals` (Pa)
    - `bars` (bar)
    - `atmospheres` (atm)
    - `torrs` (Torr)
- `Compressibility` - m ⋅ s² / kg
- `DynamicViscosity` - kg / (m ⋅ s)
- `SurfaceTension` - kg / s²
- `Momentum` - kg ⋅ m / s
- `MomentOfInertia` - kg ⋅ m²
- `Energy` - kg ⋅ m² / s²
    - `joules` (J)
- `Power` - kg ⋅ m² / s³
    - `watts` (W)
- `PowerDensity` - kg / (m ⋅ s³)
- `Voltage` - kg ⋅ m² / (s³ ⋅ A)
    - `volts` (V)
- `ElectricCharge` - s ⋅ A
    - `coulombs` (C)
- `ElectricChargeDensity` - s ⋅ A / m³
- `ElectricCurrentDensity` - A / m²
- `ElectricDisplacement` - s ⋅ A / m²
- `EletricFieldStrength` - kg ⋅ m / (s³ ⋅ A)
- `ElectricalCapacitance` - s⁴ ⋅ A² / (kg ⋅ m²)
    - `farads` (F)
- `ElectricalConductance` - s³ ⋅ A / (kg ⋅ m²)
    - `siemens` (S)
- `ElectricalConductivity` - s³ ⋅ A² / (kg ⋅ m³)
- `ElectricalResistance` - kg ⋅ m² / (s³ ⋅ A²)
    - `ohms` (Ω)
- `ElectricalResistivity` - kg ⋅ m³ / (s³ ⋅ A²)
- `ElectricalInductance` - kg ⋅ m² / (s² ⋅ A²)
    - `henrys` (H)
- `LinearChargeDensity` - s ⋅ A / m
- `Permittivity` - s⁴ ⋅ A² / (kg ⋅ m³)
- `MagneticFlux` - kg ⋅ m² / (s² ⋅ A)
    - `webers` (Wb)
- `MagneticFluxDensity` - kg / (s² ⋅ A)
    - `teslas` (T)
- `MagneticPermeability` - kg ⋅ m / (s² ⋅ A²) 
- `Magnetization` - A / m
- `MagneticReluctance` - s² ⋅ A² / (kg ⋅ m²)
- `MagneticMoment` - kg ⋅ m³ / (s² ⋅ A)
- `MagneticRigidity` - kg ⋅ m / (s² ⋅ A)
- `MagneticDipoleMoment` - m² ⋅ A
- `MagneticSusceptibility` - s² ⋅ A² / (kg ⋅ m)
- `Irradiance` - kg / s³
- `Entropy` - kg ⋅ m / (s² ⋅ K)
- `SpecificHeat` - m² / (s² ⋅ K)
- `SpecificVolume` - m³ / kg
- `ThermalConductivity` - kg ⋅ m / (s³ ⋅ K)
- `ThermalResistance` - s³ ⋅ K / (kg ⋅ m²)
- `ThermalExpansionCoefficient` - 1 / K
- `ThermalGradient` - K / m
- `MolarEntropy` - kg ⋅ m² / (s² ⋅ K ⋅ mol)
- `MolarEnergy` - kg ⋅ m² / (s² ⋅ mol)
- `Molarity` - mol / m³
- `MolarVolume` - m³ / mol
- `Molality` - mol / kg
- `MolarMass` - kg / mol
- `MolarConductivity` - s³ ⋅ A² / (kg ⋅ mol)
- `CatalyticActivity` -  mol / s
    - `katals` (kat)
- `CatalyticEfficiency` - m³ / (s ⋅ mol)
- `ReactionRate` - mol / (m³ ⋅ s)
- `RadiationDose` - m² / s²
    - `sieverts` (Sv)
- `RadiationDoseRate` - m² / s³
- `ElectronMobility` - s² ⋅ A / kg
- `AngularMomentum` - kg ⋅ m² / s
- `SpecificAngularMomentum` - m² / s
- `Luminance` - cd / m²
- `LuminousFlux` - cd ⋅ sr
    - `lumens` (lm)
- `Illuminance` - cd ⋅ sr / m²
    - `luxes` (lx)
- `LuminousEnergy` - s ⋅ cd ⋅ sr
- `LuminousExposure` - s ⋅ cd ⋅ sr / m²
- `LuminousEfficiency` - s³ ⋅ cd ⋅ sr / (kg ⋅ m²)
- `RadiantIntensity` - kg ⋅ m² / (s³ ⋅ sr)
- `SpectralIntensity` - kg ⋅ m / (s³ ⋅ sr)
- `Radiance` - kg / (s³ ⋅ sr)
- `SpectralRadiance` - kg / (m ⋅ s³ ⋅ sr)
- `AngularVelocity` - rad / s
- `AngularAcceleration` - rad / s²

## Prefixes

You may notice that some commonly used units, such as kilometers, are absent from the list above. Instead of creating all the different combinations of prefix and unit pairs, Safe Units instead provides prefix functions. These are functions which operate on measures to construct a new measure with a corresponding symbol. For example:

```example
builtinPrefixes.ts
```

Prefix functions are provided for all of the [SI prefixes](https://en.wikipedia.org/wiki/Metric_prefix) and all of the [binary prefixes](https://en.wikipedia.org/wiki/Binary_prefix) for memory.

## Trigonometry

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
