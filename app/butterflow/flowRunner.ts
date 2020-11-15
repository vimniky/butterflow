import { createContext, runInContext } from "vm";

import { NodeLibrary, nodeTemplateLibrary, NodeId } from "./index";
import { nodeLibrary as mockNodeLibrary } from "./mock";

const runFlow = async (
  id: NodeId,
  payload: any,
  nodeLibrary: NodeLibrary = mockNodeLibrary
) => {
  const node = nodeLibrary.getItem(id);

  if (!node) {
    throw new Error(`Can't find node: ${id}`);
  }

  const { templateName } = node;
  node.input = payload;
  const result = await new Promise((resolve, reject) => {
    const env = {
      ...node.env,
      setTimeout: (callback, ...args) => setTimeout(callback, ...args),
      setInterval: (callback, ...args) => setInterval(callback, ...args),
      $input: payload,
      $getNode: () => node,
      $resolve: (value) => resolve(value),
      $reject: (reason) => reject(reason),
    };

    const nodeTemplate = nodeTemplateLibrary.getItem(templateName);

    if (!nodeTemplate) {
      throw new Error(`Can't find node template: ${templateName}`);
    }

    // Run code/function in node template
    if (nodeTemplate.code) {
      env.$input = nodeTemplate.code(node.input, { $getSelf: () => node });
    }

    if (!node.code) {
      env.$resolve(env.$input);
    }

    // Live evaluate user inputted code
    createContext(env);
    const code = `
      setTimeout(() => {
        console.log('timeout');
      }, 10);
      const res = (function () {
        ${node.code}
      })();
      $resolve(res);
    `;
    runInContext(code, env);
  });

  node.output = result;

  if (!node.next || !node.next.length) return;

  const promises: Promise<unknown>[] = [];
  for (let i = 0; i < node.next.length; i++) {
    const nextNodeId = node.next[i];
    const p = runFlow(nextNodeId, result);
    promises.push(p);
  }

  await Promise.all(promises);
  return nodeLibrary.rawData;
};

export default runFlow;
