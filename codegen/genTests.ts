import { genFileHeader, genImport, genUncurriedTypeName, getExponents, isExponent, OperatorSpec } from "./common";

export function genOperatorTests(spec: OperatorSpec): string {
    return [
        ...genFileHeader(false),
        ...genImport([genUncurriedTypeName(spec)], "../../../src/exponent"),
        ...genTests(spec),
    ].join("\n");
}

function genTests(spec: OperatorSpec): string[] {
    const lines: string[] = [];
    const exponents = getExponents(spec);
    for (const left of exponents) {
        for (const right of exponents) {
            lines.push(genTest(spec, left, right));
        }
    }
    lines.push("");
    return lines;
}

function genTest(spec: OperatorSpec, left: number, right: number): string {
    const result = spec.compute(left, right);
    const typeName = `${spec.testTypeNamePrefix}Of${genValueName(left)}And${genValueName(right)}`;
    const testType = `${genUncurriedTypeName(spec, left, right)}`;
    const expectedType = isExponent(result, spec) ? `${result}` : "ArithmeticError";
    return `type ${typeName} = ${testType}; // $ExpectType ${expectedType}`;
}

function genValueName(value: number): string {
    if (value === 0) {
        return "Zero";
    }
    const sign = value < 0 ? "Neg" : "Pos";
    return `${sign}${Math.abs(value)}`;
}
