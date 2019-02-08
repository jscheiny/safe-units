import { ICodeGenSpec } from "./common";

const maxExponent = 5;

export const codeGenSpec: ICodeGenSpec = {
    minExponent: -maxExponent,
    maxExponent,
    operators: [
        {
            fileNamePrefix: "addition",
            uncurriedTypeNamePrefix: "Add",
            curriedTypeNamePrefix: "Add",
            testTypeNamePrefix: "Sum",
            specialCases: {
                0: "R",
            },
            compute: (left, right) => left + right,
        },
        {
            fileNamePrefix: "multiplication",
            uncurriedTypeNamePrefix: "Multiply",
            curriedTypeNamePrefix: "MultiplyBy",
            testTypeNamePrefix: "Product",
            specialCases: {
                0: "0",
                1: "R",
            },
            compute: (left, right) => left * right,
        },
        {
            fileNamePrefix: "division",
            uncurriedTypeNamePrefix: "Divide",
            curriedTypeNamePrefix: "DividedBy",
            testTypeNamePrefix: "Quotient",
            specialCases: {
                0: "(R extends 0 ? never : 0)",
            },
            compute: (left, right) => left / right,
        },
    ],
};
