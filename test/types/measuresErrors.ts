import { Area, Measure, Volume } from "safe-units";

Volume.times(Volume); // $ExpectError
const volumeInverse = Volume.inverse();
Volume.over(volumeInverse); // $ExpectError

Volume.plus(Area); // $ExpectError
Area.minus(Volume); // $ExpectError

const s = Volume.squared; // $ExpectType never
const c = Area.cubed; // $ExpectType never
Area.toThe(4); // $ExpectType never
Volume.toThe(-2); // $ExpectType never

Measure.sqrt(Volume); // $ExpectError
Measure.cbrt(Area); // $ExpectError
