import { genOperatorTypes } from "./genTypes";
import { genOperatorTests } from "./genTests";
import { OperatorCodeGenOptions } from "./common";
import { writeFile } from "fs";

export function emitOperator(options: OperatorCodeGenOptions) {
    const { fileNamePrefix } = options;
    const prefix = "src/exponents";
    emitFile(`${prefix}/${fileNamePrefix}.ts`, genOperatorTypes(options));
    emitFile(`${prefix}/__test__/${fileNamePrefix}Spec.ts`, genOperatorTests(options));
}

function emitFile(path: string, content: string) {
    writeFile(path, content, error => {
        if (error) {
            console.error(`There was an error writing to ${path}`);
        } else {
            console.log(`Generated ${path}`);
        }
    });
}
