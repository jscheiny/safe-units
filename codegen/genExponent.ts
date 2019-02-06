import { genFileHeader, getExponents, ICommonSpec } from "./common";

export function genExponentType(spec: ICommonSpec): string {
    const exponents = getExponents(spec).join(" | ");
    return [
        ...genFileHeader(false),
        `export type Exponent = ${exponents};`,
        `export type ArithmeticError = "UnitError" & "Arithmetic out of bounds";`,
        "",
    ].join("\n");
}
