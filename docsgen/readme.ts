import { existsSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { readExample } from "./example";
import { exit } from "process";

const EXAMPLE_INLINE_REGEX = /^example:\s*(\w+\.ts)/i;

const templatePath = join("docs", "readme", "readme.template.md");
if (!existsSync(templatePath)) {
    console.error(`Template file not found: ${templatePath}`);
    exit(1);
}

const file = readFileSync(templatePath, "utf-8");
const templateLines = file.split("\n");
const resolvedLines = templateLines.flatMap(line => {
    const match = EXAMPLE_INLINE_REGEX.exec(line);
    if (match == null) {
        return [line];
    }

    const fileName = match[1];
    return ["```ts", ...readExample(fileName), "```"];
});
const expectedReadme = resolvedLines.join("\n");

if (process.argv.length >= 3 && process.argv[2] === "--check") {
    const existingReadme = readFileSync("README.md", "utf-8");
    if (existingReadme !== expectedReadme) {
        console.error("README.md is out of date. Run `yarn readme` to update it.");
        exit(1);
    }
} else {
    writeFileSync("README.md", expectedReadme);
}
