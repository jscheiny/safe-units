import { Length, NumericOperations, createMeasureType, createSIBaseUnits } from "safe-units";

class BigNumber {
    constructor(public value: string) {}
}
declare const numericOps: NumericOperations<BigNumber>;

// START
const BigNumberMeasure = createMeasureType<BigNumber>(numericOps);
const { meters, kilograms, seconds, ...rest } = createSIBaseUnits(BigNumberMeasure);

const bigValue = new BigNumber("3.14");
const bigLength: Length<BigNumber> = BigNumberMeasure.of(bigValue, meters);
// END

console.log(bigLength, meters, kilograms, seconds, rest);
