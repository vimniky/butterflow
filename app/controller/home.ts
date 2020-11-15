import { Controller } from "egg";

export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this;
    const msg = await ctx.service.test.sayHi("egg");
    ctx.body = { msg };
  }
}
