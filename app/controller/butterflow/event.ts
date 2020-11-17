import { Controller } from "egg";

import runFlow from "../../butterflow/flowRunner";
import NodeLibrary from "../../butterflow/nodeLibrary";

export default class EventController extends Controller {
  public async index() {
    const { ctx } = this;
    ctx.body = "Butterflow event controller";
  }
  public async dispatch() {
    const { ctx } = this;
    const { selectors, payload } = ctx.request.body;
    const { id } = selectors;
    const result = await runFlow(id, payload);
    ctx.body = { result };
  }
  public async run() {
    const { ctx } = this;
    const { nodes, payload } = ctx.request.body;
    console.log(payload, nodes);
    const nodeLibrary = new NodeLibrary();
    nodes.forEach((node) => {
      nodeLibrary.register(node.id, node);
    });
    const result = await runFlow(nodes[0].id, payload, { nodeLibrary });
    ctx.body = {
      result,
      status: nodes.map((node) => {
        const n = nodeLibrary.getItem(node.id);
        return {
          id: node.id,
          input: n?.input,
          output: n?.output,
        };
      }),
    };
  }
}
