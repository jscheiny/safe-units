import { Measure, seconds, liters, speedOfLight } from "safe-units";
import { acres } from "../../src/unit/common";
import { newtons } from "../../src/unit/metric";

// ExpectType Measure<{ data: 1; }>
Measure.dimension("data");

// $ExpectType Measure<{ time: 1; }>
const time = Measure.of(10, seconds);

// $ExpectType Measure<Pick<{ length: 3; }, "length">>
const volume = Measure.of(500, liters);

// $ExpectType Measure<Pick<{ length: 2; }, "length">>
const area = Measure.of(20, acres);

// $ExpectType Measure<Pick<{ time: -1; length: 0; mass: 1; }, "time" | "mass">>
Measure.of(1000, newtons).over(Measure.of(0.3, speedOfLight));

// $ExpectType Measure<Pick<{ time: 1; length: 3; }, "time" | "length">>
volume.times(time);

// $ExpectType Measure<Pick<{ time: -1; length: 3; }, "time" | "length">>
volume.over(time);

// $ExpectType Measure<Pick<{ length: 1; }, "length">>
volume.over(area);

// $ExpectType Measure<Pick<{ length: -3; }, "length">>
volume.inverse();

// $ExpectType never
volume.squared;

// $ExpectType never
volume.cubed;

// $ExpectType () => Measure<Pick<{ time: 2; }, "time">>
time.squared;

// $ExpectType () => Measure<Pick<{ time: 3; }, "time">>
time.cubed;

// $ExpectType () => Measure<Pick<{ length: 4; }, "length">>
area.squared;

// $ExpectType never
area.cubed;
