import { GenericMeasure, Measure, Unit, amperes, coulombs, Length } from "safe-units";
import { value, expectTrue } from "utils";
import { UnitSystem } from "../src/measure/unitSystem";

const Basis = {
    length: "m",
    mass: "kg",
    time: "s",
} as const;

type Basis = typeof Basis;
interface TestUnitSystem extends Basis {}

const unitSystem = UnitSystem.from<TestUnitSystem>(Basis);

type TestMeasure<U extends Unit<Basis>> = GenericMeasure<number, TestUnitSystem, Readonly<U>>;

// Valid usages

expectTrue(value(Measure.dimension(unitSystem, "length")).hasType<TestMeasure<{ length: 1; mass: 0; time: 0 }>>());

const meters = Measure.dimension(unitSystem, "length");
expectTrue(value(meters).hasType<TestMeasure<{ length: 1; mass: 0; time: 0 }>>());

const seconds = Measure.dimension(unitSystem, "time");
expectTrue(value(seconds).hasType<TestMeasure<{ length: 0; mass: 0; time: 1 }>>());

const kilograms = Measure.dimension(unitSystem, "mass");
const newtons = kilograms.times(meters.per(seconds.squared()));
expectTrue(value(newtons).hasType<TestMeasure<{ length: 1; mass: 1; time: -2 }>>());

const acceleration = newtons.over(kilograms);
expectTrue(value(acceleration).hasType<TestMeasure<{ length: 1; mass: 0; time: -2 }>>());

const absement = meters.times(seconds);
expectTrue(value(absement).hasType<TestMeasure<{ length: 1; mass: 0; time: 1 }>>());

const velocity = meters.over(seconds);
expectTrue(value(velocity).hasType<TestMeasure<{ length: 1; mass: 0; time: -1 }>>());

type TestLength = TestMeasure<{ length: 1; mass: 0; time: 0 }>;
expectTrue(value(meters.plus(meters)).hasType<TestLength>());
expectTrue(value(meters.minus(meters)).hasType<TestLength>());
expectTrue(value(meters.negate()).hasType<TestLength>());
expectTrue(value(meters.scale(2)).hasType<TestLength>());

expectTrue(value(velocity.squared()).hasType<TestMeasure<{ length: 2; mass: 0; time: -2 }>>());
expectTrue(value(absement.cubed()).hasType<TestMeasure<{ length: 3; mass: 0; time: 3 }>>());
expectTrue(value(absement.inverse()).hasType<TestMeasure<{ length: -1; mass: 0; time: -1 }>>());

const volume = meters.cubed();
expectTrue(value(volume.times(volume)).hasType<TestMeasure<{ length: 6; mass: 0; time: 0 }>>());
expectTrue(value(volume.cubed().inverse()).hasType<TestMeasure<{ length: -9; mass: 0; time: 0 }>>());

// Error usages

const area = meters.squared();
const length = meters;

// @ts-expect-error Area and volume have different units and cannot be added
volume.plus(area);

// @ts-expect-error Area and volume have different units and cannot be subtracted
area.minus(volume);

// @ts-expect-error Velocity cannot be assigned to type length
length.plus(velocity);

// @ts-expect-error Velocity cannot be assigned to type length
length.valueIn(velocity);

// @ts-expect-error Velocity cannot be assigned to type length
export const test: TestLength = velocity;

// @ts-expect-error Cannot sum amperes and columbs
Measure.sum(Measure.of(3, amperes), Measure.of(5, coulombs));

// @ts-expect-error Cannot convert across unit systems
Length.plus(length);

// Unit system tests

const validUnitSystem = UnitSystem.from({ length: "m", mass: "kg", time: "s" } as const);
expectTrue(value(validUnitSystem).hasType<UnitSystem<{ length: "m"; mass: "kg"; time: "s" }>>());

const errorBasis = { length: "m", mass: 3, time: "kg" };
const errorUnitSystem = UnitSystem.from(errorBasis);
expectTrue(value(errorUnitSystem).hasType<"Dimension 'mass' does not have a valid symbol">());
