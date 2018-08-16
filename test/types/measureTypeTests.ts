import { acres, cubic, liters, Measure, newtons, seconds, speedOfLight, square } from "safe-units";

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

// $ExpectError
volume.times(volume);

// $ExpectError
volume.over(volume.inverse());

// $ExpectType Measure<Pick<{ time: -1; length: 3; }, "time" | "length">>
volume.over(time);

// $ExpectType Measure<Pick<{ length: 1; }, "length">>
volume.over(area);

// $ExpectType Measure<Pick<{ length: -3; }, "length">>
volume.inverse();

// $ExpectType never
volume.squared;

// $ExpectError
square(volume);

// $ExpectType never
volume.cubed;

// $ExpectError
cubic(volume);

// $ExpectType () => Measure<Pick<{ time: 2; }, "time">>
time.squared;

square(time);

// $ExpectType () => Measure<Pick<{ time: 3; }, "time">>
time.cubed;

cubic(time);

// $ExpectType () => Measure<Pick<{ length: 4; }, "length">>
area.squared;

square(area);

// $ExpectType never
area.cubed;

// $ExpectError
cubic(area);
