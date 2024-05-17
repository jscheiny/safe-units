import { MultiplyUnits, DivideUnits, ReciprocalUnit } from "../src/measure/unitTypeArithmetic";
import { Equivalent, Expect } from "./utils";

type Basis = Record<"a" | "b" | "c", any>;
export type TestCases = [
    // MultiplyUnits
    Expect<Equivalent<MultiplyUnits<{ a: "a" }, { a: 2 }, { a: 2 }>, { a: 4 }>>,
    Expect<Equivalent<MultiplyUnits<Basis, { a: 2; b: -5; c: 0 }, { a: -2; b: 2; c: 1 }>, { a: 0; b: -3; c: 1 }>>,

    // DivideUnits
    Expect<Equivalent<DivideUnits<Basis, { a: 2; b: -6; c: 0 }, { a: 2; b: -2; c: -1 }>, { a: 0; b: -4; c: 1 }>>,

    // ReciprocalUnit
    Expect<Equivalent<ReciprocalUnit<Basis, { a: 2; b: -6; c: 0 }>, { a: -2; b: 6; c: 0 }>>,
];
