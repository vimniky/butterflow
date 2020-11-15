import { createContext, runInContext } from "vm";
import { Context } from "egg";

import { NodeLibrary, nodeTemplateLibrary, NodeId } from "./index";
import { nodeLibrary as mockNodeLibrary } from "./mock";

type RunFlowOptions = {
  nodeLibrary?: NodeLibrary;
  ctx?: Context;
};

const runFlow = async (id: NodeId, payload: any, options?: RunFlowOptions) => {
  options = options || {};

  const { nodeLibrary = mockNodeLibrary } = options;
  const node = nodeLibrary.getItem(id);

  if (!node) {
    throw new Error(`Can't find node: ${id}`);
  }

  const { templateName } = node;
  node.input = payload;

  const result = await new Promise(async (resolve, reject) => {
    let output: any = payload;
    const nodeTemplate = nodeTemplateLibrary.getItem(templateName);

    if (!nodeTemplate) {
      throw new Error(`Can't find node template: ${templateName}`);
    }

    // Run code/function in node template
    if (nodeTemplate.code) {
      output = nodeTemplate.code(node.input, { $getNode: () => node });
    }

    if (!node.code) {
      resolve(output);
      return;
    }

    const env = {
      $input: output,
      setTimeout: (callback, ...args) => setTimeout(callback, ...args),
      setInterval: (callback, ...args) => setInterval(callback, ...args),
      $getNode: () => node,
      $resolve: (value) => resolve(value),
      $reject: (reason) => reject(reason),
    };
    // Live evaluate user inputted code
    createContext(env);
    const code = `
      const res = (function () {
        ${node.code}
      })();
      $resolve(res);
    `;
    runInContext(code, env);
  });

  node.output = result;

  if (!node.next || !node.next.length) return result;

  const promises: Promise<unknown>[] = [];
  for (let i = 0; i < node.next.length; i++) {
    const nextNodeId = node.next[i];
    const p = runFlow(nextNodeId, result, options);
    promises.push(p);
  }

  const res = await Promise.all(promises);

  if (res.length === 1) {
    return res[0];
  }

  return res;
};

export default runFlow;
