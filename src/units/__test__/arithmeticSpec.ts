import { IsArithmeticError } from "../../exponents/utils";
import { DivideUnits, ExponentiateUnit, GetExponent, MultiplyUnits, NthRootUnit, StripZeroes } from "../types";

type Basis = "x" | "y" | "z";

type GetPresentExponentWorks = 2 extends GetExponent<Basis, { x: 2; y: 0 }, "x"> ? true : never;
const GetPresentExponentWorks: GetPresentExponentWorks = true;

type GetMissingExponentWorks = 0 extends GetExponent<Basis, { x: 2; y: 0 }, "z"> ? true : never;
const GetMissingExponentWorks: GetMissingExponentWorks = true;

type StripZeroesWorks = { y: 1 } extends StripZeroes<Basis, { x: 0; y: 1; z: 0 }> ? true : never;
const StripZeroesWorks: StripZeroesWorks = true;

type SelfMultiplicationWorks = { x: 4 } extends MultiplyUnits<Basis, { x: 2 }, { x: 2 }> ? true : never;
const SelfMultiplicationWorks: SelfMultiplicationWorks = true;

type MultiplySeveralDimensionsWorks = { x: 1; z: 1 } extends MultiplyUnits<
    Basis,
    { y: 2; z: -1 },
    { x: 1; y: -2; z: 2 }
>
    ? true
    : never;
const MultiplySeveralDimensionsWorks: MultiplySeveralDimensionsWorks = true;

type MultiplicationPropagatesErrors = IsArithmeticError<MultiplyUnits<Basis, { x: -5; y: 2 }, { x: -5; y: 1 }>>;
const MultiplicationPropagatesErrors: MultiplicationPropagatesErrors = true;

type DivisionWorks = { x: 1; z: 1 } extends DivideUnits<Basis, { y: 2; z: -1 }, { x: -1; y: 2; z: -2 }> ? true : never;
const DivisionWorks: DivisionWorks = true;

type DivisionPropagatesErrors = IsArithmeticError<DivideUnits<Basis, { x: -5; y: 1 }, { x: 5; y: 2 }>>;
const DivisionPropagatesErrors: DivisionPropagatesErrors = true;

type RaisingToTheZeroWorks = {} extends ExponentiateUnit<Basis, { x: 2; y: -1 }, 0> ? true : never;
const RaisingToTheZeroWorks: RaisingToTheZeroWorks = true;

type RaisingToTheOneWorks = { x: 2; y: 3 } extends ExponentiateUnit<Basis, { x: 2; y: 3 }, 1> ? true : never;
const RaisingToTheOneWorks: RaisingToTheOneWorks = true;

type SquaringWorks = { x: 4; y: -2 } extends ExponentiateUnit<Basis, { x: 2; y: -1 }, 2> ? true : never;
const SquaringWorks: SquaringWorks = true;

type CubingWorks = { x: 3 } extends ExponentiateUnit<Basis, { x: 1 }, 3> ? true : never;
const CubingWorks: CubingWorks = true;

type ExponentiationPropagatesErrors = IsArithmeticError<ExponentiateUnit<Basis, { x: -5; y: 1 }, -2>>;
const ExponentiationPropagatesErrors: ExponentiationPropagatesErrors = true;

type SquareRootingWorks = { x: 2; y: -1 } extends NthRootUnit<Basis, { x: 4; y: -2 }, 2> ? true : never;
const SquareRootingWorks: SquareRootingWorks = true;

type CubeRootingWorks = { x: 1; y: -1 } extends NthRootUnit<Basis, { x: 3; y: -3 }, 3> ? true : never;
const CubeRootingWorks: CubeRootingWorks = true;

type NthRootPropagatesErrors = IsArithmeticError<NthRootUnit<Basis, { x: 3 }, 2>>;
const NthRootPropagatesErrors: NthRootPropagatesErrors = true;
