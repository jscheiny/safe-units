import { IsArithmeticError } from "../../exponent";
import {
    DivideUnits,
    ExponentiateUnit,
    GetExponent,
    MultiplyUnits,
    NthRootableUnit,
    NthRootUnit,
    StripZeroes,
} from "../types";
import { AddSymbols } from "./testUtils";

type GetPresentExponentWorks = 2 extends GetExponent<AddSymbols<{ a: 2; b: 3 }>, "a"> ? true : false;
const GetPresentExponentWorks: GetPresentExponentWorks = true;

type GetMissingExponentWorks = 0 extends GetExponent<AddSymbols<{ a: 2; b: 3 }>, "c"> ? true : never;
const GetMissingExponentWorks: GetMissingExponentWorks = true;

type GetUndefinedExponentWorks = 0 extends GetExponent<AddSymbols<{ a: 2; b: undefined }>, "b"> ? true : never;
const GetUndefinedExponentWorks: GetUndefinedExponentWorks = true;

type StripZeroesWorks = AddSymbols<{ b: 1 }> extends StripZeroes<AddSymbols<{ a: 0; b: 1; c: 0 }>> ? true : never;
const StripZeroesWorks: StripZeroesWorks = true;

type SelfMultiplicationWorks = AddSymbols<{ a: 4 }> extends MultiplyUnits<AddSymbols<{ a: 2 }>, AddSymbols<{ a: 2 }>>
    ? true
    : never;
const SelfMultiplicationWorks: SelfMultiplicationWorks = true;

type MultiplySeveralDimensionsWorks = AddSymbols<{ b: 1; c: 1 }> extends MultiplyUnits<
    AddSymbols<{ a: 2; b: -1 }>,
    AddSymbols<{ a: -2; b: 2; c: 1 }>
>
    ? true
    : never;
const MultiplySeveralDimensionsWorks: MultiplySeveralDimensionsWorks = true;

type MultiplicationPropagatesErrors = IsArithmeticError<
    MultiplyUnits<AddSymbols<{ a: -5; b: 2 }>, AddSymbols<{ a: -5; b: 1 }>>
>;
const MultiplicationPropagatesErrors: MultiplicationPropagatesErrors = true;

type DivisionWorks = AddSymbols<{ b: 1; c: 1 }> extends DivideUnits<
    AddSymbols<{ a: 2; b: -1 }>,
    AddSymbols<{ a: 2; b: -2; c: -1 }>
>
    ? true
    : never;
const DivisionWorks: DivisionWorks = true;

type DivisionPropagatesErrors = IsArithmeticError<DivideUnits<AddSymbols<{ a: -5; b: 1 }>, AddSymbols<{ a: 5; b: 2 }>>>;
const DivisionPropagatesErrors: DivisionPropagatesErrors = true;

type RaisingToTheZeroWorks = AddSymbols<{}> extends ExponentiateUnit<AddSymbols<{ a: 2; b: -1 }>, 0> ? true : never;
const RaisingToTheZeroWorks: RaisingToTheZeroWorks = true;

type RaisingToTheOneWorks = AddSymbols<{ a: 2; b: 3 }> extends ExponentiateUnit<AddSymbols<{ a: 2; b: 3 }>, 1>
    ? true
    : never;
const RaisingToTheOneWorks: RaisingToTheOneWorks = true;

type SquaringWorks = AddSymbols<{ a: 4; b: -2 }> extends ExponentiateUnit<AddSymbols<{ a: 2; b: -1 }>, 2>
    ? true
    : never;
const SquaringWorks: SquaringWorks = true;

type CubingWorks = AddSymbols<{ a: 3 }> extends ExponentiateUnit<AddSymbols<{ a: 1 }>, 3> ? true : never;
const CubingWorks: CubingWorks = true;

type ExponentiationPropagatesErrors = IsArithmeticError<ExponentiateUnit<AddSymbols<{ a: -5; b: 1 }>, -2>>;
const ExponentiationPropagatesErrors: ExponentiationPropagatesErrors = true;

type SquareRootingWorks = AddSymbols<{ a: 2; b: -1 }> extends NthRootUnit<AddSymbols<{ a: 4; b: -2 }>, 2>
    ? true
    : never;
const SquareRootingWorks: SquareRootingWorks = true;

type CubeRootingWorks = AddSymbols<{ a: 1; b: -1 }> extends NthRootUnit<AddSymbols<{ a: 3; b: -3 }>, 3> ? true : never;
const CubeRootingWorks: CubeRootingWorks = true;

type NthRootableUnitAcceptsPerfectSquares = AddSymbols<{ a: 2; b: -4; c: 0 }> extends NthRootableUnit<2> ? true : never;
const NthRootableUnitAcceptsPerfectSquares: NthRootableUnitAcceptsPerfectSquares = true;

type NthRootableUnitRejectsNonPerfectSquares = AddSymbols<{ a: 2; b: 1 }> extends NthRootableUnit<2> ? never : true;
const NthRootableUnitRejectsNonPerfectSquares: NthRootableUnitRejectsNonPerfectSquares = true;

type NthRootableUnitAcceptsPerfectCubes = AddSymbols<{ a: 3; b: -3 }> extends NthRootableUnit<3> ? true : never;
const NthRootableUnitAcceptsPerfectCubes: NthRootableUnitAcceptsPerfectCubes = true;

type NthRootableUnitRejectsNonPerfectCubes = AddSymbols<{ a: 3; b: 2 }> extends NthRootableUnit<3> ? never : true;
const NthRootableUnitRejectsNonPerfectCubes: NthRootableUnitRejectsNonPerfectCubes = true;
