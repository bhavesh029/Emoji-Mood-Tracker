import {
  handleSuccess,
  MwState,
  SuccessResponse,
} from "@emojiTracker-js/data-access";
import { TokenBearer } from "../authz/models/token-bearer";
import { BaseController } from "./base-controller";

export abstract class RestrictedBaseController<T> extends BaseController {
  controllerWrapper<T>(
    tokenBr: TokenBearer,
    controllerFunc: () => Promise<T>,
    authzKey?: string,
    state?: MwState
  ): Promise<SuccessResponse<T>> {
    return this.getCtx()
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
      .catch((e) => this.handleCtrlError(e))
      .finally(() => this.closeDbConn());
  }

  abstract handlerFunc(
    ...parameters: unknown[]
  ): Promise<SuccessResponse<T> | void>;
}
