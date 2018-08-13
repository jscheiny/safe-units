import { genFileHeader, genImports, genUncurriedTypeName, getExponents, isExponent, OperatorSpec } from "./common";

export function genOperatorTests(spec: OperatorSpec): string {
    const lines: string[] = [...genFileHeader(false), ...genTestsImports(spec)];
    const exponents = getExponents(spec);
    for (const left of exponents) {
        for (const right of exponents) {
            lines.push(...genTest(spec, left, right));
            lines.push("");
        }
    }
    return lines.join("\n");
}

function genTestsImports(spec: OperatorSpec): string[] {
    return [
        ...genImports(
            { symbols: ["IsArithmeticError", "IsSame"], source: "../../common" },
            { symbols: [genUncurriedTypeName(spec)], source: `../${spec.fileNamePrefix}` },
        ),
        "",
    ];
}

function genTest(spec: OperatorSpec, left: number, right: number): string[] {
    const result = spec.compute(left, right);
    const { nameSuffix, testType } = isExponent(result, spec)
        ? genValueTest(spec, left, right, result)
        : genErrorTest(spec, left, right);
    const typeName = `${genTestBaseName(spec, left, right)}${nameSuffix}`;
    const definition = `type ${typeName} = ${testType};`;
    const assertion = `const ${typeName}: ${typeName} = true;`;
    return [definition, assertion];
}

interface TypeTestInfo {
    nameSuffix: string;
    testType: string;
}

function genValueTest(spec: OperatorSpec, left: number, right: number, result: number): TypeTestInfo {
    return {
        nameSuffix: `Is${genValueName(result)}`,
        testType: `IsSame<${genUncurriedTypeName(spec, left, right)}, ${result}>`,
    };
}

function genErrorTest(spec: OperatorSpec, left: number, right: number): TypeTestInfo {
    return {
        nameSuffix: "IsError",
        testType: `IsArithmeticError<${genUncurriedTypeName(spec, left, right)}>`,
    };
}

function genTestBaseName(spec: OperatorSpec, left: number, right: number): string {
    return `${spec.testTypeNamePrefix}Of${genValueName(left)}And${genValueName(right)}`;
}

function genValueName(value: number): string {
    if (value === 0) {
        return "0";
    }
    const sign = value < 0 ? "Negative" : "Positive";
    return `${sign}${Math.abs(value)}`;
}
