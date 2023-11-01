/* eslint-disable promise/no-nesting */
import * as dotenv from "dotenv";
import {
  WithContentStatus,
  StateSuccessResponse,
  ValidationErrRes,
  MwDbContext,
  SuccessResponse,
  UsersCreationAttributes,
  CreatedSuccessfullyStatus,
  generateCustomerId,
  generateUserId,
} from "@emojiTracker-js/data-access";
import { UnRestrictedBaseController } from "@emojiTracker-js/milkyway-common";
import { Route, Tags, Put, Header, Body } from "@tsoa/runtime";
import { addUser } from "../../services/user-services";
import { AddUserReqBody } from "../../models/add-user-req-body";

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
  @Put("/user/add")
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
