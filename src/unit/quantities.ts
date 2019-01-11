import { GenericMeasure, LiftMeasure } from "../measure/genericMeasure";
import { Measure } from "../measure/numberMeasure";
import * as Base from "./base";

// Dimensionless

/** A measure without any unit */
export type Dimensionless<N = number> = LiftMeasure<typeof Dimensionless, N>;
const Dimensionless: GenericMeasure<number, {}> = Measure.dimensionless(1);

// Base units

/** meters */
export type Length<N = number> = LiftMeasure<typeof Base.meters, N>;
const Length: Length = Base.meters;

/** kilograms */
export type Mass<N = number> = LiftMeasure<typeof Base.kilograms, N>;
const Mass: Mass = Base.kilograms;

/** seconds */
export type Time<N = number> = LiftMeasure<typeof Base.seconds, N>;
const Time: Time = Base.seconds;

/** Amperes */
export type ElectricCurrent<N = number> = LiftMeasure<typeof Base.amperes, N>;
const ElectricCurrent: ElectricCurrent = Base.amperes;

/** Kelvin */
export type Temperature<N = number> = LiftMeasure<typeof Base.kelvin, N>;
const Temperature: Temperature = Base.kelvin;

/** moles */
export type AmountOfSubstance<N = number> = LiftMeasure<typeof Base.moles, N>;
const AmountOfSubstance: AmountOfSubstance = Base.moles;

/** candelas */
export type LuminousIntensity<N = number> = LiftMeasure<typeof Base.candelas, N>;
const LuminousIntensity: LuminousIntensity = Base.candelas;

/** bits */
export type Memory<N = number> = LiftMeasure<typeof Base.bits, N>;
const Memory: Memory = Base.bits;

// Angular base units

/** radians */
export type PlaneAngle<N = number> = LiftMeasure<typeof Base.radians, N>;
const PlaneAngle: PlaneAngle = Base.radians;

/** steradians */
export type SolidAngle<N = number> = LiftMeasure<typeof Base.steradians, N>;
const SolidAngle: SolidAngle = Base.steradians;

// Derived units

/** 1 / s */
export type Frequency<N = number> = LiftMeasure<typeof Frequency, N>;
const Frequency = Time.inverse();

/** 1 / s^2 */
export type FrequencyDrift<N = number> = LiftMeasure<typeof FrequencyDrift, N>;
const FrequencyDrift = Time.toThe(-2);

/** 1 / m^2 */
export type FuelEfficiency<N = number> = LiftMeasure<typeof FuelEfficiency, N>;
const FuelEfficiency = Length.toThe(-2);

/** 1 / m */
export type Wavenumber<N = number> = LiftMeasure<typeof Wavenumber, N>;
const Wavenumber = Length.inverse();

/** m^2 */
export type Area<N = number> = LiftMeasure<typeof Area, N>;
const Area = Length.squared();

/** m^3 */
export type Volume<N = number> = LiftMeasure<typeof Volume, N>;
const Volume = Length.cubed();

/** m ⋅ s */
export type Absement<N = number> = LiftMeasure<typeof Absement, N>;
const Absement = Length.times(Time);

/** m / s */
export type Velocity<N = number> = LiftMeasure<typeof Velocity, N>;
const Velocity = Length.over(Time);

/** m / s^2 */
export type Acceleration<N = number> = LiftMeasure<typeof Acceleration, N>;
const Acceleration = Velocity.over(Time);

/** m / s^3 */
export type Jerk<N = number> = LiftMeasure<typeof Jerk, N>;
const Jerk = Acceleration.over(Time);

/** m / s^4 */
export type Jounce<N = number> = LiftMeasure<typeof Jounce, N>;
const Jounce = Jerk.over(Time);

/** m / s^5 */
export type Crackle<N = number> = LiftMeasure<typeof Crackle, N>;
const Crackle = Jounce.over(Time);

/** m^3 / s */
export type VolumetricFlow<N = number> = LiftMeasure<typeof VolumetricFlow, N>;
const VolumetricFlow = Volume.over(Time);

/** kg / s */
export type MassFlowRate<N = number> = LiftMeasure<typeof MassFlowRate, N>;
const MassFlowRate = Mass.over(Time);

/** kg / m */
export type LinearDensity<N = number> = LiftMeasure<typeof LinearDensity, N>;
const LinearDensity = Mass.over(Length);

/** kg / m^2  */
export type AreaDensity<N = number> = LiftMeasure<typeof AreaDensity, N>;
const AreaDensity = Mass.over(Area);

/** kg / m^3 */
export type VolumeDensity<N = number> = LiftMeasure<typeof VolumeDensity, N>;
const VolumeDensity = Mass.over(Volume);

