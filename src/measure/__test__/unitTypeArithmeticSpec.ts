import { Exponent, IsSame } from "../../exponent";
import {
    AllowedExponents,
    DivideUnits,
    ExponentiateUnit,
    MultiplicandUnit,
    MultiplyUnits,
    NthRootUnit,
    RadicandUnit,
} from "../unitTypeArithmetic";

// MultiplyUnits

type SelfMultiplicationWorks = IsSame<{ a: 4 }, MultiplyUnits<{ a: 2 }, { a: 2 }>>;
const SelfMultiplicationWorks: SelfMultiplicationWorks = true;

type MultiplySeveralDimensionsWorks = IsSame<{ b: 1; c: 1 }, MultiplyUnits<{ a: 2; b: -1 }, { a: -2; b: 2; c: 1 }>>;
const MultiplySeveralDimensionsWorks: MultiplySeveralDimensionsWorks = true;

// MultiplicandUnit

type MultiplicandAllowsOtherDimsWithAnyExponent = { b: Exponent } extends MultiplicandUnit<{ a: 2 }> ? true : never;
const MultiplicandAllowsOtherDimsWithAnyExponent: MultiplicandAllowsOtherDimsWithAnyExponent = true;

type MultiplicandRejectsSameDimWithBadExponent = { a: -4 } extends MultiplicandUnit<{ a: -2 }> ? never : true;
const MultiplicandRejectsSameDimWithBadExponent: MultiplicandRejectsSameDimWithBadExponent = true;

type MultiplicandAcceptsSameDimWithGoodExponent = { a: 2 } extends MultiplicandUnit<{ a: 3 }> ? true : never;
const MultiplicandAcceptsSameDimWithGoodExponent: MultiplicandAcceptsSameDimWithGoodExponent = true;

type MultiplicandAllowsMultiDims = { a: 3; c: -4; d: 5 } extends MultiplicandUnit<{ a: 1; c: 2 }> ? true : never;
const MultiplicandAllowsMultiDims: MultiplicandAllowsMultiDims = true;

type MultiplicandRejectsMultiDims = { a: 1; c: 0 } extends MultiplicandUnit<{ a: 5; b: -5 }> ? never : true;
const MultiplicandRejectsMultiDims: MultiplicandRejectsMultiDims = true;

// DivideUnits

type DivisionWorks = IsSame<{ b: 1; c: 1 }, DivideUnits<{ a: 2; b: -1 }, { a: 2; b: -2; c: -1 }>>;
const DivisionWorks: DivisionWorks = true;

// ExponentiateUnit

type RaisingToTheZeroWorks = IsSame<{}, ExponentiateUnit<{ a: 2; b: -1 }, 0>>;
const RaisingToTheZeroWorks: RaisingToTheZeroWorks = true;

type RaisingToTheOneWorks = IsSame<{ a: 2; b: 3 }, ExponentiateUnit<{ a: 2; b: 3 }, 1>>;
const RaisingToTheOneWorks: RaisingToTheOneWorks = true;

type SquaringWorks = IsSame<{ a: 4; b: -2 }, ExponentiateUnit<{ a: 2; b: -1 }, 2>>;
const SquaringWorks: SquaringWorks = true;

type CubingWorks = IsSame<{ a: 3 }, ExponentiateUnit<{ a: 1 }, 3>>;
const CubingWorks: CubingWorks = true;

// AllowedExponents

type AllowedLargeExponentWorks = IsSame<Exponent, AllowedExponents<{ a: 1; b: 0 }>>;
const AllowedLargeExponentWorks: AllowedLargeExponentWorks = true;

type AllowedMediumExponentWorks = IsSame<-2 | -1 | 0 | 1 | 2, AllowedExponents<{ a: 2; b: 1 }>>;
const AllowedMediumExponentWorks: AllowedMediumExponentWorks = true;

type AllowedSmallExponentWorks = IsSame<-1 | 0 | 1, AllowedExponents<{ a: 3; b: 1 }>>;
const AllowedSmallExponentWorks: AllowedSmallExponentWorks = true;

// NthRootUnit

type SquareRootingWorks = IsSame<{ a: 2; b: -1 }, NthRootUnit<{ a: 4; b: -2 }, 2>>;
const SquareRootingWorks: SquareRootingWorks = true;

type CubeRootingWorks = IsSame<{ a: 1; b: -1 }, NthRootUnit<{ a: 3; b: -3 }, 3>>;
const CubeRootingWorks: CubeRootingWorks = true;

// RadicandUnit

type RadicandUnitAcceptsPerfectSquares = { a: 2; b: -4; c: 0 } extends RadicandUnit<2> ? true : never;
const RadicandUnitAcceptsPerfectSquares: RadicandUnitAcceptsPerfectSquares = true;

type RadicandUnitRejectsNonPerfectSquares = { a: 2; b: 1 } extends RadicandUnit<2> ? never : true;
const RadicandUnitRejectsNonPerfectSquares: RadicandUnitRejectsNonPerfectSquares = true;

type RadicandUnitAcceptsPerfectCubes = { a: 3; b: -3 } extends RadicandUnit<3> ? true : never;
const RadicandUnitAcceptsPerfectCubes: RadicandUnitAcceptsPerfectCubes = true;

type RadicandUnitRejectsNonPerfectCubes = { a: 3; b: 2 } extends RadicandUnit<3> ? never : true;
const RadicandUnitRejectsNonPerfectCubes: RadicandUnitRejectsNonPerfectCubes = true;
