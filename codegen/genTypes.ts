import {
    genFileHeader,
    genImport,
    genUncurriedTypeName,
    genValueName,
    getExponents,
    indent,
    isExponent,
    OperatorCodeGenOptions,
} from "./common";

export function genOperatorTypes(options: OperatorCodeGenOptions): string {
    const exponents = getExponents(options);
    let lines: string[] = [...genFileHeader(), ...genImports(), ...genUncurriedType(options, exponents)];
    for (const left of exponents) {
        if (!(left in options.specialCases)) {
            lines.push(...genCurriedType(options, exponents, left));
        }
    }
    return lines.join("\n");
}

function genImports(): string[] {
    return [genImport(["ArithmeticError", "Exponent"], "./common"), ""];
}

function genUncurriedType(options: OperatorCodeGenOptions, exponents: number[]): string[] {
    const lines = [`export type ${genUncurriedTypeName(options, "L extends Exponent", "R extends Exponent")}`];
    let first = true;
    for (const left of exponents) {
        const operator = first ? "=" : ":";
        const prefix = indent(`${operator} L extends ${left} ?`);
        first = false;
        if (left in options.specialCases) {
            lines.push(`${prefix} ${options.specialCases[left]}`);
        } else {
            lines.push(`${prefix} ${genCurriedTypeName(options, left)}<R>`);
        }
    }
    lines.push(genErrorCase());
    lines.push("");
    return lines;
}

function genCurriedType(options: OperatorCodeGenOptions, exponents: number[], left: number): string[] {
    const lines = [`export type ${genCurriedTypeName(options, left)}<N extends Exponent>`];
    let first = true;
    for (const right of exponents) {
        const result = options.compute(left, right);
        if (isExponent(result, options)) {
            const operator = first ? "=" : ":";
            first = false;
            lines.push(indent(`${operator} N extends ${right} ? ${result}`));
        }
    }
    lines.push(genErrorCase());
    lines.push("");
    return lines;
}

function genCurriedTypeName({ curriedTypeNamePrefix }: OperatorCodeGenOptions, value: number): string {
    return `${curriedTypeNamePrefix}${genValueName(value)}`;
}

function genErrorCase() {
    return indent(": ArithmeticError;");
}
