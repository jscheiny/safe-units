// START
class WrappedNumber {
    constructor(public readonly value: number) {}

    declare foo: () => WrappedNumber;
    // ...
}

function wrap(value: number) {
    return new WrappedNumber(value);
}
// END

export { WrappedNumber, wrap };
