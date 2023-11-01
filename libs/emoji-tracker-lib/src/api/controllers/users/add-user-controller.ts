/* eslint-disable promise/no-nesting */
import {
  SuccessResponse,
  UsersCreationAttributes,
  WithContentStatus,
  encryptData,
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
export class AddUserController extends UnRestrictedBaseController<string> {
  override successStatusCode = WithContentStatus;
  constructor() {
    super();
  }
  /**
   *
   * @summary create new user
   *
   */
  @Post("/create")
  handlerFunc(@Body() info: AddUserReqBody): Promise<SuccessResponse<string>> {
    return this.controllerWrapper(() => {
      const id = generateUserId();
      const userInfo: UsersCreationAttributes = {
        id: id,
        username: info.username,
        email: info.email,
        token: encryptData(id),
      };
      return addUser(this.mwCtx, userInfo);
    });
  }
}

export default AddUserController;
