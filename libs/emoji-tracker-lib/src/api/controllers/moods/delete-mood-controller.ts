/* eslint-disable promise/no-nesting */
import { CreatedSuccessfullyStatus } from "@emojiTracker-js/data-access";
import { RestrictedBaseController } from "@emojiTracker-js/milkyway-common";
import { Delete, Header, Query, Route, Tags } from "@tsoa/runtime";
import * as dotenv from "dotenv";
import { removeMood } from "../../services/mood-services";

dotenv.config();

@Route(`/users`)
@Tags("Moods")
/**
 * Handle all the details about the User's Mood
 */
export class DeleteMoodController extends RestrictedBaseController<void> {
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
  handlerFunc(
    @Header("X-Access-Token") token: string,
    userId: string,
    @Query() moodId: string
  ): Promise<void> {
    return this.controllerWrapper({ token, userId }, () => {
      return removeMood(this.mwCtx, userId, moodId);
    }).then(this.returnNoContent());
  }
}

export default DeleteMoodController;
