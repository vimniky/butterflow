import NodeLibrary from "./nodeLibrary";
import { Node } from "./types";

const nodeList: Node[] = [
  {
    id: "a",
    templateName: "Function",
    code: "return $input + 1",
    next: ["debug"],
  },
  {
    id: "debug",
    templateName: "Debug",
    prev: ["a"],
    next: ["b"],
  },
  {
    id: "b",
    templateName: "Function",
    code:
      "return new Promise((s) => setTimeout(() => {s($input * 2);}, 1000));",
    prev: ["debug"],
    next: ["c"],
  },
  {
    id: "c",
    templateName: "Function",
    code: "return $input * $input",
    next: [],
    prev: ["b"],
  },
];

const httpFlow: Node[] = [
  {
    id: "httpIn",
    templateName: "HttpIn",
    next: ["debug"],
    selectors: { url: "/test" },
  },
  {
    id: "debug",
    templateName: "Debug",
    prev: ["httpIn"],
    next: ["extractPayload"],
  },
  {
    id: "extractPayload",
    templateName: "Function",
    code: "return Number($input.n) * 10",
    next: ["httpOut"],
  },
  {
    id: "httpOut",
    templateName: "HttpOut",
    code: "return `<h1>${$input}</h1>`",
  },
];

export const nodeLibrary = new NodeLibrary();
nodeList.forEach((fun) => {
  nodeLibrary.register(fun.id, fun);
});

export const httpNodeLibrary = new NodeLibrary();
httpFlow.forEach((fun) => {
  httpNodeLibrary.register(fun.id, fun);
});
