import {
    Acceleration,
    Area,
    GenericMeasure,
    kilograms,
    Length,
    Measure,
    meters,
    newtons,
    seconds,
    Volume,
} from "safe-units";
import { value, expectTrue } from "utils";

// Valid usages

expectTrue(value(Measure.dimension("x")).hasType<GenericMeasure<number, { x: 1 }>>());

expectTrue(value(meters).hasType<GenericMeasure<number, { length: 1 }>>());
expectTrue(value(seconds).hasType<GenericMeasure<number, { time: 1 }>>());
expectTrue(value(newtons).hasType<GenericMeasure<number, { length: 1; mass: 1; time: -2 }>>());

const a = newtons.over(kilograms);
expectTrue(value(a).hasType<GenericMeasure<number, { length: 1; time: -2 }>>());
const accel: Acceleration = a;
expectTrue(value(accel).hasType<GenericMeasure<number, { length: 1; time: -2 }>>());

const absement = meters.times(seconds);
expectTrue(value(absement).hasType<GenericMeasure<number, { length: 1; time: 1 }>>());
const velocity = meters.over(seconds);
expectTrue(value(velocity).hasType<GenericMeasure<number, { length: 1; time: -1 }>>());

expectTrue(value(meters.plus(meters)).hasType<GenericMeasure<number, { length: 1 }>>());
expectTrue(value(meters.minus(meters)).hasType<GenericMeasure<number, { length: 1 }>>());
expectTrue(value(meters.negate()).hasType<GenericMeasure<number, { length: 1 }>>());
expectTrue(value(meters.scale(2)).hasType<GenericMeasure<number, { length: 1 }>>());

expectTrue(value(velocity.squared()).hasType<GenericMeasure<number, { length: 2; time: -2 }>>());
expectTrue(value(absement.cubed()).hasType<GenericMeasure<number, { length: 3; time: 3 }>>());
expectTrue(value(absement.inverse()).hasType<GenericMeasure<number, { length: -1; time: -1 }>>());

expectTrue(value(volume.times(volume)).hasType<GenericMeasure<number, { length: 6 }>>());
expectTrue(value(volume.cubed().inverse()).hasType<GenericMeasure<number, { length: -9 }>>());

// Error usages

declare const volume: Volume;
declare const area: Area;
declare const length: Length;

expectTrue(value(Measure.dimension("x" as "x" | "y")).hasType<never>());
expectTrue(value(Measure.dimension("x" as string)).hasType<never>());

// @ts-expect-error Area and volume have different units and cannot be added
volume.plus(area);
// @ts-expect-error Area and volume have different units and cannot be subtracted
area.minus(volume);

// TODO(jscheinerman): This should be an error but is not because of structural typing
length.plus(velocity);
