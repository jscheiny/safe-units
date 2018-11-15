import { GenericMeasure } from "../measure/genericMeasure";
import { Measure } from "../measure/numberMeasure";
import * as Base from "../unit/base";

// Dimensionless

/** A measure without any unit */
// HACKHACK: Explicitly type this so we can import GenericMeasure and avoid absolute paths in the generated typings.
export const Dimensionless: GenericMeasure<number, {}> = Measure.dimensionless(1);
export type Dimensionless = typeof Dimensionless;

// Base units

/** meters */
export type Length = typeof Base.meters;
export const Length: Length = Base.meters;

/** kilograms */
export type Mass = typeof Base.kilograms;
export const Mass: Mass = Base.kilograms;

/** seconds */
export type Time = typeof Base.seconds;
export const Time: Time = Base.seconds;

/** Amperes */
export type ElectricCurrent = typeof Base.amperes;
export const ElectricCurrent: ElectricCurrent = Base.amperes;

/** Kelvin */
export type Temperature = typeof Base.kelvin;
export const Temperature: Temperature = Base.kelvin;

/** moles */
export type AmountOfSubstance = typeof Base.moles;
export const AmountOfSubstance: AmountOfSubstance = Base.moles;

/** candelas */
export type LuminousIntensity = typeof Base.candelas;
export const LuminousIntensity: LuminousIntensity = Base.candelas;

/** bits */
export type Memory = typeof Base.bits;
export const Memory: Memory = Base.bits;

// Angular base units

/** radians */
export type PlaneAngle = typeof Base.radians;
export const PlaneAngle: PlaneAngle = Base.radians;

/** steradians */
export type SolidAngle = typeof Base.steradians;
export const SolidAngle: SolidAngle = Base.steradians;

// Derived units

/** 1 / s */
export const Frequency = Time.inverse();
export type Frequency = typeof Frequency;

/** 1 / s^2 */
export const FrequencyDrift = Time.inverse().squared();
export type FrequencyDrift = typeof FrequencyDrift;

/** 1 / m^2 */
export const FuelEfficiency = Length.inverse().squared();
export type FuelEfficiency = typeof FuelEfficiency;

/** 1 / m */
export const Wavenumber = Length.inverse();
export type Wavenumber = typeof Wavenumber;

/** m^2 */
export const Area = Length.squared();
export type Area = typeof Area;

/** m^3 */
export const Volume = Length.cubed();
export type Volume = typeof Volume;

/** m ⋅ s */
export const Absement = Length.times(Time);
export type Absement = typeof Absement;

/** m / s */
export const Velocity = Length.over(Time);
export type Velocity = typeof Velocity;

/** m / s^2 */
export const Acceleration = Velocity.over(Time);
export type Acceleration = typeof Acceleration;

/** m / s^3 */
export const Jerk = Acceleration.over(Time);
export type Jerk = typeof Jerk;

/** m / s^4 */
export const Jounce = Jerk.over(Time);
export type Jounce = typeof Jounce;

/** m / s^5 */
export const Crackle = Jounce.over(Time);
export type Crackle = typeof Crackle;

/** m^3 / s */
export const VolumetricFlow = Volume.over(Time);
export type VolumetricFlow = typeof VolumetricFlow;

/** kg / s */
export const MassFlowRate = Mass.over(Time);
export type MassFlowRate = typeof MassFlowRate;

/** kg / m */
export const LinearDensity = Mass.over(Length);
export type LinearDensity = typeof LinearDensity;

/** kg / m^2  */
export const AreaDensity = Mass.over(Area);
export type AreaDensity = typeof AreaDensity;

/** kg / m^3 */
export const VolumeDensity = Mass.over(Volume);
export type VolumeDensity = typeof VolumeDensity;

/** kg ⋅ m / s^2 */
export const Force = Mass.times(Acceleration);
export type Force = typeof Force;

/** km ⋅ m / s^3 */
export const Yank = Force.over(Time);
export type Yank = typeof Yank;

/** kg / (m ⋅ s^2)  */
export const Pressure = Force.over(Area);
export type Pressure = typeof Pressure;

/** m ⋅ s^2 / kg */
export const Compressibility = Pressure.inverse();
export type Compressibility = typeof Compressibility;

/** kg / (m ⋅ s) */
export const DynamicViscosity = Pressure.times(Time);
export type DynamicViscosity = typeof DynamicViscosity;

/** kg / s^2 */
export const SurfaceTension = Force.over(Length);
export type SurfaceTension = typeof SurfaceTension;

/** kg ⋅ m / s  */
export const Momentum = Force.times(Time);
export type Momentum = typeof Momentum;

/** kg ⋅ m^2 */
export const MomentOfInertia = Mass.times(Area);
export type MomentOfInertia = typeof MomentOfInertia;

/** kg ⋅ m^2 / s^2 */
export const Energy = Force.times(Length);
export type Energy = typeof Energy;

/** kg ⋅ m^2 / s^3 */
export const Power = Energy.over(Time);
export type Power = typeof Power;

