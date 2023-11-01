/* eslint-disable promise/no-nesting */
import {
  CreatedSuccessfullyStatus,
  MoodInfo,
  generateMoodId,
} from "@emojiTracker-js/data-access";
import { RestrictedBaseController } from "@emojiTracker-js/milkyway-common";
import { Body, Header, Post, Route, Tags } from "@tsoa/runtime";
import * as dotenv from "dotenv";
import { AddMoodReqBody } from "../../models/add-mood-req-body";
import { addMood } from "../../services/mood-services";

dotenv.config();

@Route(`/users`)
@Tags("Moods")
/**
 * Handle all the details about the User's Mood
 */
export class AddMoodController extends RestrictedBaseController<void> {
  override successStatusCode = CreatedSuccessfullyStatus;
  constructor() {
    super();
  }
  /**
   *
   * @summary create new user's mood
   *
   */
  @Post("/{userId}/mood")
  handlerFunc(
    @Header("X-Access-Token") token: string,
    userId: string,
    @Body() reqBody: AddMoodReqBody
  ): Promise<void> {
    return this.controllerWrapper({ token, userId }, () => {
      const userInfo: MoodInfo = {
        moodId: generateMoodId(),
        userId: userId,
        mood: reqBody.mood,
        note: reqBody.note,
      };
      return addMood(this.mwCtx, userInfo);
    }).then(this.returnNoContent());
  }
}

export default AddMoodController;
