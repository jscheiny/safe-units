import { Node, NodeWalker, NodeWalkingStep } from "commonmark";

export function getNodeText(root: Node): string {
    let text = "";
    walkMarkdown(root, node => {
        if (node.literal) {
            text += node.literal;
        }
    });
    return text;
}

export function walkMarkdown(root: Node, callback: (node: Node) => void): void {
    const walker = root.walker();

    while (true) {
        const event = nextStep(walker);
        if (event === null) {
            break;
        }
        const { node } = event;
        if (event.entering) {
            callback(node);
        }
    }
}

export function createNodeId(node: Node): string {
    return encodeURIComponent(
        getNodeText(node)
            .toLowerCase()
            .split(/[^A-Za-z0-9]+/g)
            .filter(x => x !== "")
            .join("-"),
    );
}

export function nextStep(walker: NodeWalker): NodeWalkingStep | null {
    return walker.next() as NodeWalkingStep | null;
}
