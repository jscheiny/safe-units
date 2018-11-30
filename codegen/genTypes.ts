import { genFileHeader, genImports, genUncurriedTypeName, getExponents, isExponent, OperatorSpec } from "./common";

const ARITHMETIC_ERROR = "ArithmeticError";

export function genOperatorTypes(spec: OperatorSpec): string {
    const exponents = getExponents(spec);
    return [
        ...genFileHeader(),
        ...genImports({ symbols: ["ArithmeticError", "Exponent"], source: "./exponent" }),
        "",
        ...genUncurriedType(spec, exponents),
    ].join("\n");
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
            lines.push(`${prefix}`);
            lines.push(...genCurriedType(spec, exponents, left));
        }
    }
    lines.push(indent(`: ${ARITHMETIC_ERROR};`));
    lines.push("");
    return lines;
}

function genCurriedType(spec: OperatorSpec, exponents: number[], left: number): string[] {
    const lines = ["("];
    for (const right of exponents) {
        const result = spec.compute(left, right);
        if (isExponent(result, spec)) {
            lines.push(indent(`R extends ${right} ? ${result} :`));
        }
    }
    lines.push(indent(ARITHMETIC_ERROR));
    lines.push(")");
    return lines.map(indent).map(indent);
}

function indent(line: string): string {
    return "    " + line;
}
