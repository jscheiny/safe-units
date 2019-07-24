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

export function genOperatorTests(spec: OperatorSpec): string {
    return [
        ...genFileHeader(),
        ...genImport(genUncurriedTypeName(spec), "../../../src/exponent"),
        ...genTests(spec),
    ].join("\n");
}

function genTests(spec: OperatorSpec): string[] {
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

function genTest(spec: OperatorSpec, left: ExponentSpec, right: ExponentSpec): string {
    const result = spec.compute(left.value, right.value);
    const typeName = `${spec.testTypeNamePrefix}Of${genExponentName(left)}And${genExponentName(right)}`;
    const testType = `${genUncurriedTypeName(spec, left.type, right.type)}`;
    const expectedType = isExponent(result, spec) ? `"${result}"` : "never";
    return `type ${typeName} = ${testType}; // $ExpectType ${expectedType}`;
}
