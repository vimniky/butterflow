import Library from "./library";
import { Node, NodeId } from "./types";

export default class NodeLibrary extends Library<NodeId, Node> {
  selectNodes(selectors: { key: string; value: any }[]): Node[] {
    let matchedNodes = Object.values(this.data) as Node[];
    for (const selector of selectors) {
      const { key, value } = selector;
      matchedNodes = matchedNodes.filter((node) => {
        return (
          node.selectors &&
          node.selectors[key] !== undefined &&
          node.selectors[key] === value
        );
      });
    }
    return matchedNodes;
  }
}
