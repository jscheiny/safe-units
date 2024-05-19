import { UnitSystem } from "safe-units";

// START
const GameUnitSystemBasis = {
    length: "eu",
    time: "ms",
    frames: "fr",
} as const;

type GameUnitSystemBasis = typeof GameUnitSystemBasis;

interface GameUnitSystem extends UnitSystem<GameUnitSystemBasis> {}

const GameUnitSystem = UnitSystem.from<GameUnitSystemBasis>(GameUnitSystemBasis);
// END

export { GameUnitSystem };
