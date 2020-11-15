import { Application } from "egg";

const butterflowPrefix = "/butterflow";
export default (app: Application) => {
  const { controller, router } = app;

  router.get("/", controller.home.index);

  router.post(
    `${butterflowPrefix}/event`,
    controller.butterflow.event.dispatch
  );
  router.get(`${butterflowPrefix}/http/*`, controller.butterflow.http.get);
  router.post(`${butterflowPrefix}/http/*`, controller.butterflow.http.post);
};
