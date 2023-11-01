/* eslint-disable promise/no-nesting */
import {
  MoodStats,
  SuccessResponse,
  WithContentStatus,
} from "@emojiTracker-js/data-access";
import { RestrictedBaseController } from "@emojiTracker-js/milkyway-common";
import { Get, Header, Query, Route, Tags } from "@tsoa/runtime";
import * as dotenv from "dotenv";
import { getUserMoodData } from "../../services/mood-services";

dotenv.config();

@Route(`/users`)
@Tags("Statistics")
/**
 * Handle all the details about the User's Mood
 */
export class GetUserEmojiUsageStatisticsController extends RestrictedBaseController<
  MoodStats[]
> {
  override successStatusCode = WithContentStatus;
  constructor() {
    super();
  }
  /**
   *
   * @summary get user's mood
   * filter with today, this-month
   *
   */
  @Get("/{userId}/mood/stats")
  handlerFunc(
    @Header("X-Access-Token") token: string,
    userId: string,
    @Query() filter: string
  ): Promise<SuccessResponse<MoodStats[]>> {
    return this.controllerWrapper({ userId, token }, () => {
      return getUserMoodData(this.mwCtx, filter, userId);
    });
  }
}

export default GetUserEmojiUsageStatisticsController;
