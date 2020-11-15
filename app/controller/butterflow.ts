import { Controller } from "egg";

import runFlow from "../butterflow/flowRunner";

export default class FunFlowController extends Controller {
  public async index() {
    const { ctx } = this;
    ctx.body = "Butterflow events bus";
  }
  public async event() {
    const { ctx } = this;
    const { selectors, payload } = ctx.request.body;
    const { id } = selectors;
    const result = await runFlow(id as string, payload);
    ctx.body = { result };
  }
}
