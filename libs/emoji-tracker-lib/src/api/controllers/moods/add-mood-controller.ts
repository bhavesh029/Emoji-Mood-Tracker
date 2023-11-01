/* eslint-disable promise/no-nesting */
import {
  CreatedSuccessfullyStatus,
  MoodCreateInfo,
  UsersCreationAttributes,
  generateMoodId,
  generateUserId,
} from "@emojiTracker-js/data-access";
import { UnRestrictedBaseController } from "@emojiTracker-js/milkyway-common";
import { Body, Post, Route, Tags } from "@tsoa/runtime";
import * as dotenv from "dotenv";
import { AddUserReqBody } from "../../models/add-user-req-body";
import { addUser } from "../../services/user-services";
import { AddMoodReqBody } from "../../models/add-mood-req-body";
import { addMood } from "../../services/mood-services";

dotenv.config();

@Route(`/users`)
@Tags("Moods")
/**
 * Handle all the details about the partner
 */
export class AddMoodController extends UnRestrictedBaseController<void> {
  override successStatusCode = CreatedSuccessfullyStatus;
  constructor() {
    super();
  }
  /**
   *
   * @summary create new user
   *
   */
  @Post("/{userId}/mood")
  handlerFunc(userId: string, @Body() reqBody: AddMoodReqBody): Promise<void> {
    return this.controllerWrapper(() => {
      const userInfo: MoodCreateInfo = {
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
