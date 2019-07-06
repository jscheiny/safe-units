import {
    genExponentName,
    genFileHeader,
    genImport,
    genUncurriedTypeName,
    getExponents,
    IExponentSpec,
    IOperatorSpec,
    isExponent,
} from "./common";

export function genOperatorTypes(spec: IOperatorSpec): string {
    const exponents = getExponents(spec);
    return [
        ...genFileHeader(),
        ...genImport("Exponent", "./exponent"),
        ...genUncurriedType(spec),
        ...genUncurriedTable(spec, exponents),
        ...genAllCurriedTables(spec, exponents),
    ].join("\n");
}

function genUncurriedType(spec: IOperatorSpec): string[] {
    const typeName = genUncurriedTypeName(spec, "L extends Exponent", "R extends Exponent");
    const tableName = genUncurriedTableName(spec);
    return [`export type ${typeName} = ${tableName}[L][R];`, ""];
}

function genUncurriedTable(spec: IOperatorSpec, exponents: IExponentSpec[]): string[] {
    const name = genUncurriedTableName(spec);
    const lines = [`interface ${name} {`];
    for (const left of exponents) {
        lines.push(indent(`${left.type}: ${genCurriedTableName(spec, left)};`));
    }
    lines.push("}", "");
    return lines;
}

function genUncurriedTableName(spec: IOperatorSpec): string {
    return `I${spec.uncurriedTypeNamePrefix}Table`;
}

function genAllCurriedTables(spec: IOperatorSpec, exponents: IExponentSpec[]): string[] {
    const lines: string[] = [];
    for (const left of exponents) {
        lines.push(...genCurriedTable(spec, exponents, left));
    }
    return lines;
}

function genCurriedTable(spec: IOperatorSpec, exponents: IExponentSpec[], left: IExponentSpec): string[] {
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

function genCurriedTableName(spec: IOperatorSpec, left: IExponentSpec): string {
    return `I${spec.curriedTypeNamePrefix}${genExponentName(left)}Table`;
}

function indent(line: string): string {
    return "    " + line;
}
