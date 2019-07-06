import { genFileHeader, getExponents, ICommonSpec } from "./common";

export function genExponentType(spec: ICommonSpec): string {
    const exponents = getExponents(spec)
        .map(exponent => exponent.type)
        .join(" | ");
    return [...genFileHeader(), `export type Exponent = ${exponents};`, ""].join("\n");
}
