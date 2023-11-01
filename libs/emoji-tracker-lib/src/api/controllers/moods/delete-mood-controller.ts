/* eslint-disable promise/no-nesting */
import {
  CreatedSuccessfullyStatus,
  MoodInfo,
} from "@emojiTracker-js/data-access";
import { UnRestrictedBaseController } from "@emojiTracker-js/milkyway-common";
import { Body, Delete, Put, Query, Route, Tags } from "@tsoa/runtime";
import * as dotenv from "dotenv";
import { AddMoodReqBody } from "../../models/add-mood-req-body";
import { removeMood, updateMood } from "../../services/mood-services";

dotenv.config();

@Route(`/users`)
@Tags("Moods")
/**
 * Handle all the details about the User's Mood
 */
export class DeleteMoodController extends UnRestrictedBaseController<void> {
  override successStatusCode = CreatedSuccessfullyStatus;
  constructor() {
    super();
  }
  /**
   *
   * @summary delete user's mood
   *
   */
  @Delete("/{userId}/mood")
  handlerFunc(userId: string, @Query() moodId: string): Promise<void> {
    return this.controllerWrapper(() => {
      return removeMood(this.mwCtx, userId, moodId);
    }).then(this.returnNoContent());
  }
}

export default DeleteMoodController;
