/* eslint-disable promise/no-nesting */
import {
  MoodStats,
  SuccessResponse,
  WithContentStatus,
} from "@emojiTracker-js/data-access";
import { RestrictedBaseController } from "@emojiTracker-js/milkyway-common";
import { Get, Header, Query, Route, Tags } from "@tsoa/runtime";
import * as dotenv from "dotenv";
import { getMoodData } from "../../services/mood-services";

dotenv.config();

@Route(`/users`)
@Tags("Moods")
/**
 * Handle all the details about the User's Mood
 */
export class GetMonthlyMoodDataController extends RestrictedBaseController<
  MoodStats[]
> {
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
  @Get("/{userId}/mood")
  handlerFunc(
    @Header("X-Access-Token") token: string,
    userId: string,
    @Query() filter: string
  ): Promise<SuccessResponse<MoodStats[]>> {
    return this.controllerWrapper({ userId, token }, () => {
      return getMoodData(this.mwCtx, userId, filter);
    });
  }
}

export default GetMonthlyMoodDataController;
