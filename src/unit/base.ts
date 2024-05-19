import { GenericMeasureType } from "../measure";
import { Measure } from "../measure/numberMeasure";
import { UnitSystem } from "../measure/unitSystem";

const MetricSystemBasis = {
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

type MetricSystemBasis = typeof MetricSystemBasis;

export interface MetricSystem extends MetricSystemBasis {}

export const MetricSystem = UnitSystem.from<MetricSystem>(MetricSystemBasis);

export const createSIBaseUnits = <N>(measure: GenericMeasureType<N, any>) => ({
    meters: measure.dimension(MetricSystem, "length"),
    kilograms: measure.dimension(MetricSystem, "mass"),
    seconds: measure.dimension(MetricSystem, "time"),
    amperes: measure.dimension(MetricSystem, "current"),
    kelvin: measure.dimension(MetricSystem, "temperature"),
    moles: measure.dimension(MetricSystem, "substance"),
    candelas: measure.dimension(MetricSystem, "intensity"),
    radians: measure.dimension(MetricSystem, "planeAngle"),
    steradians: measure.dimension(MetricSystem, "solidAngle"),
    bits: measure.dimension(MetricSystem, "memory"),
});

export const { meters, kilograms, seconds, amperes, kelvin, moles, candelas, radians, steradians, bits } =
    createSIBaseUnits(Measure);
