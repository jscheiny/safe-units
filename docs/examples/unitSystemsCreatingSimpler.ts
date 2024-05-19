import { UnitSystem } from "safe-units";

// START
const GameUnitSystem = UnitSystem.from({
    length: "u",
    time: "ms",
    frames: "fr",
});
// END

console.log(GameUnitSystem);
