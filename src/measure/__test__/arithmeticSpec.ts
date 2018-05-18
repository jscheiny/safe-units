import { IsArithmeticError } from "../../exponents/utils";
import { DivideUnits, ExponentiateUnit, GetExponent, MultiplyUnits, NthRootUnit, StripZeroes } from "../types";

type GetPresentExponentWorks = 2 extends GetExponent<{ a: 2; b: 3 }, "a"> ? true : never;
const GetPresentExponentWorks: GetPresentExponentWorks = true;

type GetMissingExponentWorks = 0 extends GetExponent<{ a: 2; b: 3 }, "c"> ? true : never;
const GetMissingExponentWorks: GetMissingExponentWorks = true;

type GetUndefinedExponentWorks = 0 extends GetExponent<{ a: 2; b: undefined }, "b"> ? true : never;
const GetUndefinedExponentWorks: GetUndefinedExponentWorks = true;

type StripZeroesWorks = { b: 1 } extends StripZeroes<{ a: 0; b: 1; c: 0 }> ? true : never;
const StripZeroesWorks: StripZeroesWorks = true;

type SelfMultiplicationWorks = { a: 4 } extends MultiplyUnits<{ a: 2 }, { a: 2 }> ? true : never;
const SelfMultiplicationWorks: SelfMultiplicationWorks = true;

type MultiplySeveralDimensionsWorks = { b: 1; c: 1 } extends MultiplyUnits<{ a: 2; b: -1 }, { a: -2; b: 2; c: 1 }>
    ? true
    : never;
const MultiplySeveralDimensionsWorks: MultiplySeveralDimensionsWorks = true;

type MultiplicationPropagatesErrors = IsArithmeticError<MultiplyUnits<{ a: -5; b: 2 }, { a: -5; b: 1 }>>;
const MultiplicationPropagatesErrors: MultiplicationPropagatesErrors = true;

type DivisionWorks = { b: 1; c: 1 } extends DivideUnits<{ a: 2; b: -1 }, { a: 2; b: -2; c: -1 }> ? true : never;
const DivisionWorks: DivisionWorks = true;

type DivisionPropagatesErrors = IsArithmeticError<DivideUnits<{ a: -5; b: 1 }, { a: 5; b: 2 }>>;
const DivisionPropagatesErrors: DivisionPropagatesErrors = true;

type RaisingToTheZeroWorks = {} extends ExponentiateUnit<{ a: 2; b: -1 }, 0> ? true : never;
const RaisingToTheZeroWorks: RaisingToTheZeroWorks = true;

type RaisingToTheOneWorks = { a: 2; b: 3 } extends ExponentiateUnit<{ a: 2; b: 3 }, 1> ? true : never;
const RaisingToTheOneWorks: RaisingToTheOneWorks = true;

type SquaringWorks = { a: 4; b: -2 } extends ExponentiateUnit<{ a: 2; b: -1 }, 2> ? true : never;
const SquaringWorks: SquaringWorks = true;

type CubingWorks = { a: 3 } extends ExponentiateUnit<{ a: 1 }, 3> ? true : never;
const CubingWorks: CubingWorks = true;

type ExponentiationPropagatesErrors = IsArithmeticError<ExponentiateUnit<{ a: -5; b: 1 }, -2>>;
const ExponentiationPropagatesErrors: ExponentiationPropagatesErrors = true;

type SquareRootingWorks = { a: 2; b: -1 } extends NthRootUnit<{ a: 4; b: -2 }, 2> ? true : never;
const SquareRootingWorks: SquareRootingWorks = true;

type CubeRootingWorks = { a: 1; b: -1 } extends NthRootUnit<{ a: 3; b: -3 }, 3> ? true : never;
const CubeRootingWorks: CubeRootingWorks = true;

type NthRootPropagatesErrors = IsArithmeticError<NthRootUnit<{ b: 3 }, 2>>;
const NthRootPropagatesErrors: NthRootPropagatesErrors = true;
