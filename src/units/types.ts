import { Measure } from "../measure";
import * as Base from "./base";

// Base units

// Due to how the TS "declaration" compiler option behaves, when exporting types that are implemented via `typeof
// Measure` we need to import the Measure class so that this typing isn't "private." However, we don't actually use
// any Measures in this file so we construct this unused scalar to get the compiler to quit complaining.
Measure.scalar(0);

export type Length = typeof Base.meters;
const Length: Length = Base.meters;

export type Mass = typeof Base.kilograms;
const Mass: Mass = Base.kilograms;

export type Time = typeof Base.seconds;
const Time: Time = Base.seconds;

export type ElectricalCurrent = typeof Base.amperes;
const ElectricalCurrent: ElectricalCurrent = Base.amperes;

export type Temperature = typeof Base.kelvin;
const Temperature: Temperature = Base.kelvin;

export type AmountOfSubstance = typeof Base.moles;
const AmountOfSubstance: AmountOfSubstance = Base.moles;

export type LuminousIntensity = typeof Base.candela;
const LuminousIntensity: LuminousIntensity = Base.candela;

// Named SI units

export const Frequency = Time.inverse();
export type Frequency = typeof Frequency;

export const Force = Mass.times(Length).over(Time.squared());
export type Force = typeof Force;

export const Pressure = Force.over(Length.squared());
export type Pressure = typeof Pressure;

export const Energy = Force.times(Length);
export type Energy = typeof Energy;

export const Power = Energy.over(Time);
export type Power = typeof Power;

export const Voltage = Power.over(ElectricalCurrent);
export type Voltage = typeof Voltage;

export const ElectricCharge = ElectricalCurrent.times(Time);
export type ElectricCharge = typeof ElectricCharge;

export const ElectricalCapacitance = ElectricCharge.over(Voltage);
export type ElectricalCapacitance = typeof ElectricalCapacitance;

export const ElectricalResistance = Voltage.over(ElectricalCurrent);
export type ElectricalResistance = typeof ElectricalResistance;

export const ElectricalConductance = ElectricalCurrent.over(Voltage);
export type ElectricalConductance = typeof ElectricalConductance;

export const ElectricalInductance = ElectricalResistance.times(Time);
export type ElectricalInductance = typeof ElectricalInductance;

export const MagneticFlux = Energy.over(ElectricalCurrent);
export type MagneticFlux = typeof MagneticFlux;

export const MagneticFluxDensity = Voltage.times(Time).over(Length.squared());
export type MagneticFluxDensity = typeof MagneticFluxDensity;

export const RadiationDose = Energy.over(Mass);
export type RadiationDose = typeof RadiationDose;

export const CatalyticActivity = AmountOfSubstance.over(Time);
export type CatalyticActivity = typeof CatalyticActivity;

// Unnamed SI units

export const Area = Length.squared();
export type Area = typeof Area;

export const Volume = Length.cubed();
export type Volume = typeof Volume;

export const Velocity = Length.over(Time);
export type Velocity = typeof Velocity;

export const Acceleration = Velocity.over(Time);
export type Acceleration = typeof Acceleration;

export const Jerk = Acceleration.over(Time);
export type Jerk = typeof Jerk;

export const Jounce = Jerk.over(Time);
export type Jounce = typeof Jounce;

export const VolumetricFlow = Volume.over(Time);
export type VolumetricFlow = typeof VolumetricFlow;

export const Momentum = Force.times(Time);
export type Momentum = typeof Momentum;

export const AngularMomentum = Force.times(Length).times(Time);
export type AngularMomentum = typeof AngularMomentum;

export const Yank = Force.over(Time);
export type Yank = typeof Yank;

export const Curvature = Length.inverse();
export type Curvature = typeof Curvature;

export const AreaDensity = Mass.over(Area);
export type AreaDensity = typeof AreaDensity;

export const MassDensity = Mass.over(Volume);
export type MassDensity = typeof MassDensity;

export const SpecificVolume = Volume.over(Mass);
export type SpecificVolume = typeof SpecificVolume;

export const Molarity = AmountOfSubstance.over(Volume);
export type Molarity = typeof Molarity;

export const MolarVolume = Volume.over(AmountOfSubstance);
export type MolarVolume = typeof MolarVolume;

export const Action = Energy.times(Time);
export type Action = typeof Action;

export const Entropy = Energy.over(Time);
export type Entropy = typeof Entropy;

export const MolarEntropy = Energy.over(Temperature.times(AmountOfSubstance));
export type MolarEntropy = typeof MolarEntropy;

export const SpecificHeat = Energy.over(Temperature.times(Mass));
export type SpecificHeat = typeof SpecificHeat;

export const MolarEnergy = Energy.over(AmountOfSubstance);
export type MolarEnergy = typeof MolarEnergy;

export const SpecificEnergy = Energy.over(Mass);
export type SpecificEnergy = typeof SpecificEnergy;

export const EnergyDensity = Energy.over(Volume);
export type EnergyDensity = typeof EnergyDensity;

export const SurfaceTension = Force.over(Length);
export type SurfaceTension = typeof SurfaceTension;

export const Irradiance = Power.over(Area);
export type Irradiance = typeof Irradiance;

export const ThermalConductivity = Power.over(Length.times(Temperature));
export type ThermalConductivity = typeof ThermalConductivity;

export const KinematicViscosity = Area.over(Time);
export type KinematicViscosity = typeof KinematicViscosity;

export const DynamicViscosity = Pressure.times(Time);
export type DynamicViscosity = typeof DynamicViscosity;

