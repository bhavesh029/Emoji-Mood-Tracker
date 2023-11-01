import { prepareErrorRes } from "../handlers/error-handlers/error-handler";
import {
  BadRequestFailedStatus,
  InvalidInputStatus,
  PreconditionFailedStatus,
  ResourceAlreadyExistsStatus,
  ResourceNotFoundStatus,
  TooManyRequestsStatus,
  UnauthorizedStatus,
} from "../models/status-codes";
import { prepMsg } from "../utils/response-utils";
import {
  InvalidOrExpiredTokenErrMsg,
  UnauthorizedErrMsg,
} from "./error-messages";
import { InternalServerErr, ValidationErr } from "./errors";

export function InternalServerErrRes(msg?: string): Promise<never> {
  return Promise.reject(InternalServerErr(msg));
}
export function ValidationErrRes(msg?: string): Promise<never> {
  return Promise.reject(ValidationErr(msg));
}

export function ResourceAlreadyExistsErrRes(msg?: string): Promise<never> {
  return Promise.reject(
    prepareErrorRes(ResourceAlreadyExistsStatus.code, {
      error: { msg: prepMsg("Resource Already Exists", msg) },
    })
  );
}

export function PreconditionFailedErrRes(msg?: string): Promise<never> {
  return Promise.reject(
    prepareErrorRes(PreconditionFailedStatus.code, {
      error: { msg: prepMsg("Precondition Failed", msg) },
    })
  );
}

export function ResourceNotFoundErrRes(msg?: string): Promise<never> {
  return Promise.reject(
    prepareErrorRes(ResourceNotFoundStatus.code, {
      error: { msg: prepMsg("Resource Not Found", msg) },
    })
  );
}

export function UnauthorizedErrRes(msg?: string): Promise<never> {
  return Promise.reject(
    prepareErrorRes(UnauthorizedStatus.code, {
      error: { msg: prepMsg(UnauthorizedErrMsg, msg) },
    })
  );
}

export function UnsupportedFilterErrRes() {
  return Promise.reject(
    prepareErrorRes(InvalidInputStatus.code, {
      error: { msg: "Unsupported filter" },
    })
  );
}

export function VerificationFailedErrRes(msg: string): Promise<never> {
  return Promise.reject(
    prepareErrorRes(BadRequestFailedStatus.code, {
      error: { msg: prepMsg(msg) },
    })
  );
}

export function InvalidRequestErrRes(msg: string): Promise<never> {
  return Promise.reject(
    prepareErrorRes(BadRequestFailedStatus.code, {
      error: { msg: prepMsg(msg) },
    })
  );
}

export function DuplicateAuthzKeyFoundErrRes() {
  return Promise.reject(
    new Error("Duplicate authkeys found in the permissions to authorize")
  );
}



export function DataNotMatchErrRes(errorMsg: string, state: string) {
  return Promise.reject(
    prepareErrorRes(BadRequestFailedStatus.code, {
      error: { msg: errorMsg },
      state,
    })
  );
}

export function TooManyRequestErrRes(msg: string): Promise<never> {
  return Promise.reject(
    prepareErrorRes(TooManyRequestsStatus.code, {
      error: { msg },
    })
  );
}
