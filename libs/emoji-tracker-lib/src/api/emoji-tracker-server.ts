  import {
  ExpressServer,
  ServerParams,
  env,
} from "@emojiTracker-js/milkyway-common";
import * as dotenv from "dotenv";
import express from "express";
import { RegisterRoutes } from "./routes";
import {
  emojitrackerControllersPath,
  emojitrackerSwaggerApiInfo,
} from "./emoji-tracker-lib-api-info";
dotenv.config();

export class emojiTrackerServer extends ExpressServer {
  port: string = env("PORT");
  params: Promise<ServerParams> = this.prepareParams();
  app: Promise<express.Express> = this.setupApp();
  prepareParams() {
    return Promise.resolve().then(() => {
      const params: ServerParams = {
        routesToRegisterFuncList: [() => RegisterRoutes(this.router)],
        swaggerApiInfos: [emojitrackerSwaggerApiInfo],
        controllerPaths: emojitrackerControllersPath,
      };
      return params;
    });
  }
}
