import { EggAppConfig, EggAppInfo, PowerPartial } from "egg";

export default (appInfo: EggAppInfo) => {
  const config: PowerPartial<EggAppConfig> = {
    // use for cookie sign key, should change to your own and keep security
    keys: appInfo.name + "_1604935278509_2925",
    userDir: ".butterflow",
    butterflowPrefix: "/butterflow/",
    security: {
      csrf: false,
    },

    // middleware: ["gzip"],
    // gzip: {
    //   threshold: 1024,
    // },
  };

  return config;
};
