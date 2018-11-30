import { genFileHeader, genImports, genUncurriedTypeName, getExponents, isExponent, OperatorSpec } from "./common";

export function genOperatorTests(spec: OperatorSpec): string {
    const lines: string[] = [
        ...genFileHeader(false),
        ...genImports({ symbols: [genUncurriedTypeName(spec)], source: "../../../src/exponent" }),
        "",
    ];
    const exponents = getExponents(spec);
    for (const left of exponents) {
        for (const right of exponents) {
            lines.push(genTest(spec, left, right));
        }
    }
    lines.push("");
    return lines.join("\n");
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
