import { CommonSpec, genFileHeader, getExponent, getExponents } from "./common";

export function genExponentType(spec: CommonSpec): string {
    const exponents = getExponents(spec)
        .map(exponent => exponent.type)
        .join(" | ");
    return [
        ...genFileHeader(),
        `export type Exponent = ${exponents};`,
        `export type MinExponent = ${getExponent(spec.minExponent).type};`,
        `export type MaxExponent = ${getExponent(spec.maxExponent).type};`,
        "",
    ].join("\n");
}
