/* eslint-disable promise/no-nesting */
import {
  CreatedSuccessfullyStatus,
  UsersCreationAttributes,
  generateUserId,
} from "@emojiTracker-js/data-access";
import { UnRestrictedBaseController } from "@emojiTracker-js/milkyway-common";
import { Body, Post, Route, Tags } from "@tsoa/runtime";
import * as dotenv from "dotenv";
import { AddUserReqBody } from "../../models/add-user-req-body";
import { addUser } from "../../services/user-services";

dotenv.config();

@Route(`/users`)
@Tags("Users")
/**
 * Handle all the details about the partner
 */
export class AddUserController extends UnRestrictedBaseController<void> {
  override successStatusCode = CreatedSuccessfullyStatus;
  constructor() {
    super();
  }
  /**
   *
   * @summary create new user
   *
   */
  @Post("/create")
  handlerFunc(@Body() info: AddUserReqBody): Promise<void> {
    return this.controllerWrapper(() => {
      const userInfo: UsersCreationAttributes = {
        id: generateUserId(),
        username: info.username,
        email: info.email,
      };
      return addUser(this.mwCtx, userInfo);
    }).then(this.returnNoContent());
  }
}

export default AddUserController;
