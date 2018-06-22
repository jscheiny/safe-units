import { CommonSpec, genFileHeader, getExponents } from "./common";

export function genCommonTypes(spec: CommonSpec): string {
    return [
        ...genFileHeader(false),
        ...genExtremaType("Min", spec.minExponent),
        ...genExtremaType("Max", spec.maxExponent),
        ...genUnionType(spec),
        ...genErrorType(),
    ].join("\n");
}

function genExtremaType(prefix: string, exponent: number): string[] {
    const name = `${prefix}Exponent`;
    const type = `export type ${name} = ${exponent};`;
    const value = `export const ${name}: ${name} = ${exponent};`;
    return [type, value, ""];
}

function genUnionType(spec: CommonSpec): string[] {
    const exponents = getExponents(spec).join(" | ");
    return [`export type Exponent = ${exponents};`, ""];
}

function genErrorType(): string[] {
    return [
        `export type ArithmeticError = "UnitError" & "Arithmetic out of bounds";`,
        `export const ArithmeticError = "Arithmetic out of bounds";`,
        `export type IsArithmeticError<T> = T extends ArithmeticError ? true : false;`,
        "",
    ];
}
