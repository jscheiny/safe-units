import { Equal, Expect } from "utils";
import { AddIntegers, Negative, SubtractIntegers } from "../src/measure/exponentTypeArithmetic";

export type TestCases = [
    // Negation
    Expect<Equal<Negative<1>, -1>>,
    Expect<Equal<Negative<10>, -10>>,
    Expect<Equal<Negative<-5>, 5>>,
    Expect<Equal<Negative<0>, 0>>,

    // Addition
    Expect<Equal<AddIntegers<0, 4>, 4>>,
    Expect<Equal<AddIntegers<4, 0>, 4>>,
    Expect<Equal<AddIntegers<3, 4>, 7>>,

    Expect<Equal<AddIntegers<3, -5>, -2>>,
    Expect<Equal<AddIntegers<3, -2>, 1>>,
    Expect<Equal<AddIntegers<0, -4>, -4>>,

    Expect<Equal<AddIntegers<-5, 3>, -2>>,
    Expect<Equal<AddIntegers<-2, 3>, 1>>,
    Expect<Equal<AddIntegers<-4, 0>, -4>>,

    Expect<Equal<AddIntegers<-3, -4>, -7>>,
    Expect<Equal<AddIntegers<-3, -2>, -5>>,

    // Subtraction
    Expect<Equal<SubtractIntegers<5, 0>, 5>>,
    Expect<Equal<SubtractIntegers<0, 5>, -5>>,
    Expect<Equal<SubtractIntegers<5, 5>, 0>>,
    Expect<Equal<SubtractIntegers<5, 3>, 2>>,
    Expect<Equal<SubtractIntegers<3, 5>, -2>>,

    Expect<Equal<SubtractIntegers<-5, 0>, -5>>,
    Expect<Equal<SubtractIntegers<-5, 3>, -8>>,

    Expect<Equal<SubtractIntegers<5, -3>, 8>>,

    Expect<Equal<SubtractIntegers<-5, -3>, -2>>,
    Expect<Equal<SubtractIntegers<-3, -10>, 7>>,
];
