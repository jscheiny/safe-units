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

export function genOperatorTests(spec: IOperatorSpec): string {
    return [
        ...genFileHeader(false),
        ...genImport(genUncurriedTypeName(spec), "../../../src/exponent"),
        ...genTests(spec),
    ].join("\n");
}

function genTests(spec: IOperatorSpec): string[] {
    const lines: string[] = [];
    const exponents = getExponents(spec);
    for (const left of exponents) {
        for (const right of exponents) {
            lines.push(genTest(spec, left, right));
        }
    }
    lines.push("");
    return lines;
}

function genTest(spec: IOperatorSpec, left: IExponentSpec, right: IExponentSpec): string {
    const result = spec.compute(left.value, right.value);
    const typeName = `${spec.testTypeNamePrefix}Of${genExponentName(left)}And${genExponentName(right)}`;
    const testType = `${genUncurriedTypeName(spec, left.type, right.type)}`;
    const expectedType = isExponent(result, spec) ? `"${result}"` : "never";
    return `type ${typeName} = ${testType}; // $ExpectType ${expectedType}`;
}
