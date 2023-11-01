/* eslint-disable promise/no-nesting */
import {
  MoodStats,
  SuccessResponse,
  WithContentStatus,
} from "@emojiTracker-js/data-access";
import { UnRestrictedBaseController } from "@emojiTracker-js/milkyway-common";
import { Get, Query, Route, Tags } from "@tsoa/runtime";
import * as dotenv from "dotenv";
import { getMoodData } from "../../services/mood-services";
import { sendSharedData } from "../../services/user-sharing-services";

dotenv.config();

@Route(`/users`)
@Tags("Sharing")
/**
 * Handle all the details about the User's Mood
 */
export class GetSharedDataController extends UnRestrictedBaseController<any> {
  override successStatusCode = WithContentStatus;
  constructor() {
    super();
  }
  /**
   *
   * @summary get user's mood
   * filter with this-month, previous-month, last-month
   *
   */
  @Get("/share/{hash}")
  handlerFunc(hash: string): Promise<SuccessResponse<any>> {
    return this.controllerWrapper(() => {
      return sendSharedData(this.mwCtx, hash);
    });
  }
}

export default GetSharedDataController;
