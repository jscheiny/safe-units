import { CommonSpec, genFileHeader, getExponents } from "./common";

export function genExponentType(spec: CommonSpec): string {
    const exponents = getExponents(spec)
        .map(exponent => exponent.type)
        .join(" | ");
    return [...genFileHeader(false), `export type Exponent = ${exponents};`, ""].join("\n");
}
