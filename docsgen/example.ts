import { existsSync, readFileSync } from "fs";
import { join } from "path";
import { exit } from "process";

const EXAMPLE_START_REGEX = /^\/\/\s+start\s*/i;
const EXAMPLE_END_REGX = /^\/\/\s+end\s*/i;

export function readExample(fileName: string) {
    const examplePath = join("docs", "examples", fileName.trim());
    if (!existsSync(examplePath)) {
        console.error(`Example file not found: ${examplePath}`);
        exit(1);
    }

    const contents = readFileSync(examplePath, "utf-8");

    const lines = contents.split("\n");
    const startLine = lines.findIndex(line => EXAMPLE_START_REGEX.test(line));
    const endLine = lines.findIndex(line => EXAMPLE_END_REGX.test(line));

    if (startLine === -1 || endLine === -1) {
        return lines;
    }

    return lines.slice(startLine + 1, endLine);
}
