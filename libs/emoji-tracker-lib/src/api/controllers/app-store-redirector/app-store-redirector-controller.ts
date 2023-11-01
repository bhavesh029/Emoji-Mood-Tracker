import * as express from "express";

import {
  UnRestrictedBaseController,
  env,
} from "@emojiTracker-js/milkyway-common";
import {
  Get,
  Query,
  Request,
  Route,
  SuccessResponse,
  Tags,
  Security
} from "@tsoa/runtime";
import * as dotenv from "dotenv";
import { MwDbContext, RedirectStatus } from "@emojiTracker-js/data-access";
dotenv.config();
dotenv.config();
@Route(`/marketing`)
@Tags("App Store")
@Security('jwt', ['user'])
/**
 * User Sending mail to the emojiTracker support
 */
export class QrRedirectorController extends UnRestrictedBaseController<void> {
  override successStatusCode = RedirectStatus;
  constructor() {
    super();
  }
  /**
   *
   * @summary User sending mail to support for any queries
   */

  @SuccessResponse(302, "Redirect")
  @Get("/app-store-redirector/{applicationId}")
  handlerFunc(
    @Request() req: express.Request,
    applicationId: string,
    @Query() source?: string
  ): Promise<void> {
    console.log(`App Id: ${applicationId}`);
    console.log(`source Id: ${req.query.source}`);
    return this.controllerWrapper(() =>
      handleRedirection(
        this.mwCtx,
        applicationId,
        req,
        req.query.source?.toString()
      )
    ).then(this.returnNoContent());
  }
}

function handleRedirection(
  ctx: MwDbContext,
  applicationId: string,
  req: express.Request,
  source?: string
): Promise<void> {
  return Promise.resolve((<any>req).res as express.Response).then((res) => {
    let playStoreUrl = "";
    let appStoreUrl = "";

    playStoreUrl = env<string>("emojiTracker_emoji-tracker_PLAY_STORE_URL");
    appStoreUrl = env<string>("emojiTracker_emoji-tracker_APP_STORE_URL");

    console.log(`request headers are ${JSON.stringify(req.headers)}`);
    console.log(`source is ${source}`);
    const userAgent = req.headers["user-agent"];
    if (userAgent) {
      const isIos =
        !!userAgent.match(/iPhone/) ||
        !!userAgent.match(/iPad/) ||
        !!userAgent.match(/iPod/);
      console.log(`userAgent`, userAgent);

      const isAndroid = !!userAgent.match(/Android/);
      let redirectingUrl = "";
      let deviceType = "others";
      if (isAndroid) {
        deviceType = "android";
        redirectingUrl = playStoreUrl;
      } else if (isIos) {
        deviceType = "ios";
        redirectingUrl = appStoreUrl;
      } else {
        redirectingUrl = playStoreUrl;
        // Neither iOS nor Android!
      }
    }
  });
}
export default QrRedirectorController;