export const ElectricDisplacementField = ElectricCharge.over(Area);
export type ElectricDisplacementField = typeof ElectricDisplacementField;

export const ElectricChargeDensity = ElectricCharge.over(Volume);
export type ElectricChargeDensity = typeof ElectricChargeDensity;

export const ElectricCurrentDensity = ElectricalCurrent.over(Area);
export type ElectricCurrentDensity = typeof ElectricCurrentDensity;

export const ElectricalConductivity = ElectricalConductance.over(Length);
export type ElectricalConductivity = typeof ElectricalConductivity;

export const MolarConductivity = ElectricalConductance.times(Area).over(AmountOfSubstance);
export type MolarConductivity = typeof MolarConductivity;

export const Permittivity = ElectricalCapacitance.over(Length);
export type Permittivity = typeof Permittivity;

export const MagneticPermeability = ElectricalInductance.over(Length);
export type MagneticPermeability = typeof MagneticPermeability;

export const EletricFieldStrength = Voltage.over(Length);
export type EletricFieldStrength = typeof EletricFieldStrength;

export const MagneticFieldStrength = ElectricalCurrent.over(Length);
export type MagneticFieldStrength = typeof MagneticFieldStrength;

export const Luminance = LuminousIntensity.over(Area);
export type Luminance = typeof Luminance;

// TODO How do I implement these?
// export const LuminousEnergy = lumen.times(second);
// export type LuminousEnergy = typeof LuminousEnergy;

// export const LuminousExposure = lux.times(second);
// export type LuminousExposure = typeof LuminousExposure;

export const LuminousExposure = ElectricCharge.over(Mass);
export type LuminousExposure = typeof LuminousExposure;

export const RadiationDoseRate = RadiationDose.over(Time);
export type RadiationDoseRate = typeof RadiationDoseRate;

export const ElectricalResistivity = ElectricalResistance.times(Length);
export type ElectricalResistivity = typeof ElectricalResistivity;

export const LinearMassDensity = Mass.over(Length);
export type LinearMassDensity = typeof LinearMassDensity;

export const LinearChargeDensity = ElectricCharge.over(Length);
export type LinearChargeDensity = typeof LinearChargeDensity;

export const Molality = AmountOfSubstance.over(Mass);
export type Molality = typeof Molality;

export const MolarMass = Mass.over(AmountOfSubstance);
export type MolarMass = typeof MolarMass;

export const FuelEfficiency = Length.squared().inverse();
export type FuelEfficiency = typeof FuelEfficiency;

export const MassFlowRate = Mass.over(Time);
export type MassFlowRate = typeof MassFlowRate;

export const MagneticDipoleMoment = Energy.over(MagneticFluxDensity);
export type MagneticDipoleMoment = typeof MagneticDipoleMoment;

export const PowerDensity = Power.over(Length.cubed());
export type PowerDensity = typeof PowerDensity;

export const ThermalResistance = Temperature.over(Power);
export type ThermalResistance = typeof ThermalResistance;

export const ThermalExpansionCoefficient = Temperature.inverse();
export type ThermalExpansionCoefficient = typeof ThermalExpansionCoefficient;

export const ThermalGradient = Temperature.over(Length);
export type ThermalGradient = typeof ThermalGradient;

export const ElectronMobility = Area.over(Voltage.times(Time));
export type ElectronMobility = typeof ElectronMobility;

export const Compressibility = Pressure.inverse();
export type Compressibility = typeof Compressibility;

export const MagneticReluctance = ElectricalInductance.inverse();
export type MagneticReluctance = typeof MagneticReluctance;

export const MagneticVectorPotential = MagneticFlux.over(Length);
export type MagneticVectorPotential = typeof MagneticVectorPotential;

export const MagneticMoment = MagneticFlux.times(Length);
export type MagneticMoment = typeof MagneticMoment;

export const MagneticRigidity = MagneticFluxDensity.times(Length);
export type MagneticRigidity = typeof MagneticRigidity;

export const RadiantExposure = Energy.over(Area);
export type RadiantExposure = typeof RadiantExposure;

export const CatalyticEfficiency = Volume.over(AmountOfSubstance.times(Time));
export type CatalyticEfficiency = typeof CatalyticEfficiency;

export const MomentOfInertia = Mass.times(Area);
export type MomentOfInertia = typeof MomentOfInertia;

export const SpecificAngularMomentum = AngularMomentum.over(Mass);
export type SpecificAngularMomentum = typeof SpecificAngularMomentum;

export const FrequencyDrift = Frequency.over(Time);
export type FrequencyDrift = typeof FrequencyDrift;

// TODO How do I implement this?
// export const LuminousEfficiency = lumen.over(Power);
// export type LuminousEfficiency = typeof LuminousEfficiency;

export const MagnetomotiveForce = Length.over(ElectricalInductance);
export type MagnetomotiveForce = typeof MagnetomotiveForce;

// TODO How do I implement these?
// export const RadiantIntensity = Power.over(steradian);
// export type RadiantIntensity = typeof RadiantIntensity;

// export const SpectralIntensity = Power.over(steradian.times(Length));
// export type SpectralIntensity = typeof SpectralIntensity;

// export const Radiance = Power.over(steradian.times(Length.squared()));
// export type Radiance = typeof Radiance;

// export const SpectralRadiance = Power.over(steradian.times(Length.cubed()));
// export type SpectralRadiance = typeof SpectralRadiance;

export const SpectralPower = Power.over(Length);
export type SpectralPower = typeof SpectralPower;
