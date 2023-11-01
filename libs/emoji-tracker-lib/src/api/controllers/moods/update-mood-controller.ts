/* eslint-disable promise/no-nesting */
import {
  CreatedSuccessfullyStatus,
  MoodInfo,
} from "@emojiTracker-js/data-access";
import { UnRestrictedBaseController } from "@emojiTracker-js/milkyway-common";
import { Body, Put, Query, Route, Tags } from "@tsoa/runtime";
import * as dotenv from "dotenv";
import { AddMoodReqBody } from "../../models/add-mood-req-body";
import { updateMood } from "../../services/mood-services";

dotenv.config();

@Route(`/users`)
@Tags("Moods")
/**
 * Handle all the details about the User's Mood
 */
export class UpdateMoodController extends UnRestrictedBaseController<void> {
  override successStatusCode = CreatedSuccessfullyStatus;
  constructor() {
    super();
  }
  /**
   *
   * @summary update user's mood
   *
   */
  @Put("/{userId}/mood")
  handlerFunc(
    userId: string,
    @Body() reqBody: AddMoodReqBody,
    @Query() moodId: string
  ): Promise<void> {
    return this.controllerWrapper(() => {
      const userInfo: MoodInfo = {
        moodId: moodId,
        userId: userId,
        mood: reqBody.mood,
        note: reqBody.note,
      };
      return updateMood(this.mwCtx, userInfo);
    }).then(this.returnNoContent());
  }
}

export default UpdateMoodController;
