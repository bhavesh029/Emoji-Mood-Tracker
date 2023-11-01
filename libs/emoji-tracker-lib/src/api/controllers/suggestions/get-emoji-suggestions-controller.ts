/* eslint-disable promise/no-nesting */
import {
  SuccessResponse,
  WithContentStatus,
} from "@emojiTracker-js/data-access";
import { RestrictedBaseController } from "@emojiTracker-js/milkyway-common";
import { Get, Header, Query, Route, Tags } from "@tsoa/runtime";
import * as dotenv from "dotenv";
import MoodhashMap from "../constants/mood-map-constant";

dotenv.config();

@Route(`/users`)
@Tags("Suggestions")
/**
 * Handle all the details about the User's Mood
 */
export class GetEmojiSuggestionsController extends RestrictedBaseController<
  string | undefined
> {
  override successStatusCode = WithContentStatus;
  constructor() {
    super();
  }
  /**
   *
   * @summary give user emoji suggestion based on there notes
   *
   */
  @Get("/{userId}/mood/suggestion")
  handlerFunc(
    @Header("X-Access-Token") token: string,
    userId: string,
    @Query() text: string
  ): Promise<SuccessResponse<string | undefined>> {
    return this.controllerWrapper({ userId, token }, () => {
      const textArr = text.split(" ");
      let suggestion: string | undefined;
      textArr.forEach((val) => {
        if (MoodhashMap.get(val) != undefined) {
          suggestion = MoodhashMap.get(val);
        } else {
          suggestion = "";
        }
      });
      return Promise.resolve(suggestion);
    });
  }
}

export default GetEmojiSuggestionsController;
