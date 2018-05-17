import {
    EXPONENTS,
    genImport,
    genValueName,
    OperatorCodeGenOptions,
    genFileHeader,
    genUncurriedTypeName,
} from "./common";

export function genOperatorTests(options: OperatorCodeGenOptions): string {
    const lines: string[] = [...genFileHeader(), ...genImports(options)];
    for (const left of EXPONENTS) {
        for (const right of EXPONENTS) {
            lines.push(...genTest(options, left, right));
            lines.push("");
        }
    }
    return lines.join("\n");
}

export function genImports(options: OperatorCodeGenOptions): string[] {
    return [
        genImport([genUncurriedTypeName(options)], `../${options.fileNamePrefix}`),
        genImport(["IsArithmeticError"], "../utils"),
        "",
    ];
}

function genTest(options: OperatorCodeGenOptions, left: number, right: number): string[] {
    const result = options.compute(left, right);
    if (EXPONENTS.indexOf(result) !== -1) {
        return genValueTest(options, left, right, result);
    } else {
        return genErrorTest(options, left, right);
    }
}

function genValueTest(options: OperatorCodeGenOptions, left: number, right: number, result: number): string[] {
    const typeName = genTestBaseName(options, left, right);
    return [
        `type ${typeName} = ${genUncurriedTypeName(options, left, right)};`,
        `const ${typeName}: ${typeName} = ${result};`,
    ];
}

function genErrorTest(options: OperatorCodeGenOptions, left: number, right: number): string[] {
    const typeName = `${genTestBaseName(options, left, right)}IsError`;
    return [
        `type ${typeName} = IsArithmeticError<${genUncurriedTypeName(options, left, right)}>;`,
        `const ${typeName}: ${typeName} = true;`,
    ];
}

function genTestBaseName(options: OperatorCodeGenOptions, left: number, right: number) {
    return `${options.testTypeNamePrefix}Of${genValueName(left)}And${genValueName(right)}`;
}
