import { IsArithmeticError } from "../../exponent";
import { DivideUnits, ExponentiateUnit, MultiplyUnits, NthRootableUnit, NthRootUnit } from "../types";
import {} from "./testUtils";

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

type NthRootableUnitAcceptsPerfectSquares = { a: 2; b: -4; c: 0 } extends NthRootableUnit<2> ? true : never;
const NthRootableUnitAcceptsPerfectSquares: NthRootableUnitAcceptsPerfectSquares = true;

type NthRootableUnitRejectsNonPerfectSquares = { a: 2; b: 1 } extends NthRootableUnit<2> ? never : true;
const NthRootableUnitRejectsNonPerfectSquares: NthRootableUnitRejectsNonPerfectSquares = true;

type NthRootableUnitAcceptsPerfectCubes = { a: 3; b: -3 } extends NthRootableUnit<3> ? true : never;
const NthRootableUnitAcceptsPerfectCubes: NthRootableUnitAcceptsPerfectCubes = true;

type NthRootableUnitRejectsNonPerfectCubes = { a: 3; b: 2 } extends NthRootableUnit<3> ? never : true;
const NthRootableUnitRejectsNonPerfectCubes: NthRootableUnitRejectsNonPerfectCubes = true;
