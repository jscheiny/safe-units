import {
    genFileHeader,
    genImports,
    genUncurriedTypeName,
    genValueName,
    getExponents,
    isExponent,
    OperatorSpec,
} from "./common";

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
            { symbols: ["IsArithmeticError"], source: "../common" },
            { symbols: [genUncurriedTypeName(spec)], source: `../${spec.fileNamePrefix}` },
        ),
        "",
    ];
}

function genTest(spec: OperatorSpec, left: number, right: number): string[] {
    const result = spec.compute(left, right);
    if (isExponent(result, spec)) {
        return genValueTest(spec, left, right, result);
    } else {
        return genErrorTest(spec, left, right);
    }
}

function genValueTest(spec: OperatorSpec, left: number, right: number, result: number): string[] {
    const typeName = genTestBaseName(spec, left, right);
    return [
        `type ${typeName} = ${genUncurriedTypeName(spec, left, right)};`,
        `const ${typeName}: ${typeName} = ${result};`,
    ];
}

function genErrorTest(spec: OperatorSpec, left: number, right: number): string[] {
    const typeName = `${genTestBaseName(spec, left, right)}IsError`;
    return [
        `type ${typeName} = IsArithmeticError<${genUncurriedTypeName(spec, left, right)}>;`,
        `const ${typeName}: ${typeName} = true;`,
    ];
}

function genTestBaseName(spec: OperatorSpec, left: number, right: number) {
    return `${spec.testTypeNamePrefix}Of${genValueName(left)}And${genValueName(right)}`;
}
