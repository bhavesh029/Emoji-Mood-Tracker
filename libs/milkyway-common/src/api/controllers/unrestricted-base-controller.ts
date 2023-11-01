import {
  SuccessResponse,
  handleSuccess,
  StateSuccessResponse,
} from "@emojiTracker-js/data-access";
import { BaseController } from "./base-controller";

export abstract class UnRestrictedBaseController<T> extends BaseController {
  controllerWrapper<T>(
    controllerFunc: () => Promise<T>
  ): Promise<SuccessResponse<T>>;

  controllerWrapper<T>(
    controllerFunc: () => Promise<T | void>
  ): Promise<SuccessResponse<T> | void>;

  controllerWrapper(
    controllerFunc: () => Promise<T>
  ): Promise<SuccessResponse<T> | void> {
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
  ): Promise<SuccessResponse<T>> | Promise<void>;
}
