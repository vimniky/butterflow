import { Controller } from "egg";

import runFlow from "../../butterflow/flowRunner";
import { httpNodeLibrary } from "../../butterflow/mock";

export default class HttpController extends Controller {
  public async index() {
    const { ctx } = this;
    ctx.body = "Butterflow http controller";
  }
  public async get() {
    const { ctx } = this;
    const relativePath = ctx.path.slice("/butterflow/http".length);

    const nodes = httpNodeLibrary.selectNodes([
      { key: "url", value: relativePath },
    ]);
    if (nodes.length === 0) {
      console.log("No match");
      ctx.body = "<h1>No Match</h1>";
    } else if (nodes.length > 1) {
      console.log("To Many Match");
      ctx.body = "<h1>To Many Match</h1>";
    } else {
      const payload = ctx.query;
      const result = await runFlow(nodes[0].id, payload, {
        nodeLibrary: httpNodeLibrary,
      });
      ctx.body = result;
    }
  }

  public async post() {
    const { ctx } = this;
    const { selectors, payload } = ctx.request.body;
    const { id } = selectors;
    const result = await runFlow(id, payload);
    ctx.body = { result };
  }
}
