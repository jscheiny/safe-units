import { Area, Measure, Volume } from "safe-units";

Measure.dimension("x" as "x" | "y"); // $ExpectType never
Measure.dimension("x" as string); // $ExpectType never

Volume.times(Volume); // $ExpectError
const volumeInverse = Volume.inverse();
Volume.over(volumeInverse); // $ExpectError

Volume.plus(Area); // $ExpectError
Area.minus(Volume); // $ExpectError

const s = Volume.squared; // $ExpectType never
const c = Area.cubed; // $ExpectType never
Area.toThe(4); // $ExpectError
Volume.toThe(-2); // $ExpectError

Measure.sqrt(Volume); // $ExpectError
Measure.cbrt(Area); // $ExpectError
