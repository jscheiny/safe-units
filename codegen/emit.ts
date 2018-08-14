import { exists, mkdir, writeFile } from "fs";
import { genExponentType } from "./genExponent";
import { genOperatorTests } from "./genTests";
import { genOperatorTypes } from "./genTypes";
import { codeGenSpec } from "./spec";

const PATH_PREFIX = "src/exponent/generated";
const TEST_PREFIX = `${PATH_PREFIX}/__test__`;

export interface EmitPlan {
    path: string;
    source: string;
}

export function emit(callback?: () => void): void {
    const emits: EmitPlan[] = getEmitPlans();
    prepForEmit(() => {
        let index = -1;
        const nextEmit = () => {
            index++;
            const isLastEmit = index === emits.length - 1;
            emitFile(emits[index], isLastEmit ? callback : nextEmit);
        };
        nextEmit();
    });
}

export function getEmitPlans(): EmitPlan[] {
    const { operators, ...common } = codeGenSpec;
    const emits: EmitPlan[] = [{ path: `${PATH_PREFIX}/exponent.ts`, source: genExponentType(codeGenSpec) }];
    operators.forEach(operator => {
        const operatorSpec = { ...operator, ...common };
        const { fileNamePrefix } = operator;
        emits.push(
            { path: `${PATH_PREFIX}/${fileNamePrefix}.ts`, source: genOperatorTypes(operatorSpec) },
            { path: `${TEST_PREFIX}/${fileNamePrefix}Spec.ts`, source: genOperatorTests(operatorSpec) },
        );
    });
    return emits;
}

function prepForEmit(callback: () => void): void {
    makeDirectory(PATH_PREFIX, () => makeDirectory(TEST_PREFIX, callback));
}

function makeDirectory(path: string, callback: () => void): void {
    exists(path, doesExist => {
        if (doesExist) {
            return callback();
        }
        mkdir(path, err => {
            if (err) {
                console.error(`There was an error creating directory ${path}`);
            } else {
                callback();
            }
        });
    });
}

function emitFile({ path, source }: EmitPlan, callback?: () => void): void {
    writeFile(path, source, error => {
        if (error) {
            console.error(`There was an error writing to ${path}`);
        } else {
            console.log(`Generated ${path}`);
            if (callback) {
                callback();
            }
        }
    });
}

emit();
