/* eslint-disable promise/no-nesting */
import {
  CreatedSuccessfullyStatus,
  MoodInfo,
  UnsupportedFilterErrRes,
  generateMoodId,
} from "@emojiTracker-js/data-access";
import { RestrictedBaseController } from "@emojiTracker-js/milkyway-common";
import { Body, Header, Post, Route, Tags } from "@tsoa/runtime";
import * as dotenv from "dotenv";
import { AddMoodReqBody } from "../../models/add-mood-req-body";
import { addMood } from "../../services/mood-services";
import { moods } from "../constants/mood-contant";

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
   * Can Only Add These Moods 😀 😢 😡 😔 😍
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
      if (moods.includes(reqBody.mood)) {
        return addMood(this.mwCtx, userInfo);
      } else {
        return UnsupportedFilterErrRes();
      }
    }).then(this.returnNoContent());
  }
}

export default AddMoodController;
