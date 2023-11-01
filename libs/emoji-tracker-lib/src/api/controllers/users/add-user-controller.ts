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
} from "@emojiTracker-js/data-access";
import { UnRestrictedBaseController } from "@emojiTracker-js/milkyway-common";
import { Route, Tags, Put, Header, Body } from "@tsoa/runtime";
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
  @Put("/user/add")
  handlerFunc(@Body() info: UsersCreationAttributes): Promise<void> {
    return this.controllerWrapper(() => {
      return addUser(this.mwCtx, info);
    }).then(this.returnNoContent());
  }
}

export default AddUserController;
