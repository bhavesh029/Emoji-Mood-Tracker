import {
  ContentTypeJson,
  DbContext,
  ErrorWrapper,
  SuccessResponse,
  Tables,
  getConnectionDbCtx,
  handleChainError,
} from "@emojiTracker-js/data-access";
import { Controller } from "@tsoa/runtime";
import { StatusCode } from "libs/data-access/src/models/status-codes";
import { Sequelize } from "sequelize";

export abstract class BaseController extends Controller {
  mwCtx!: DbContext;
  userId!: string;
  abstract successStatusCode: StatusCode;
  responseHeader = ContentTypeJson;
  skipStateCheck = false;

  getCtx(): Promise<DbContext> {
    return (
      getConnectionDbCtx()
        // .then((dbCtx) =>
        // prepMwCtx(dbCtx, this.setTables(dbCtx.conn), this.ctrlCtx)
        // )
        .then((mwCtx) => {
          this.mwCtx = mwCtx;
          return mwCtx;
        })
    );
  }

  protected controllerExecutor<T>(
    res: Promise<T>
  ): Promise<SuccessResponse<T>> {
    return res.then((res) => {
      const s: SuccessResponse<T> = {
        response: res,
      };
      return s;
    });
  }

  // protected handleState<T>(
  //   applicationId: number,
  //   res?: T
  // ): Promise<SuccessResponse<T> | void> {
  //   return this.getCtx()
  //     .then((stateChangedTo) => {
  //       if (res != undefined) {
  //         const s: SuccessResponse<T> = {
  //           response: res,
  //         };
  //         return s;
  //       } else {
  //         return;
  //       }
  //     })
  //     .catch((e) => this.handleCtrlError(e))
  //     .finally(() => this.closeDbConn());
  // }

  returnNoContent(): () => void {
    return () => {
      const voidRes: void = undefined;
      return voidRes;
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setTables(conn: Sequelize): Tables {
    return {};
  }

  handleCtrlError(err: unknown): Promise<never> {
    if (err instanceof ErrorWrapper && err.error.state != undefined) {
      const state = err.error.state;
      return handleChainError(err);
    } else {
      console.log(`------` + err);
      return handleChainError(err);
    }
  }

  closeDbConn() {
    if (this.mwCtx != undefined) this.mwCtx.conn.close();
  }
}
