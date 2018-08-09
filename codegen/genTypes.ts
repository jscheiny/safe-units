import {
    genFileHeader,
    genImports,
    genUncurriedTypeName,
    genValueName,
    getExponents,
    indent,
    isExponent,
    OperatorSpec,
} from "./common";

export function genOperatorTypes(spec: OperatorSpec): string {
    const exponents = getExponents(spec);
    let lines: string[] = [...genFileHeader(), ...genTypesImports(), ...genUncurriedType(spec, exponents)];
    for (const left of exponents) {
        if (!(left in spec.specialCases)) {
            lines.push(...genCurriedType(spec, exponents, left));
        }
    }
    return lines.join("\n");
}

function genTypesImports(): string[] {
    return [...genImports({ symbols: ["ArithmeticError", "Exponent"], source: "./common" }), ""];
}

function genUncurriedType(spec: OperatorSpec, exponents: number[]): string[] {
    const lines = [`export type ${genUncurriedTypeName(spec, "L extends Exponent", "R extends Exponent")}`];
    let first = true;
    for (const left of exponents) {
        const operator = first ? "=" : ":";
        const prefix = indent(`${operator} L extends ${left} ?`);
        first = false;
        if (left in spec.specialCases) {
            lines.push(`${prefix} ${spec.specialCases[left]}`);
        } else {
            lines.push(`${prefix} ${genCurriedTypeName(spec, left)}<R>`);
        }
    }
    lines.push(genErrorCase());
    lines.push("");
    return lines;
}

function genCurriedType(spec: OperatorSpec, exponents: number[], left: number): string[] {
    const lines = [`type ${genCurriedTypeName(spec, left)}<N extends Exponent>`];
    let first = true;
    for (const right of exponents) {
        const result = spec.compute(left, right);
        if (isExponent(result, spec)) {
            const operator = first ? "=" : ":";
            first = false;
            lines.push(indent(`${operator} N extends ${right} ? ${result}`));
        }
    }
    lines.push(genErrorCase());
    lines.push("");
    return lines;
}

function genCurriedTypeName({ curriedTypeNamePrefix }: OperatorSpec, value: number): string {
    return `${curriedTypeNamePrefix}${genValueName(value)}`;
}

function genErrorCase(): string {
    return indent(": ArithmeticError;");
}
