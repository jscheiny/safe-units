import { CommonOperatorCodeGenOptions, genFileHeader, getExponents } from "./common";

export function genCommonTypes(options: CommonOperatorCodeGenOptions): string {
    return [
        ...genFileHeader(false),
        ...genExtremaType("Min", options.minExponent),
        ...genExtremaType("Max", options.maxExponent),
        ...genUnionType(options),
        ...genErrorType(),
    ].join("\n");
}

function genExtremaType(prefix: string, exponent: number): string[] {
    const name = `${prefix}Exponent`;
    const type = `export type ${name} = ${exponent};`;
    const value = `export const ${name}: ${name} = ${exponent};`;
    return [type, value, ""];
}

function genUnionType(options: CommonOperatorCodeGenOptions): string[] {
    const exponents = getExponents(options).join(" | ");
    return [`export type Exponent = ${exponents};`, ""];
}

function genErrorType(): string[] {
    return [
        `export type ArithmeticError = "UnitError" & "Arithmetic out of bounds";`,
        `export const ArithmeticError = "Arithmetic out of bounds";`,
        "",
    ];
}