/** kg / (m ⋅ s^3) */
export const PowerDensity = Power.over(Volume);
export type PowerDensity = typeof PowerDensity;

/** kg ⋅ m^2 / (s^3 ⋅ A) */
export const Voltage = Power.over(ElectricCurrent);
export type Voltage = typeof Voltage;

/** s ⋅ A */
export const ElectricCharge = ElectricCurrent.times(Time);
export type ElectricCharge = typeof ElectricCharge;

/** s ⋅ A / m^3 */
export const ElectricChargeDensity = ElectricCharge.over(Volume);
export type ElectricChargeDensity = typeof ElectricChargeDensity;

/** A / m^2 */
export const ElectricCurrentDensity = ElectricCurrent.over(Area);
export type ElectricCurrentDensity = typeof ElectricCurrentDensity;

/** s ⋅ A / m^2 */
export const ElectricDisplacement = ElectricCharge.over(Area);
export type ElectricDisplacement = typeof ElectricDisplacement;

/** kg ⋅ m / (s^3 ⋅ A) */
export const EletricFieldStrength = Voltage.over(Length);
export type EletricFieldStrength = typeof EletricFieldStrength;

/** s^4 ⋅ A^2 / (kg ⋅ m^2) */
export const ElectricalCapacitance = ElectricCharge.over(Voltage);
export type ElectricalCapacitance = typeof ElectricalCapacitance;

/** s^3 ⋅ A / (kg ⋅ m^2) */
export const ElectricalConductance = ElectricCurrent.over(Voltage);
export type ElectricalConductance = typeof ElectricalConductance;

/** s^3 ⋅ A^2 / (kg ⋅ m^3) */
export const ElectricalConductivity = ElectricalConductance.over(Length);
export type ElectricalConductivity = typeof ElectricalConductivity;

/** kg ⋅ m^2 / (s^3 ⋅ A^2) */
export const ElectricalResistance = Voltage.over(ElectricCurrent);
export type ElectricalResistance = typeof ElectricalResistance;

/** kg ⋅ m^3 / (s^3 ⋅ A^2) */
export const ElectricalResistivity = ElectricalResistance.times(Length);
export type ElectricalResistivity = typeof ElectricalResistivity;

/** kg ⋅ m^2 / (s^2 ⋅ A^2) */
export const ElectricalInductance = ElectricalResistance.times(Time);
export type ElectricalInductance = typeof ElectricalInductance;

/** s ⋅ A / m */
export const LinearChargeDensity = ElectricCharge.over(Length);
export type LinearChargeDensity = typeof LinearChargeDensity;

/** s^4 ⋅ A^2 / (kg ⋅ m^3) */
export const Permittivity = ElectricalCapacitance.over(Length);
export type Permittivity = typeof Permittivity;

/** kg ⋅ m^2 / (s^2 ⋅ A) */
export const MagneticFlux = Energy.over(ElectricCurrent);
export type MagneticFlux = typeof MagneticFlux;

/** kg / (s^2 ⋅ A) */
export const MagneticFluxDensity = Voltage.times(Time).over(Length.squared());
export type MagneticFluxDensity = typeof MagneticFluxDensity;

/** kg ⋅ m / (s^2 ⋅ A^2)  */
export const MagneticPermeability = ElectricalInductance.over(Length);
export type MagneticPermeability = typeof MagneticPermeability;

/** A / m */
export const Magnetization = ElectricCurrent.over(Length);
export type Magnetization = typeof Magnetization;

/** s^2 ⋅ A^2 / (kg ⋅ m^2) */
export const MagneticReluctance = ElectricalInductance.inverse();
export type MagneticReluctance = typeof MagneticReluctance;

/** kg ⋅ m^3 / (s^2 ⋅ A) */
export const MagneticMoment = MagneticFlux.times(Length);
export type MagneticMoment = typeof MagneticMoment;

/** kg ⋅ m / (s^2 ⋅ A) */
export const MagneticRigidity = MagneticFluxDensity.times(Length);
export type MagneticRigidity = typeof MagneticRigidity;

/** m^2 ⋅ A */
export const MagneticDipoleMoment = Energy.over(MagneticFluxDensity);
export type MagneticDipoleMoment = typeof MagneticDipoleMoment;

/** s^2 ⋅ A^2 / (kg ⋅ m) */
export const MagneticSusceptibility = Length.over(ElectricalInductance);
export type MagneticSusceptibility = typeof MagneticSusceptibility;

/** kg / s^3  */
export const Irradiance = Power.over(Area);
export type Irradiance = typeof Irradiance;

/** kg ⋅ m / (s^2 ⋅ K)  */
export const Entropy = Energy.over(Temperature);
export type Entropy = typeof Entropy;

/** m^2 / (s^2 ⋅ K) */
export const SpecificHeat = Energy.over(Mass.times(Temperature));
export type SpecificHeat = typeof SpecificHeat;

/** m^3 / kg  */
export const SpecificVolume = Volume.over(Mass);
export type SpecificVolume = typeof SpecificVolume;