/** kg ⋅ m / s^2 */
export type Force<N = number> = LiftMeasure<typeof Force, N>;
const Force = Mass.times(Acceleration);

/** km ⋅ m / s^3 */
export type Yank<N = number> = LiftMeasure<typeof Yank, N>;
const Yank = Force.over(Time);

/** kg / (m ⋅ s^2)  */
export type Pressure<N = number> = LiftMeasure<typeof Pressure, N>;
const Pressure = Force.over(Area);

/** m ⋅ s^2 / kg */
export type Compressibility<N = number> = LiftMeasure<typeof Compressibility, N>;
const Compressibility = Pressure.inverse();

/** kg / (m ⋅ s) */
export type DynamicViscosity<N = number> = LiftMeasure<typeof DynamicViscosity, N>;
const DynamicViscosity = Pressure.times(Time);

/** kg / s^2 */
export type SurfaceTension<N = number> = LiftMeasure<typeof SurfaceTension, N>;
const SurfaceTension = Force.over(Length);

/** kg ⋅ m / s  */
export type Momentum<N = number> = LiftMeasure<typeof Momentum, N>;
const Momentum = Force.times(Time);

/** kg ⋅ m^2 */
export type MomentOfInertia<N = number> = LiftMeasure<typeof MomentOfInertia, N>;
const MomentOfInertia = Mass.times(Area);

/** kg ⋅ m^2 / s^2 */
export type Energy<N = number> = LiftMeasure<typeof Energy, N>;
const Energy = Force.times(Length);

/** kg ⋅ m^2 / s^3 */
export type Power<N = number> = LiftMeasure<typeof Power, N>;
const Power = Energy.over(Time);

/** kg / (m ⋅ s^3) */
export type PowerDensity<N = number> = LiftMeasure<typeof PowerDensity, N>;
const PowerDensity = Power.over(Volume);

/** kg ⋅ m^2 / (s^3 ⋅ A) */
export type Voltage<N = number> = LiftMeasure<typeof Voltage, N>;
const Voltage = Power.over(ElectricCurrent);

/** s ⋅ A */
export type ElectricCharge<N = number> = LiftMeasure<typeof ElectricCharge, N>;
const ElectricCharge = ElectricCurrent.times(Time);

/** s ⋅ A / m^3 */
export type ElectricChargeDensity<N = number> = LiftMeasure<typeof ElectricChargeDensity, N>;
const ElectricChargeDensity = ElectricCharge.over(Volume);

/** A / m^2 */
export type ElectricCurrentDensity<N = number> = LiftMeasure<typeof ElectricCurrentDensity, N>;
const ElectricCurrentDensity = ElectricCurrent.over(Area);

/** s ⋅ A / m^2 */
export type ElectricDisplacement<N = number> = LiftMeasure<typeof ElectricDisplacement, N>;
const ElectricDisplacement = ElectricCharge.over(Area);

/** kg ⋅ m / (s^3 ⋅ A) */
export type EletricFieldStrength<N = number> = LiftMeasure<typeof EletricFieldStrength, N>;
const EletricFieldStrength = Voltage.over(Length);

/** s^4 ⋅ A^2 / (kg ⋅ m^2) */
export type ElectricalCapacitance<N = number> = LiftMeasure<typeof ElectricalCapacitance, N>;
const ElectricalCapacitance = ElectricCharge.over(Voltage);

/** s^3 ⋅ A / (kg ⋅ m^2) */
export type ElectricalConductance<N = number> = LiftMeasure<typeof ElectricalConductance, N>;
const ElectricalConductance = ElectricCurrent.over(Voltage);

/** s^3 ⋅ A^2 / (kg ⋅ m^3) */
export type ElectricalConductivity<N = number> = LiftMeasure<typeof ElectricalConductivity, N>;
const ElectricalConductivity = ElectricalConductance.over(Length);

/** kg ⋅ m^2 / (s^3 ⋅ A^2) */
export type ElectricalResistance<N = number> = LiftMeasure<typeof ElectricalResistance, N>;
const ElectricalResistance = Voltage.over(ElectricCurrent);

/** kg ⋅ m^3 / (s^3 ⋅ A^2) */
export type ElectricalResistivity<N = number> = LiftMeasure<typeof ElectricalResistivity, N>;
const ElectricalResistivity = ElectricalResistance.times(Length);

/** kg ⋅ m^2 / (s^2 ⋅ A^2) */
export type ElectricalInductance<N = number> = LiftMeasure<typeof ElectricalInductance, N>;
const ElectricalInductance = ElectricalResistance.times(Time);

/** s ⋅ A / m */
export type LinearChargeDensity<N = number> = LiftMeasure<typeof LinearChargeDensity, N>;
const LinearChargeDensity = ElectricCharge.over(Length);

