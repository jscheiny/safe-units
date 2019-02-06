import { genFileHeader, genImport, genUncurriedTypeName, getExponents, IOperatorSpec, isExponent } from "./common";

const ARITHMETIC_ERROR = "ArithmeticError";

export function genOperatorTypes(spec: IOperatorSpec): string {
    const exponents = getExponents(spec);
    return [
        ...genFileHeader(),
        ...genImport(["ArithmeticError", "Exponent"], "./exponent"),
        ...genUncurriedType(spec, exponents),
    ].join("\n");
}

function genUncurriedType(spec: IOperatorSpec, exponents: number[]): string[] {
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

function genCurriedType(spec: IOperatorSpec, exponents: number[], left: number): string[] {
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
