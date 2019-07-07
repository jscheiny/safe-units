import {
    ExponentSpec,
    genExponentName,
    genFileHeader,
    genImport,
    genUncurriedTypeName,
    getExponents,
    isExponent,
    OperatorSpec,
} from "./common";

export function genOperatorTypes(spec: OperatorSpec): string {
    const exponents = getExponents(spec);
    return [
        ...genFileHeader(),
        ...genImport("Exponent", "./exponent"),
        ...genUncurriedType(spec),
        ...genUncurriedTable(spec, exponents),
        ...genAllCurriedTables(spec, exponents),
    ].join("\n");
}

function genUncurriedType(spec: OperatorSpec): string[] {
    const typeName = genUncurriedTypeName(spec, "L extends Exponent", "R extends Exponent");
    const tableName = genUncurriedTableName(spec);
    return [`export type ${typeName} = ${tableName}[L][R];`, ""];
}

function genUncurriedTable(spec: OperatorSpec, exponents: ExponentSpec[]): string[] {
    const name = genUncurriedTableName(spec);
    const lines = [`interface ${name} {`];
    for (const left of exponents) {
        lines.push(indent(`${left.type}: ${genCurriedTableName(spec, left)};`));
    }
    lines.push("}", "");
    return lines;
}

function genUncurriedTableName(spec: OperatorSpec): string {
    return `I${spec.uncurriedTypeNamePrefix}Table`;
}

function genAllCurriedTables(spec: OperatorSpec, exponents: ExponentSpec[]): string[] {
    const lines: string[] = [];
    for (const left of exponents) {
        lines.push(...genCurriedTable(spec, exponents, left));
    }
    return lines;
}

function genCurriedTable(spec: OperatorSpec, exponents: ExponentSpec[], left: ExponentSpec): string[] {
    const name = genCurriedTableName(spec, left);
    const lines = [`interface ${name} {`];
    for (const right of exponents) {
        const result = spec.compute(left.value, right.value);
        const value = isExponent(result, spec) ? `"${result}"` : "never";
        lines.push(indent(`${right.type}: ${value};`));
    }
    lines.push("}", "");
    return lines;
}

function genCurriedTableName(spec: OperatorSpec, left: ExponentSpec): string {
    return `I${spec.curriedTypeNamePrefix}${genExponentName(left)}Table`;
}

function indent(line: string): string {
    return "    " + line;
}
