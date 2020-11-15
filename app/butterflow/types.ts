export type InjectNodeTemplateName = "Inject";
export type FunctionTemplateName = "Function";
export type DebugNodeTemplateName = "Debug";
export type HttpInNodeTemplateName = "HttpIn";
export type HttpOutNodeTemplateName = "HttpOut";
export type HttpRequestNodeTemplateName = "HttpRequest";
export type NodeTemplateName =
  | InjectNodeTemplateName
  | FunctionTemplateName
  | DebugNodeTemplateName
  | HttpInNodeTemplateName
  | HttpOutNodeTemplateName
  | HttpRequestNodeTemplateName;

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

type HttpMethods = "GET" | "POST" | "HEAD";
export interface HttpInNodeTemplate extends NodeTemplate {
  name: HttpInNodeTemplateName;
  // config: {
  //   method: HttpMethods;
  //   url: string;
  //   headers?: any;
  //   payload?: any;
  // };
}
export interface HttpOutNodeTemplate extends NodeTemplate {
  name: HttpOutNodeTemplateName;
  // config: {
  //   headers?: any;
  //   payload?: any;
  // };
}

export type NodeId = string;
export interface Node {
  id: NodeId;
  name?: string;
  templateName: NodeTemplateName;
  code?: string | CallableFunction;
  descriptions?: string[];
  input?: any | any[];
  output?: any | any[];
  prev?: string | string[];
  next?: string | string[];
  selectors?: Record<string, any>;
}
