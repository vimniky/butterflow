import { Application } from "egg";

export default (app: Application) => {
  const { controller, router } = app;

  router.get("/", controller.home.index);
  router.get("/file/:fileName", controller.file.get);
  router.post("/file", controller.file.create);
  router.post("/file/eval", controller.file.eval);
};
