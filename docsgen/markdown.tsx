import { Node } from "commonmark";
import highlight from "highlight.js";
import * as React from "react";
import { createNodeId, getNodeText } from "./markdownUtils";
import { component } from "./style";
import { join } from "path";
import { existsSync, readFileSync } from "fs";

interface MarkdownProps {
    root: Node;
}

type MarkdownComponent = React.FunctionComponent<MarkdownProps>;

export const Markdown: MarkdownComponent = ({ root }) => {
    switch (root.type) {
        case "document":
            return <MarkdownChildren root={root} />;
        case "paragraph": {
            const children = <MarkdownChildren root={root} />;
            const grandparent = root.parent ? root.parent.parent : null;
            if (grandparent !== null && grandparent.type === "list" && grandparent.listTight) {
                return children;
            } else {
                return <p>{children}</p>;
            }
        }
        case "text":
            return <>{root.literal}</>;
        case "heading":
            return <MarkdownHeading root={root} />;
        case "linebreak":
            return <br />;
        case "html_inline":
            return <span dangerouslySetInnerHTML={{ __html: root.literal ?? "" }} />;
        case "html_block":
            return <span dangerouslySetInnerHTML={{ __html: root.literal ?? "" }} />;
        case "link":
            return (
                <Link href={root.destination ?? ""}>
                    <MarkdownChildren root={root} />
                </Link>
            );
        case "image":
            return <img src={root.destination ?? ""} alt={getNodeText(root)} />;
        case "thematic_break":
            return <hr />;
        case "code_block": {
            const text = getCodeBlockText(root);
            const highlightedCode = highlight.highlight(text, { language: "typescript" }).value;
            return (
                <pre>
                    <CodeBlock className="hljs typescript" dangerouslySetInnerHTML={{ __html: highlightedCode }} />
                </pre>
            );
        }
        case "code":
            return <CodeInline>{root.literal}</CodeInline>;
        case "softbreak":
            return <br />;
        case "custom_inline":
            // TODO Handle this
            return null;
        case "custom_block":
            // TODO Handle this
            return null;
        default: {
            const tag = getTag(root.type, root);
            return React.createElement(tag, {}, <MarkdownChildren root={root} />);
        }
    }
};

export const MarkdownChildren: MarkdownComponent = ({ root }) => {
    const children: JSX.Element[] = [];
    let index = 0;
    let child = root.firstChild;
    while (child !== null) {
        children.push(<Markdown key={index} root={child} />);
        index++;
        child = child.next;
    }
    return <>{children}</>;
};

const MarkdownHeading: MarkdownComponent = ({ root }) => {
    const tag = getHeadingTag(root.level);
    const id = createNodeId(root);
    return React.createElement(tag, { id }, <MarkdownChildren root={root} />);
};

type StrictExclude<T, U extends T> = T extends U ? never : T;
type TranslatedNodeTypes = StrictExclude<
    Node["type"],
    | "document"
    | "paragraph"
    | "text"
    | "softbreak"
    | "linebreak"
    | "html_inline"
    | "html_block"
    | "link"
    | "image"
    | "thematic_break"
    | "code_block"
    | "code"
    | "custom_inline"
    | "custom_block"
    | "heading"
>;

function getTag(type: TranslatedNodeTypes, node: Node): keyof JSX.IntrinsicElements {
    switch (type) {
        case "emph":
            return "em";
        case "strong":
            return "strong";
        case "block_quote":
            return "blockquote";
        case "item":
            return "li";
        case "list":
            return node.listType === "bullet" ? "ul" : "ol";
    }
}

function getHeadingTag(level: number): keyof JSX.IntrinsicElements {
    switch (level) {
        case 1:
            return "h1";
        case 2:
            return "h2";
        case 3:
            return "h3";
        case 4:
            return "h4";
        case 5:
            return "h5";
        case 6:
            return "h6";
        default:
            return "h6";
    }
}

function getCodeBlockText(root: Node): string {
    if (root.info !== "example") {
        return root.literal ?? "";
    }

    if (root.literal == null) {
        throw new Error("Expected example code block to have a reference to an example file.");
    }

    const examplePath = join("docs", "examples", root.literal.trim());
    console.log(examplePath);
    if (!existsSync(examplePath)) {
        throw new Error(`Example file not found: ${examplePath}`);
    }

    const contents = readFileSync(examplePath, "utf-8");

    const lines = contents.split("\n");
    const startLine = lines.findIndex(line => EXAMPLE_START_REGEX.test(line));
    const endLine = lines.findIndex(line => EXAMPLE_END_REGX.test(line));

    if (startLine === -1 || endLine === -1) {
        return contents;
    }

    return lines.slice(startLine + 1, endLine).join("\n");
}

const EXAMPLE_START_REGEX = /^\/\/\s+start\s*/i;
const EXAMPLE_END_REGX = /^\/\/\s+end\s*/i;

const CodeBlock = component("code-block", "code", {
    borderRadius: 3,
    $nest: {
        "&&": {
            padding: 20,
        },
    },
});

const CodeInline = component("code-inline", "code", {
    color: "#6272a4",
    fontSize: 18,
});

export const Link = component("link", "a", {
    color: "#008075",
    textDecoration: "none",
    $nest: {
        "&:hover": {
            color: "#00B3A4",
            textDecoration: "underline",
        },
    },
});
