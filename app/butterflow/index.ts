export { default as Library } from "./library";
export {
  InjectNodeTemplate,
  FunctionNodeTemplate,
  DebugNodeTemplate,
  NodeTemplateName,
  NodeTemplate,
  NodeId,
  Node,
} from "./types";

import {
  NodeId,
  Node,
  NodeTemplateName,
  NodeTemplate,
  InjectNodeTemplate,
  FunctionNodeTemplate,
  DebugNodeTemplate,
  HttpInNodeTemplate,
  HttpOutNodeTemplate,
} from "./types";

import Library from "./library";

export const inject: InjectNodeTemplate = {
  name: "Inject",
  code: (id) => id,
};
export const func: FunctionNodeTemplate = {
  name: "Function",
};
export const debug: DebugNodeTemplate = {
  name: "Debug",
  code: (input, { $getNode }) => {
    const { type, id } = $getNode();
    console.log(`[${type || "Unnamed"} ${id}] : `, input);
    return input;
  },
};

export const httpIn: HttpInNodeTemplate = {
  name: "HttpIn",
};

export const httpOut: HttpOutNodeTemplate = {
  name: "HttpOut",
};

export type NodeTemplateLibrary = Library<NodeTemplateName, NodeTemplate>;
export type NodeLibrary = Library<NodeId, Node>;

export const nodeTemplateLibrary = new Library<NodeTemplateName, NodeTemplate>({
  Inject: inject,
  Function: func,
  Debug: debug,
  HttpIn: httpIn,
  HttpOut: httpOut,
});
