import { IsArithmeticError, IsSame } from "../../exponent";
import {
    DivideUnits,
    ExponentiableUnit,
    ExponentiateUnit,
    MultiplyUnits,
    NthRootableUnit,
    NthRootUnit,
    Unit,
} from "../types";

// MultiplyUnits

type SelfMultiplicationWorks = IsSame<{ a: 4 }, MultiplyUnits<{ a: 2 }, { a: 2 }>>;
const SelfMultiplicationWorks: SelfMultiplicationWorks = true;

type MultiplySeveralDimensionsWorks = IsSame<{ b: 1; c: 1 }, MultiplyUnits<{ a: 2; b: -1 }, { a: -2; b: 2; c: 1 }>>;
const MultiplySeveralDimensionsWorks: MultiplySeveralDimensionsWorks = true;

type MultiplicationPropagatesErrors = IsArithmeticError<MultiplyUnits<{ a: -5; b: 2 }, { a: -5; b: 1 }>>;
const MultiplicationPropagatesErrors: MultiplicationPropagatesErrors = true;

// DivideUnits

type DivisionWorks = IsSame<{ b: 1; c: 1 }, DivideUnits<{ a: 2; b: -1 }, { a: 2; b: -2; c: -1 }>>;
const DivisionWorks: DivisionWorks = true;

type DivisionPropagatesErrors = IsArithmeticError<DivideUnits<{ a: -5; b: 1 }, { a: 5; b: 2 }>>;
const DivisionPropagatesErrors: DivisionPropagatesErrors = true;

// ExponentiateUnit

type RaisingToTheZeroWorks = IsSame<{}, ExponentiateUnit<{ a: 2; b: -1 }, 0>>;
const RaisingToTheZeroWorks: RaisingToTheZeroWorks = true;

type RaisingToTheOneWorks = IsSame<{ a: 2; b: 3 }, ExponentiateUnit<{ a: 2; b: 3 }, 1>>;
const RaisingToTheOneWorks: RaisingToTheOneWorks = true;

type SquaringWorks = IsSame<{ a: 4; b: -2 }, ExponentiateUnit<{ a: 2; b: -1 }, 2>>;
const SquaringWorks: SquaringWorks = true;

type CubingWorks = IsSame<{ a: 3 }, ExponentiateUnit<{ a: 1 }, 3>>;
const CubingWorks: CubingWorks = true;

type ExponentiationPropagatesErrors = IsArithmeticError<ExponentiateUnit<{ a: -5; b: 1 }, -2>>;
const ExponentiationPropagatesErrors: ExponentiationPropagatesErrors = true;

// ExponentiableUnit

type ExponentiableUnitAcceptsSquareRoots = { a: 2; b: 1 } extends ExponentiableUnit<2> ? true : never;
const ExponentiableUnitAcceptsSquareRoots: ExponentiableUnitAcceptsSquareRoots = true;

type ExponentiableUnitRejectsLargeExponents = { a: 2; b: -3 } extends ExponentiableUnit<2> ? never : true;
const ExponentiableUnitRejectsLargeExponents: ExponentiableUnitRejectsLargeExponents = true;

type ExponentiableUnitAcceptsCubeRoots = { a: 1; b: 0 } extends ExponentiableUnit<3> ? true : never;
const ExponentiableUnitAcceptsCubeRoots: ExponentiableUnitAcceptsCubeRoots = true;

type ExponentiableUnitAllowsAllUnitsFor1 = Unit extends ExponentiableUnit<1> ? true : never;
const ExponentiableUnitAllowsAllUnitsFor1: ExponentiableUnitAllowsAllUnitsFor1 = true;

type ExponentiableUnitAllowsAllUnitsFor0 = Unit extends ExponentiableUnit<0> ? true : never;
const ExponentiableUnitAllowsAllUnitsFor0: ExponentiableUnitAllowsAllUnitsFor0 = true;

// NthRootUnit

type SquareRootingWorks = IsSame<{ a: 2; b: -1 }, NthRootUnit<{ a: 4; b: -2 }, 2>>;
const SquareRootingWorks: SquareRootingWorks = true;

type CubeRootingWorks = IsSame<{ a: 1; b: -1 }, NthRootUnit<{ a: 3; b: -3 }, 3>>;
const CubeRootingWorks: CubeRootingWorks = true;

// NthRootableUnit

type NthRootableUnitAcceptsPerfectSquares = { a: 2; b: -4; c: 0 } extends NthRootableUnit<2> ? true : never;
const NthRootableUnitAcceptsPerfectSquares: NthRootableUnitAcceptsPerfectSquares = true;

type NthRootableUnitRejectsNonPerfectSquares = { a: 2; b: 1 } extends NthRootableUnit<2> ? never : true;
const NthRootableUnitRejectsNonPerfectSquares: NthRootableUnitRejectsNonPerfectSquares = true;

type NthRootableUnitAcceptsPerfectCubes = { a: 3; b: -3 } extends NthRootableUnit<3> ? true : never;
const NthRootableUnitAcceptsPerfectCubes: NthRootableUnitAcceptsPerfectCubes = true;

type NthRootableUnitRejectsNonPerfectCubes = { a: 3; b: 2 } extends NthRootableUnit<3> ? never : true;
const NthRootableUnitRejectsNonPerfectCubes: NthRootableUnitRejectsNonPerfectCubes = true;