/** s^4 ⋅ A^2 / (kg ⋅ m^3) */
export type Permittivity<N = number> = LiftMeasure<typeof Permittivity, N>;
const Permittivity = ElectricalCapacitance.over(Length);

/** kg ⋅ m^2 / (s^2 ⋅ A) */
export type MagneticFlux<N = number> = LiftMeasure<typeof MagneticFlux, N>;
const MagneticFlux = Energy.over(ElectricCurrent);

/** kg / (s^2 ⋅ A) */
export type MagneticFluxDensity<N = number> = LiftMeasure<typeof MagneticFluxDensity, N>;
const MagneticFluxDensity = Voltage.times(Time).over(Area);

/** kg ⋅ m / (s^2 ⋅ A^2)  */
export type MagneticPermeability<N = number> = LiftMeasure<typeof MagneticPermeability, N>;
const MagneticPermeability = ElectricalInductance.over(Length);

/** A / m */
export type Magnetization<N = number> = LiftMeasure<typeof Magnetization, N>;
const Magnetization = ElectricCurrent.over(Length);

/** s^2 ⋅ A^2 / (kg ⋅ m^2) */
export type MagneticReluctance<N = number> = LiftMeasure<typeof MagneticReluctance, N>;
const MagneticReluctance = ElectricalInductance.inverse();

/** kg ⋅ m^3 / (s^2 ⋅ A) */
export type MagneticMoment<N = number> = LiftMeasure<typeof MagneticMoment, N>;
const MagneticMoment = MagneticFlux.times(Length);

/** kg ⋅ m / (s^2 ⋅ A) */
export type MagneticRigidity<N = number> = LiftMeasure<typeof MagneticRigidity, N>;
const MagneticRigidity = MagneticFluxDensity.times(Length);

/** m^2 ⋅ A */
export type MagneticDipoleMoment<N = number> = LiftMeasure<typeof MagneticDipoleMoment, N>;
const MagneticDipoleMoment = Energy.over(MagneticFluxDensity);

/** s^2 ⋅ A^2 / (kg ⋅ m) */
export type MagneticSusceptibility<N = number> = LiftMeasure<typeof MagneticSusceptibility, N>;
const MagneticSusceptibility = Length.over(ElectricalInductance);

/** kg / s^3  */
export type Irradiance<N = number> = LiftMeasure<typeof Irradiance, N>;
const Irradiance = Power.over(Area);

/** kg ⋅ m / (s^2 ⋅ K)  */
export type Entropy<N = number> = LiftMeasure<typeof Entropy, N>;
const Entropy = Energy.over(Temperature);

/** m^2 / (s^2 ⋅ K) */
export type SpecificHeat<N = number> = LiftMeasure<typeof SpecificHeat, N>;
const SpecificHeat = Energy.over(Mass.times(Temperature));

/** m^3 / kg  */
export type SpecificVolume<N = number> = LiftMeasure<typeof SpecificVolume, N>;
const SpecificVolume = Volume.over(Mass);

/** kg ⋅ m / (s^3 ⋅ K)  */
export type ThermalConductivity<N = number> = LiftMeasure<typeof ThermalConductivity, N>;
const ThermalConductivity = Power.over(Length.times(Temperature));

/** s^3 ⋅ K / (kg ⋅ m^2) */
export type ThermalResistance<N = number> = LiftMeasure<typeof ThermalResistance, N>;
const ThermalResistance = Temperature.over(Power);

/** 1 / K */
export type ThermalExpansionCoefficient<N = number> = LiftMeasure<typeof ThermalExpansionCoefficient, N>;
const ThermalExpansionCoefficient = Temperature.inverse();

/** K / m */
export type ThermalGradient<N = number> = LiftMeasure<typeof ThermalGradient, N>;
const ThermalGradient = Temperature.over(Length);

/** kg ⋅ m^2 / (s^2 ⋅ K ⋅ mol) */
export type MolarEntropy<N = number> = LiftMeasure<typeof MolarEntropy, N>;
const MolarEntropy = Entropy.over(AmountOfSubstance);

/** kg ⋅ m^2 / (s^2 ⋅ mol) */
export type MolarEnergy<N = number> = LiftMeasure<typeof MolarEnergy, N>;
const MolarEnergy = Energy.over(AmountOfSubstance);

/** mol / m^3 */
export type Molarity<N = number> = LiftMeasure<typeof Molarity, N>;
const Molarity = AmountOfSubstance.over(Volume);

/** m^3 / mol */
export type MolarVolume<N = number> = LiftMeasure<typeof MolarVolume, N>;
const MolarVolume = Volume.over(AmountOfSubstance);

