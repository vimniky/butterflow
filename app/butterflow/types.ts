export type InjectNodeTemplateName = "Inject";
export type FunctionTemplateName = "Function";
export type DebugNodeTemplateName = "Debug";
export type NodeTemplateName =
  | InjectNodeTemplateName
  | FunctionTemplateName
  | DebugNodeTemplateName;

export interface NodeTemplate {
  name: NodeTemplateName;
  label?: string;
  code?: any;
  doc?: any;
  config?: any;
}

export interface InjectNodeTemplate extends NodeTemplate {
  name: InjectNodeTemplateName;
  code: <T>(msg: T) => T;
}
export interface FunctionNodeTemplate extends NodeTemplate {
  name: FunctionTemplateName;
}
export interface DebugNodeTemplate extends NodeTemplate {
  name: DebugNodeTemplateName;
}

export type NodeId = string;
export interface Node {
  id: NodeId;
  name: string;
  templateName: NodeTemplateName;
  code?: string | CallableFunction;
  descriptions?: string[];
  env?: any;
  input?: any | any[];
  output?: any | any[];
  prev?: string | string[];
  next?: string | string[];
  conditions?: any[];
}
