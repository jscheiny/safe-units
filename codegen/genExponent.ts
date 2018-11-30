import { CommonSpec, genFileHeader, getExponents } from "./common";

export function genExponentType(spec: CommonSpec): string {
    const exponents = getExponents(spec).join(" | ");
    return [
        ...genFileHeader(false),
        `export type Exponent = ${exponents};`,
        `export type ArithmeticError = "UnitError" & "Arithmetic out of bounds";`,
        "",
    ].join("\n");
}
