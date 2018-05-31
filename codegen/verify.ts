import * as fs from "fs";
import { EmitPlan, getEmitPlans } from "./emit";

function verify() {
    const emits = getEmitPlans();

    let index = -1;
    const nextDiff = () => {
        index++;
        if (index === emits.length) {
            return;
        }
        verifyEmitDiff(emits[index], nextDiff);
    };
    nextDiff();
}

function verifyEmitDiff(emit: EmitPlan, callback: () => void) {
    readFile(emit.path, content => {
        if (emit.source !== content) {
            console.error(
                `A change to an auto-generated file was made. Revert the change to '${
                    emit.path
                }' or rerun 'yarn codegen:produce'.`,
            );
            process.exit(1);
        }
        callback();
    });
}

function readFile(path: string, callback: (content: string) => void) {
    fs.readFile(path, { encoding: "UTF8" }, (error, content) => {
        if (error) {
            console.error(`Could not read file ${path}.`);
            console.error(error);
            process.exit(1);
        } else {
            callback(content);
        }
    });
}

verify();
