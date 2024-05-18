import { watch } from "fs";
import { emitDocs } from "./emit";

console.log("Generating initial docs...");
emitDocs();
console.log("Watching for docs changes...");
watch("docs", {}, (_eventType, filename) => {
    if (filename?.endsWith(".md")) {
        console.log(`Change detected in ${filename}. Rebuilding docs...`);
        emitDocs();
        console.log("Done");
    }
});
