import { SwaggerApiInfo } from "@emojiTracker-js/milkyway-common";
import * as tsoa from "../../tsoa.json";
import * as emojitrackerSwagger from "./openapi/swagger.json";

const emojitrackerPort = process.env["PORT"];
export const emojitrackerVersion = tsoa.routes.basePath;
export const emojitrackerBaseUrl = `https://localhost:${emojitrackerPort}${emojitrackerVersion}`;
export const emojitrackerControllers = tsoa.controllerPathGlobs;
export const emojitrackerSwaggerApiInfo: SwaggerApiInfo = {
  endpoint: "/emoji-trackers/docs",
  path: emojitrackerSwagger,
};
export const emojitrackerControllersPath = tsoa.controllerPathGlobs;