/** kg ⋅ m / (s^3 ⋅ K)  */
export const ThermalConductivity = Power.over(Length.times(Temperature));
export type ThermalConductivity = typeof ThermalConductivity;

/** s^3 ⋅ K / (kg ⋅ m^2) */
export const ThermalResistance = Temperature.over(Power);
export type ThermalResistance = typeof ThermalResistance;

/** 1 / K */
export const ThermalExpansionCoefficient = Temperature.inverse();
export type ThermalExpansionCoefficient = typeof ThermalExpansionCoefficient;

/** K / m */
export const ThermalGradient = Temperature.over(Length);
export type ThermalGradient = typeof ThermalGradient;

/** kg ⋅ m^2 / (s^2 ⋅ K ⋅ mol) */
export const MolarEntropy = Entropy.over(AmountOfSubstance);
export type MolarEntropy = typeof MolarEntropy;

/** kg ⋅ m^2 / (s^2 ⋅ mol) */
export const MolarEnergy = Energy.over(AmountOfSubstance);
export type MolarEnergy = typeof MolarEnergy;

/** mol / m^3 */
export const Molarity = AmountOfSubstance.over(Volume);
export type Molarity = typeof Molarity;

/** m^3 / mol */
export const MolarVolume = Volume.over(AmountOfSubstance);
export type MolarVolume = typeof MolarVolume;

/** mol / kg */
export const Molality = AmountOfSubstance.over(Mass);
export type Molality = typeof Molality;

/** kg / mol  */
export const MolarMass = Mass.over(AmountOfSubstance);
export type MolarMass = typeof MolarMass;

/** s^3 ⋅ A^2 / (kg ⋅ mol) */
export const MolarConductivity = ElectricalConductance.times(Area).over(AmountOfSubstance);
export type MolarConductivity = typeof MolarConductivity;

/** mol / s */
export const CatalyticActivity = AmountOfSubstance.over(Time);
export type CatalyticActivity = typeof CatalyticActivity;

/** m^3 / (s ⋅ mol) */
export const CatalyticEfficiency = Volume.over(AmountOfSubstance.times(Time));
export type CatalyticEfficiency = typeof CatalyticEfficiency;

/** mol / (m^3 ⋅ s)  */
export const ReactionRate = CatalyticActivity.over(Volume);
export type ReactionRate = typeof ReactionRate;

/** m^2 / s^2 */
export const RadiationDose = Energy.over(Mass);
export type RadiationDose = typeof RadiationDose;

/** m^2 / s^3 */
export const RadiationDoseRate = RadiationDose.over(Time);
export type RadiationDoseRate = typeof RadiationDoseRate;

/** s^2 ⋅ A / kg  */
export const ElectronMobility = Area.over(Voltage.times(Time));
export type ElectronMobility = typeof ElectronMobility;

/** kg ⋅ m^2 / s */
export const AngularMomentum = Force.times(Length).times(Time);
export type AngularMomentum = typeof AngularMomentum;

/** m^2 /s */
export const SpecificAngularMomentum = AngularMomentum.over(Mass);
export type SpecificAngularMomentum = typeof SpecificAngularMomentum;

/** cd / m^2 */
export const Luminance = LuminousIntensity.over(Area);
export type Luminance = typeof Luminance;

// Angular derived units

/** cd ⋅ sr */
export const LuminousFlux = LuminousIntensity.times(SolidAngle);
export type LuminousFlux = typeof LuminousFlux;

/** cd ⋅ sr / m^2 */
export const Illuminance = LuminousFlux.over(Area);
export type Illuminance = typeof Illuminance;

/** s ⋅ cd ⋅ sr */
export const LuminousEnergy = LuminousFlux.times(Time);
export type LuminousEnergy = typeof LuminousEnergy;

/** s ⋅ cd ⋅ sr / m^2 */
export const LuminousExposure = Illuminance.times(Time);
export type LuminousExposure = typeof LuminousExposure;

/** s^3 ⋅ cd ⋅ sr / (kg ⋅ m^2) */
export const LuminousEfficiency = LuminousFlux.over(Power);
export type LuminousEfficiency = typeof LuminousEfficiency;

/** kg ⋅ m^2 / (s^3 ⋅ sr) */
export const RadiantIntensity = Power.over(SolidAngle);
export type RadiantIntensity = typeof RadiantIntensity;

/** kg ⋅ m / (s^3 ⋅ sr)  */
export const SpectralIntensity = RadiantIntensity.over(Length);
export type SpectralIntensity = typeof SpectralIntensity;

/** kg / (s^3 ⋅ sr) */
export const Radiance = RadiantIntensity.over(Area);
export type Radiance = typeof Radiance;

/** kg / (m ⋅ s^3 ⋅ sr) */
export const SpectralRadiance = RadiantIntensity.over(Volume);
export type SpectralRadiance = typeof SpectralRadiance;

/** rad / s */
export const AngularVelocity = PlaneAngle.over(Time);
export type AngularVelocity = typeof AngularVelocity;

/** rad / s^2 */
export const AngularAcceleration = AngularVelocity.over(Time);
export type AngularAcceleration = typeof AngularAcceleration;
