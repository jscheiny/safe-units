import { writeFile } from "fs";
import { CommonOperatorCodeGenOptions, OperatorCodeGenOptions } from "./common";
import { genCommonTypes } from "./genCommon";
import { genOperatorTests } from "./genTests";
import { genOperatorTypes } from "./genTypes";

const PATH_PREFIX = "src/exponent/";

export function emitCommonTypes(options: CommonOperatorCodeGenOptions) {
    emitFile("common.ts", genCommonTypes(options));
}

export function emitOperator(options: OperatorCodeGenOptions) {
    const { fileNamePrefix } = options;
    emitFile(`${fileNamePrefix}.ts`, genOperatorTypes(options));
    emitFile(`__test__/${fileNamePrefix}Spec.ts`, genOperatorTests(options));
}

function emitFile(path: string, content: string) {
    writeFile(PATH_PREFIX + path, content, error => {
        if (error) {
            console.error(`There was an error writing to ${path}`);
        } else {
            console.log(`Generated ${path}`);
        }
    });
}
