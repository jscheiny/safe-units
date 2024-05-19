import { GenericMeasure, Mass, NumericOperations, Unit, createMeasureType, wrapUnaryFn } from "safe-units";

class WrappedNumber {}
type WrappedMeasure<B, U extends Unit<B>> = GenericMeasure<WrappedNumber, B, U>;
declare const numericOperations: NumericOperations<WrappedNumber>;

// START
declare function foo(value: WrappedNumber): WrappedNumber;
declare const mass: Mass<WrappedNumber>;

const WrappedMeasure = createMeasureType(numericOperations, {
    foo: wrapUnaryFn(foo),
});

WrappedMeasure.foo(mass);
// END
