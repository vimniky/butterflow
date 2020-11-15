import { Controller } from "egg";

import runFlow from "../../butterflow/flowRunner";

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
}
