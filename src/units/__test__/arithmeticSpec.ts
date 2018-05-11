import { StripZeroes, FillZeroes, MultiplyUnits, DivideUnits, ExponentiateUnit } from "../types";
import { IsArithmeticError } from "../../exponents/__test__/utils";

type FillZeroesWorks = { mass: 2; time: 0; length: 0 } extends FillZeroes<{ mass: 2; time: 0 }> ? true : never;
const FillZeroesWorks: FillZeroesWorks = true;

type StripZeroesWorks = { length: 1 } extends StripZeroes<{ mass: 0; length: 1; time: 0 }> ? true : never;
const StripZeroesWorks: StripZeroesWorks = true;

type SelfMultiplicationWorks = { mass: 4 } extends MultiplyUnits<{ mass: 2 }, { mass: 2 }> ? true : never;
const SelfMultiplicationWorks: SelfMultiplicationWorks = true;

type MultiplySeveralDimensionsWorks = { length: 1; time: 1 } extends MultiplyUnits<
    { mass: 2; length: -1 },
    { time: 1; mass: -2; length: 2 }
>
    ? true
    : never;
const MultiplySeveralDimensionsWorks: MultiplySeveralDimensionsWorks = true;

type MultiplicationPropagatesErrors = IsArithmeticError<MultiplyUnits<{ mass: -5; time: 2 }, { mass: -5; time: 1 }>>;
const MultiplicationPropagatesErrors: MultiplicationPropagatesErrors = true;

type DivisionWorks = { length: 1; time: 1 } extends DivideUnits<
    { mass: 2; length: -1 },
    { time: -1; mass: 2; length: -2 }
>
    ? true
    : never;
const DivisionWorks: DivisionWorks = true;

type DivisionPropagatesErrors = IsArithmeticError<DivideUnits<{ mass: -5; time: 1 }, { mass: 5; time: 2 }>>;
const DivisionPropagatesErrors: DivisionPropagatesErrors = true;

type RaisingToTheZeroWorks = {} extends ExponentiateUnit<{ mass: 2; length: -1 }, 0> ? true : never;
const RaisingToTheZeroWorks: RaisingToTheZeroWorks = true;

type RaisingToTheOneWorks = { length: 2; mass: 3 } extends ExponentiateUnit<{ length: 2; mass: 3 }, 1> ? true : never;
const RaisingToTheOneWorks: RaisingToTheOneWorks = true;

type SquaringWorks = { length: 4; time: -2 } extends ExponentiateUnit<{ length: 2; time: -1 }, 2> ? true : never;
const SquaringWorks: SquaringWorks = true;

type CubingWorks = { mass: 3 } extends ExponentiateUnit<{ mass: 1 }, 3> ? true : never;
const CubingWorks: CubingWorks = true;

type ExponentiationPropagatesErrors = IsArithmeticError<ExponentiateUnit<{ mass: -5; time: 1 }, -2>>;
const ExponentiationPropagatesErrors: ExponentiationPropagatesErrors = true;
