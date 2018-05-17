import { emitOperator } from "./emit";

emitOperator({
    fileNamePrefix: "addition",
    uncurriedTypeNamePrefix: "Add",
    curriedTypeNamePrefix: "Add",
    testTypeNamePrefix: "Sum",
    specialCases: {
        [0]: "R",
    },
    compute: (left, right) => left + right,
});

emitOperator({
    fileNamePrefix: "multiplication",
    uncurriedTypeNamePrefix: "Multiply",
    curriedTypeNamePrefix: "MultiplyBy",
    testTypeNamePrefix: "Product",
    specialCases: {
        [0]: "0",
        [1]: "R",
    },
    compute: (left, right) => left * right,
});

emitOperator({
    fileNamePrefix: "division",
    uncurriedTypeNamePrefix: "Divide",
    curriedTypeNamePrefix: "DividedBy",
    testTypeNamePrefix: "Quotient",
    specialCases: {
        [0]: "(R extends 0 ? ArithmeticError : 0)",
    },
    compute: (left, right) => left / right,
});
