/* eslint-disable promise/no-nesting */
import {
  MoodStats,
  SuccessResponse,
  WithContentStatus,
} from "@emojiTracker-js/data-access";
import { UnRestrictedBaseController } from "@emojiTracker-js/milkyway-common";
import { Get, Query, Route, Tags } from "@tsoa/runtime";
import * as dotenv from "dotenv";
import { getPublicMoodData } from "../../services/mood-services";

dotenv.config();

@Route(`/public`)
@Tags("Public")
/**
 * Handle all the details about the Public Mood
 */
export class GetPublicMoodController extends UnRestrictedBaseController<
  MoodStats[]
> {
  override successStatusCode = WithContentStatus;
  constructor() {
    super();
  }
  /**
   *
   * @summary get public mood
   * filter with this-month, today
   *
   */
  @Get("/mood")
  handlerFunc(@Query() filter: string): Promise<SuccessResponse<MoodStats[]>> {
    return this.controllerWrapper(() => {
      return getPublicMoodData(this.mwCtx, filter);
    });
  }
}

export default GetPublicMoodController;
