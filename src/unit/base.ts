import { GenericMeasure } from "../measure/genericMeasure";
import { GenericMeasureType } from "../measure/genericMeasureFactory";
import { Measure } from "../measure/numberMeasure";

interface BaseUnitsMap {
    meters: "length";
    kilograms: "mass";
    seconds: "time";
    amperes: "current";
    kelvin: "temperature";
    moles: "substance";
    candelas: "intensity";
    radians: "planeAngle";
    steradians: "solidAngle";
    bits: "memory";
}

export type BaseUnits<N> = { [U in keyof BaseUnitsMap]: GenericMeasure<N, { [K in BaseUnitsMap[U]]: "1" }> };

export const createBaseUnits = <N>(MeasureType: GenericMeasureType<N, any>): BaseUnits<N> => ({
    meters: MeasureType.dimension("length", "m"),
    kilograms: MeasureType.dimension("mass", "kg"),
    seconds: MeasureType.dimension("time", "s"),
    amperes: MeasureType.dimension("current", "A"),
    kelvin: MeasureType.dimension("temperature", "K"),
    moles: MeasureType.dimension("substance", "mol"),
    candelas: MeasureType.dimension("intensity", "cd"),
    radians: MeasureType.dimension("planeAngle", "rad"),
    steradians: MeasureType.dimension("solidAngle", "sr"),
    bits: MeasureType.dimension("memory", "b"),
});

export const {
    meters,
    kilograms,
    seconds,
    amperes,
    kelvin,
    moles,
    candelas,
    radians,
    steradians,
    bits,
} = createBaseUnits(Measure);