/** mol / kg */
export type Molality<N = number> = LiftMeasure<typeof Molality, N>;
const Molality = AmountOfSubstance.over(Mass);

/** kg / mol  */
export type MolarMass<N = number> = LiftMeasure<typeof MolarMass, N>;
const MolarMass = Mass.over(AmountOfSubstance);

/** s^3 ⋅ A^2 / (kg ⋅ mol) */
export type MolarConductivity<N = number> = LiftMeasure<typeof MolarConductivity, N>;
const MolarConductivity = ElectricalConductance.times(Area).over(AmountOfSubstance);

/** mol / s */
export type CatalyticActivity<N = number> = LiftMeasure<typeof CatalyticActivity, N>;
const CatalyticActivity = AmountOfSubstance.over(Time);

/** m^3 / (s ⋅ mol) */
export type CatalyticEfficiency<N = number> = LiftMeasure<typeof CatalyticEfficiency, N>;
const CatalyticEfficiency = Volume.over(AmountOfSubstance.times(Time));

/** mol / (m^3 ⋅ s)  */
export type ReactionRate<N = number> = LiftMeasure<typeof ReactionRate, N>;
const ReactionRate = CatalyticActivity.over(Volume);

/** m^2 / s^2 */
export type RadiationDose<N = number> = LiftMeasure<typeof RadiationDose, N>;
const RadiationDose = Energy.over(Mass);

/** m^2 / s^3 */
export type RadiationDoseRate<N = number> = LiftMeasure<typeof RadiationDoseRate, N>;
const RadiationDoseRate = RadiationDose.over(Time);

/** s^2 ⋅ A / kg  */
export type ElectronMobility<N = number> = LiftMeasure<typeof ElectronMobility, N>;
const ElectronMobility = Area.over(Voltage.times(Time));

/** kg ⋅ m^2 / s */
export type AngularMomentum<N = number> = LiftMeasure<typeof AngularMomentum, N>;
const AngularMomentum = Force.times(Length).times(Time);

/** m^2 /s */
export type SpecificAngularMomentum<N = number> = LiftMeasure<typeof SpecificAngularMomentum, N>;
const SpecificAngularMomentum = AngularMomentum.over(Mass);

/** cd / m^2 */
export type Luminance<N = number> = LiftMeasure<typeof Luminance, N>;
const Luminance = LuminousIntensity.over(Area);

// Angular derived units

/** cd ⋅ sr */
export type LuminousFlux<N = number> = LiftMeasure<typeof LuminousFlux, N>;
const LuminousFlux = LuminousIntensity.times(SolidAngle);

/** cd ⋅ sr / m^2 */
export type Illuminance<N = number> = LiftMeasure<typeof Illuminance, N>;
const Illuminance = LuminousFlux.over(Area);

/** s ⋅ cd ⋅ sr */
export type LuminousEnergy<N = number> = LiftMeasure<typeof LuminousEnergy, N>;
const LuminousEnergy = LuminousFlux.times(Time);

/** s ⋅ cd ⋅ sr / m^2 */
export type LuminousExposure<N = number> = LiftMeasure<typeof LuminousExposure, N>;
const LuminousExposure = Illuminance.times(Time);

/** s^3 ⋅ cd ⋅ sr / (kg ⋅ m^2) */
export type LuminousEfficiency<N = number> = LiftMeasure<typeof LuminousEfficiency, N>;
const LuminousEfficiency = LuminousFlux.over(Power);

/** kg ⋅ m^2 / (s^3 ⋅ sr) */
export type RadiantIntensity<N = number> = LiftMeasure<typeof RadiantIntensity, N>;
const RadiantIntensity = Power.over(SolidAngle);

/** kg ⋅ m / (s^3 ⋅ sr)  */
export type SpectralIntensity<N = number> = LiftMeasure<typeof SpectralIntensity, N>;
const SpectralIntensity = RadiantIntensity.over(Length);

/** kg / (s^3 ⋅ sr) */
export type Radiance<N = number> = LiftMeasure<typeof Radiance, N>;
const Radiance = RadiantIntensity.over(Area);

/** kg / (m ⋅ s^3 ⋅ sr) */
export type SpectralRadiance<N = number> = LiftMeasure<typeof SpectralRadiance, N>;
const SpectralRadiance = RadiantIntensity.over(Volume);

/** rad / s */
export type AngularVelocity<N = number> = LiftMeasure<typeof AngularVelocity, N>;
const AngularVelocity = PlaneAngle.over(Time);

/** rad / s^2 */
export type AngularAcceleration<N = number> = LiftMeasure<typeof AngularAcceleration, N>;
const AngularAcceleration = AngularVelocity.over(Time);
