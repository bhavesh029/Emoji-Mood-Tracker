/* eslint-disable promise/no-nesting */
import {
  SuccessResponse,
  WithContentStatus,
} from "@emojiTracker-js/data-access";
import { UnRestrictedBaseController } from "@emojiTracker-js/milkyway-common";
import { Get, Query, Route, Tags } from "@tsoa/runtime";
import * as dotenv from "dotenv";
import { createHashAndInsertData } from "../../services/user-sharing-services";

dotenv.config();

@Route(`/users`)
@Tags("Sharing")
/**
 * Handle all the details about the User's Mood
 */
export class ShareUserDataController extends UnRestrictedBaseController<string> {
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
  @Get("/{userId}/share/mood")
  handlerFunc(
    userId: string,
    @Query() filter: string
  ): Promise<SuccessResponse<string>> {
    return this.controllerWrapper(() => {
      return createHashAndInsertData(this.mwCtx, userId, filter);
    });
  }
}

export default ShareUserDataController;
