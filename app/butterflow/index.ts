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
  InjectNodeTemplate,
  FunctionNodeTemplate,
  DebugNodeTemplate,
  NodeTemplateName,
  NodeTemplate,
  NodeId,
  Node,
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
  code: (input, { $getSelf }) => {
    const { type, id } = $getSelf();
    console.log(`[${type} ${id}] : ${input}`);
    return input;
  },
};

export type NodeTemplateLibrary = Library<NodeTemplateName, NodeTemplate>;
export type NodeLibrary = Library<NodeId, Node>;

export const nodeTemplateLibrary = new Library<NodeTemplateName, NodeTemplate>({
  Inject: inject,
  Function: func,
  Debug: debug,
});
