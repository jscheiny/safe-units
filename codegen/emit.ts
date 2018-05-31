import { writeFile } from "fs";
import { genCommonTypes } from "./genCommon";
import { genOperatorTests } from "./genTests";
import { genOperatorTypes } from "./genTypes";
import { codeGenSpec } from "./spec";

const PATH_PREFIX = "src/exponent";

export interface EmitPlan {
    path: string;
    source: string;
}

export function emit(callback?: () => void) {
    const emits: EmitPlan[] = getEmitPlans();

    let index = -1;
    const nextEmit = () => {
        index++;
        const isLastEmit = index === emits.length - 1;
        emitFile(emits[index], isLastEmit ? callback : nextEmit);
    };
    nextEmit();
}

export function getEmitPlans(): EmitPlan[] {
    const { operators, ...common } = codeGenSpec;
    const emits: EmitPlan[] = [{ path: `${PATH_PREFIX}/common.ts`, source: genCommonTypes(codeGenSpec) }];
    operators.forEach(operator => {
        const operatorSpec = { ...operator, ...common };
        const { fileNamePrefix } = operator;
        emits.push(
            { path: `${PATH_PREFIX}/${fileNamePrefix}.ts`, source: genOperatorTypes(operatorSpec) },
            { path: `${PATH_PREFIX}/__test__/${fileNamePrefix}Spec.ts`, source: genOperatorTests(operatorSpec) },
        );
    });
    return emits;
}

function emitFile({ path, source }: EmitPlan, callback?: () => void) {
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
