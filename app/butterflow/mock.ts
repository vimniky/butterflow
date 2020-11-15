import Library from "./library";
import { Node, NodeId } from "./types";

const nodeList: Node[] = [
  {
    id: "a",
    name: "A",
    templateName: "Function",
    code: "return $input + 1",
    next: ["debug"],
  },
  {
    id: "debug",
    name: "Debug",
    templateName: "Debug",
    prev: ["a"],
    next: ["b"],
  },
  {
    id: "b",
    name: "B",
    templateName: "Function",
    code:
      "return new Promise((s) => setTimeout(() => {s($input * 2);}, 1000));",
    prev: ["debug"],
    next: ["c"],
  },
  {
    id: "c",
    name: "C",
    templateName: "Function",
    code: "return $input * $input",
    next: [],
    prev: ["b"],
  },
];

export const nodeLibrary = new Library<NodeId, Node>();
nodeList.forEach((fun) => {
  nodeLibrary.register(fun.id, fun);
});
