import { Measure } from "../measure";
import * as Base from "../unit/base";

// Dimensionless

export const Dimensionless = Measure.dimensionless(1);
export type Dimensionless = typeof Dimensionless;

// Base units

export type Length = typeof Base.meters;
export const Length: Length = Base.meters;

export type Mass = typeof Base.kilograms;
export const Mass: Mass = Base.kilograms;

export type Time = typeof Base.seconds;
export const Time: Time = Base.seconds;

export type ElectricCurrent = typeof Base.amperes;
export const ElectricCurrent: ElectricCurrent = Base.amperes;

export type Temperature = typeof Base.kelvin;
export const Temperature: Temperature = Base.kelvin;

export type AmountOfSubstance = typeof Base.moles;
export const AmountOfSubstance: AmountOfSubstance = Base.moles;

export type LuminousIntensity = typeof Base.candela;
export const LuminousIntensity: LuminousIntensity = Base.candela;

// Angular base units

export type PlaneAngle = typeof Base.radians;
export const PlaneAngle: PlaneAngle = Base.radians;

export type SolidAngle = typeof Base.steradians;
export const SolidAngle: SolidAngle = Base.steradians;

// Derived units

export const Frequency = Time.inverse();
export type Frequency = typeof Frequency;

export const FrequencyDrift = Time.toThe(-2);
export type FrequencyDrift = typeof FrequencyDrift;

export const FuelEfficiency = Length.toThe(-2);
export type FuelEfficiency = typeof FuelEfficiency;

export const Wavenumber = Length.inverse();
export type Wavenumber = typeof Wavenumber;

export const Area = Length.squared();
export type Area = typeof Area;

export const Volume = Length.cubed();
export type Volume = typeof Volume;

export const Absement = Length.times(Time);
export type Absement = typeof Absement;

export const Velocity = Length.over(Time);
export type Velocity = typeof Velocity;

export const Acceleration = Velocity.over(Time);
export type Acceleration = typeof Acceleration;

export const Jerk = Acceleration.over(Time);
export type Jerk = typeof Jerk;

export const Jounce = Jerk.over(Time);
export type Jounce = typeof Jounce;

export const Crackle = Jounce.over(Time);
export type Crackle = typeof Crackle;

export const VolumetricFlow = Volume.over(Time);
export type VolumetricFlow = typeof VolumetricFlow;

export const MassFlowRate = Mass.over(Time);
export type MassFlowRate = typeof MassFlowRate;

export const LinearDensity = Mass.over(Length);
export type LinearDensity = typeof LinearDensity;

export const AreaDensity = Mass.over(Area);
export type AreaDensity = typeof AreaDensity;

export const VolumeDensity = Mass.over(Volume);
export type VolumeDensity = typeof VolumeDensity;

export const Force = Mass.times(Acceleration);
export type Force = typeof Force;

export const Yank = Force.over(Time);
export type Yank = typeof Yank;

export const Pressure = Force.over(Area);
export type Pressure = typeof Pressure;

export const Compressibility = Pressure.inverse();
export type Compressibility = typeof Compressibility;

export const DynamicViscosity = Pressure.times(Time);
export type DynamicViscosity = typeof DynamicViscosity;

export const SurfaceTension = Force.over(Length);
export type SurfaceTension = typeof SurfaceTension;

export const Momentum = Force.times(Time);
export type Momentum = typeof Momentum;

export const MomentOfInertia = Mass.times(Area);
export type MomentOfInertia = typeof MomentOfInertia;

export const Energy = Force.times(Length);
export type Energy = typeof Energy;

export const Power = Energy.over(Time);
export type Power = typeof Power;

export const PowerDensity = Power.over(Volume);
export type PowerDensity = typeof PowerDensity;

export const Voltage = Power.over(ElectricCurrent);
export type Voltage = typeof Voltage;

export const ElectricCharge = ElectricCurrent.times(Time);
export type ElectricCharge = typeof ElectricCharge;

export const ElectricChargeDensity = ElectricCurrent.over(Volume);
export type ElectricChargeDensity = typeof ElectricChargeDensity;

export const ElectricCurrentDensity = ElectricCurrent.over(Area);
export type ElectricCurrentDensity = typeof ElectricCurrentDensity;

export const ElectricDisplacement = ElectricCharge.over(Area);
export type ElectricDisplacement = typeof ElectricDisplacement;

export const EletricFieldStrength = Voltage.over(Length);
export type EletricFieldStrength = typeof EletricFieldStrength;

export const ElectricalCapacitance = ElectricCharge.over(Voltage);
export type ElectricalCapacitance = typeof ElectricalCapacitance;

export const ElectricalConductance = ElectricCurrent.over(Voltage);
export type ElectricalConductance = typeof ElectricalConductance;

export const ElectricalConductivity = ElectricalConductance.over(Length);
export type ElectricalConductivity = typeof ElectricalConductivity;

export const ElectricalResistance = Voltage.over(ElectricCurrent);
export type ElectricalResistance = typeof ElectricalResistance;

export const ElectricalResistivity = ElectricalResistance.times(Length);
export type ElectricalResistivity = typeof ElectricalResistivity;

export const ElectricalInductance = ElectricalResistance.times(Time);
export type ElectricalInductance = typeof ElectricalInductance;

export const LinearChargeDensity = ElectricCharge.over(Length);
export type LinearChargeDensity = typeof LinearChargeDensity;

