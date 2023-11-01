import {
  InvalidOrExpiredTokenErrMsg,
  SuccessResponse,
  UnauthorizedErrRes,
  decryptData,
  handleSuccess,
} from "@emojiTracker-js/data-access";
import { TokenBearer } from "../authz/models/token-bearer";
import { BaseController } from "./base-controller";

export abstract class RestrictedBaseController<T> extends BaseController {
  controllerWrapper<T>(
    tokenBr: TokenBearer,
    controllerFunc: () => Promise<T>
  ): Promise<SuccessResponse<T>> {
    return this.getCtx()
      .then(() =>
        this.getUserId(tokenBr.token)
          .then((userId) => {
            this.userId = userId;
            return this.validateTokenUserId(tokenBr, userId);
          })
          .then(() => this.controllerExecutor(controllerFunc()))
          .then((res) =>
            handleSuccess(
              res,
              {
                responseHeader: this.responseHeader,
                statusCode: this.successStatusCode,
              },
              this
            )
          )
      )
      .catch((e) => this.handleCtrlError(e))
      .finally(() => this.closeDbConn());
  }

  private getUserId(token: string): Promise<string> {
    return Promise.resolve(token)
      .then(() => decryptData(token))
      .catch((err) => {
        console.error(err);
        return UnauthorizedErrRes(InvalidOrExpiredTokenErrMsg);
      });
  }

  validateTokenUserId(
    tokenBr: TokenBearer,
    decryptedTokenUserId: string
  ): Promise<boolean> {
    return Promise.resolve(tokenBr.userId).then((tokenUserId) => {
      console.log(`Checking token user`);
      const isSameUser = tokenUserId == decryptedTokenUserId;
      console.log(
        `Requested profile userId & token userId isSame: ${isSameUser}`
      );
      return Promise.resolve(isSameUser).then((val) => {
        if (val) {
          return val;
        } else {
          return UnauthorizedErrRes();
        }
      });
    });
  }
  abstract handlerFunc(
    ...parameters: unknown[]
  ): Promise<SuccessResponse<T> | void>;
}
