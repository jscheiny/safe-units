import { GenericMeasureType } from "../measure";
import { Measure } from "../measure/numberMeasure";
import { UnitSystem } from "../measure/unitSystem";

const SIUnitSystemBasis = {
    length: "m",
    mass: "kg",
    time: "s",
    current: "A",
    temperature: "K",
    substance: "mol",
    intensity: "cd",
    planeAngle: "rad",
    solidAngle: "sr",
    memory: "b",
} as const;

type SIUnitSystemBasis = typeof SIUnitSystemBasis;

export interface SIUnitSystem extends SIUnitSystemBasis {}

export const SIUnitSystem = UnitSystem.from<SIUnitSystem>(SIUnitSystemBasis);

export const createSIBaseUnits = <N>(measure: GenericMeasureType<N, any>) => ({
    meters: measure.dimension(SIUnitSystem, "length"),
    kilograms: measure.dimension(SIUnitSystem, "mass"),
    seconds: measure.dimension(SIUnitSystem, "time"),
    amperes: measure.dimension(SIUnitSystem, "current"),
    kelvin: measure.dimension(SIUnitSystem, "temperature"),
    moles: measure.dimension(SIUnitSystem, "substance"),
    candelas: measure.dimension(SIUnitSystem, "intensity"),
    radians: measure.dimension(SIUnitSystem, "planeAngle"),
    steradians: measure.dimension(SIUnitSystem, "solidAngle"),
    bits: measure.dimension(SIUnitSystem, "memory"),
});

export const { meters, kilograms, seconds, amperes, kelvin, moles, candelas, radians, steradians, bits } =
    createSIBaseUnits(Measure);
