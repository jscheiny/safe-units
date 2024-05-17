import { MultiplyUnits, DivideUnits } from "../src/measure/unitTypeArithmetic";
import { Equivalent, Expect, ExpectFalse } from "./utils";
import { IsSingleStringLiteral } from "../src/measure/typeUtils";

export type TestCases = [
    // MultiplyUnits
    Expect<Equivalent<MultiplyUnits<{ a: 2 }, { a: 2 }>, { a: 4 }>>,
    Expect<Equivalent<MultiplyUnits<{ a: 2; b: -5 }, { a: -2; b: 2; c: 1 }>, { b: -3; c: 1 }>>,

    // DivideUnits
    Expect<Equivalent<DivideUnits<{ a: 2; b: -6 }, { a: 2; b: -2; c: -1 }>, { b: -4; c: 1 }>>,

    // IsSingleStringLiteral
    Expect<IsSingleStringLiteral<"A">>,
    ExpectFalse<IsSingleStringLiteral<"A" | "B">>,
    ExpectFalse<IsSingleStringLiteral<string>>,
];
