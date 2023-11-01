import { middlewareErrorHandler } from "@emojiTracker-js/data-access";
import cors from "cors";
import * as bodyParser from "body-parser";
import * as dotenv from "dotenv";
import express, { Router } from "express";
import { Server } from "http";
import * as swaggerUi from "swagger-ui-express";
import { validateRoutesSetup } from "./validator/validate-routes-setup";
import { env } from "../utils/env-utils";
dotenv.config();

export abstract class ExpressServer {
  abstract port: string;
  router = express.Router();
  abstract params: Promise<ServerParams>;
  abstract app: Promise<express.Express>;
  server!: Server;

  close() {
    return this.server.close();
  }

  on(): Promise<Server> {
    return this.params
      .then((params) => validateRoutesSetup(params.controllerPaths))
      .then(() => this.getAppAndStart());
  }

  private getAppAndStart(): Server | PromiseLike<Server> {
    return this.app.then((app) => {
      const server: Server = app.listen(this.port, () => {
        console.log(`Listening at http://localhost:${this.port}`);
      });
      server.on("error", console.error);
      this.server = server;
      module.exports = server;
      return server;
    });
  }

  protected setupApp() {
    return this.params.then((params) => {
      const app: express.Express = express();
      app.use(cors());
      app.use(this.router);
      this.router.use(bodyParser.urlencoded({ extended: true }));
      this.router.use(bodyParser.json({ limit: env("PAYLOAD_SIZE_LIMIT") }));
      app.use(middlewareErrorHandler);
      params.routesToRegisterFuncList.map((func) => func(this.router));

      params.swaggerApiInfos.map((swaggerApi) => {
        app.use(
          swaggerApi.endpoint,
          swaggerUi.serveFiles(swaggerApi.path),
          swaggerUi.setup(swaggerApi.path)
        );
      });

      return app;
    });
  }
}

export type ServerParams = {
  routesToRegisterFuncList: ((router: Router) => void)[];
  swaggerApiInfos: SwaggerApiInfo[];
  controllerPaths: string[];
};

export type SwaggerApiInfo = {
  endpoint: string;
  path: object;
};