export const Permittivity = ElectricalCapacitance.over(Length);
export type Permittivity = typeof Permittivity;

export const MagneticFlux = Energy.over(ElectricCurrent);
export type MagneticFlux = typeof MagneticFlux;

export const MagneticFluxDensity = Voltage.times(Time).over(Length.squared());
export type MagneticFluxDensity = typeof MagneticFluxDensity;

export const MagneticPermeability = ElectricalInductance.over(Length);
export type MagneticPermeability = typeof MagneticPermeability;

export const Magnetization = ElectricCurrent.over(Length);
export type Magnetization = typeof Magnetization;

export const MagneticReluctance = ElectricalInductance.inverse();
export type MagneticReluctance = typeof MagneticReluctance;

export const MagneticMoment = MagneticFlux.times(Length);
export type MagneticMoment = typeof MagneticMoment;

export const MagneticRigidity = MagneticFluxDensity.times(Length);
export type MagneticRigidity = typeof MagneticRigidity;

export const MagneticDipoleMoment = Energy.over(MagneticFluxDensity);
export type MagneticDipoleMoment = typeof MagneticDipoleMoment;

export const MagneticSusceptibility = Length.over(ElectricalInductance);
export type MagneticSusceptibility = typeof MagneticSusceptibility;

export const Irradiance = Power.over(Area);
export type Irradiance = typeof Irradiance;

export const Entropy = Energy.over(Temperature);
export type Entropy = typeof Entropy;

export const SpecificHeat = Energy.over(Mass.times(Temperature));
export type SpecificHeat = typeof SpecificHeat;

export const SpecificVolume = Volume.over(Mass);
export type SpecificVolume = typeof SpecificVolume;

export const ThermalConductivity = Power.over(Length.times(Temperature));
export type ThermalConductivity = typeof ThermalConductivity;

export const ThermalResistance = Temperature.over(Power);
export type ThermalResistance = typeof ThermalResistance;

export const ThermalExpansionCoefficient = Temperature.inverse();
export type ThermalExpansionCoefficient = typeof ThermalExpansionCoefficient;

export const ThermalGradient = Temperature.over(Length);
export type ThermalGradient = typeof ThermalGradient;

export const MolarEntropy = Entropy.over(AmountOfSubstance);
export type MolarEntropy = typeof MolarEntropy;

export const MolarEnergy = Energy.over(AmountOfSubstance);
export type MolarEnergy = typeof MolarEnergy;

export const Molarity = AmountOfSubstance.over(Volume);
export type Molarity = typeof Molarity;

export const MolarVolume = Volume.over(AmountOfSubstance);
export type MolarVolume = typeof MolarVolume;

export const Molality = AmountOfSubstance.over(Mass);
export type Molality = typeof Molality;

export const MolarMass = Mass.over(AmountOfSubstance);
export type MolarMass = typeof MolarMass;

export const MolarConductivity = ElectricalConductance.times(Area).over(AmountOfSubstance);
export type MolarConductivity = typeof MolarConductivity;

export const CatalyticActivity = AmountOfSubstance.over(Time);
export type CatalyticActivity = typeof CatalyticActivity;

export const CatalyticEfficiency = Volume.over(AmountOfSubstance.times(Time));
export type CatalyticEfficiency = typeof CatalyticEfficiency;

export const ReactionRate = CatalyticActivity.over(Volume);
export type ReactionRate = typeof ReactionRate;

export const RadiationDose = Energy.over(Mass);
export type RadiationDose = typeof RadiationDose;

export const RadiationDoseRate = RadiationDose.over(Time);
export type RadiationDoseRate = typeof RadiationDoseRate;

export const ElectronMobility = Area.over(Voltage.times(Time));
export type ElectronMobility = typeof ElectronMobility;

export const AngularMomentum = Force.times(Length).times(Time);
export type AngularMomentum = typeof AngularMomentum;

export const SpecificAngularMomentum = AngularMomentum.over(Mass);
export type SpecificAngularMomentum = typeof SpecificAngularMomentum;

export const Luminance = LuminousIntensity.over(Area);
export type Luminance = typeof Luminance;

// Angular derived units

export const LuminousFlux = LuminousIntensity.times(SolidAngle);
export type LuminousFlux = typeof LuminousFlux;

export const Illuminance = LuminousFlux.over(Area);
export type Illuminance = typeof Illuminance;

export const LuminousEnergy = LuminousFlux.times(Time);
export type LuminousEnergy = typeof LuminousEnergy;

export const LuminousExposure = Illuminance.times(Time);
export type LuminousExposure = typeof LuminousExposure;

export const LuminousEfficiency = LuminousFlux.over(Power);
export type LuminousEfficiency = typeof LuminousEfficiency;

export const RadiantIntensity = Power.over(SolidAngle);
export type RadiantIntensity = typeof RadiantIntensity;

export const SpectralIntensity = RadiantIntensity.over(Length);
export type SpectralIntensity = typeof SpectralIntensity;

export const Radiance = RadiantIntensity.over(Area);
export type Radiance = typeof Radiance;

export const SpectralRadiance = RadiantIntensity.over(Volume);
export type SpectralRadiance = typeof SpectralRadiance;

export const AngularVelocity = PlaneAngle.over(Time);
export type AngularVelocity = typeof AngularVelocity;

export const AngularAcceleration = AngularVelocity.over(Time);
export type AngularAcceleration = typeof AngularAcceleration;
