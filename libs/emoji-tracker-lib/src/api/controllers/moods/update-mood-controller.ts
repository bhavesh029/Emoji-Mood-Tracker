/* eslint-disable promise/no-nesting */
import { MoodInfo, NoContentStatus } from "@emojiTracker-js/data-access";
import { RestrictedBaseController } from "@emojiTracker-js/milkyway-common";
import { Body, Header, Put, Query, Route, Tags } from "@tsoa/runtime";
import * as dotenv from "dotenv";
import { AddMoodReqBody } from "../../models/add-mood-req-body";
import { updateMood } from "../../services/mood-services";

dotenv.config();

@Route(`/users`)
@Tags("Moods")
/**
 * Handle all the details about the User's Mood
 */
export class UpdateMoodController extends RestrictedBaseController<void> {
  override successStatusCode = NoContentStatus;
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
    @Header("X-Access-Token") token: string,
    userId: string,
    @Body() reqBody: AddMoodReqBody,
    @Query() moodId: string
  ): Promise<void> {
    return this.controllerWrapper({ userId, token }, () => {
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
