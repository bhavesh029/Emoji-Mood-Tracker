import {
  EmojiTrackerRoutes,
  emojitrackerControllersPath,
  emojitrackerSwaggerApiInfo,
} from "@emojiTracker-js/emoji-tracker-lib";
import {
  env,
  ExpressServer,
  ServerParams,
} from "@emojiTracker-js/milkyway-common";
import * as dotenv from "dotenv";
import express from "express";
dotenv.config();

export class MwServer extends ExpressServer {
  params: Promise<ServerParams> = this.prepareParams();
  port: string = env("PORT");
  app: Promise<express.Express> = this.setupApp();
  prepareParams() {
    console.log("this.port MW-Server", this.port);
    return Promise.resolve().then(() => {
      const params: ServerParams = {
        routesToRegisterFuncList: [
          () => EmojiTrackerRoutes.RegisterRoutes(this.router),
        ],
        swaggerApiInfos: [emojitrackerSwaggerApiInfo],
        controllerPaths: emojitrackerControllersPath,
      };
      return params;
    });
  }
}
