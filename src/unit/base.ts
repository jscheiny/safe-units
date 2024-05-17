import { DimensionUnit } from "../measure";
import { GenericMeasure } from "../measure/genericMeasure";
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

type MetricDimension<Dimension extends keyof MetricSystem> = GenericMeasure<
    number,
    MetricSystem,
    DimensionUnit<MetricSystem, Dimension>
>;

export const meters: MetricDimension<"length"> = Measure.dimension(MetricSystem, "length");
export const kilograms: MetricDimension<"mass"> = Measure.dimension(MetricSystem, "mass");
export const seconds: MetricDimension<"time"> = Measure.dimension(MetricSystem, "time");
export const amperes: MetricDimension<"current"> = Measure.dimension(MetricSystem, "current");
export const kelvin: MetricDimension<"temperature"> = Measure.dimension(MetricSystem, "temperature");
export const moles: MetricDimension<"substance"> = Measure.dimension(MetricSystem, "substance");
export const candelas: MetricDimension<"intensity"> = Measure.dimension(MetricSystem, "intensity");
export const radians: MetricDimension<"planeAngle"> = Measure.dimension(MetricSystem, "planeAngle");
export const steradians: MetricDimension<"solidAngle"> = Measure.dimension(MetricSystem, "solidAngle");
export const bits: MetricDimension<"memory"> = Measure.dimension(MetricSystem, "memory");
