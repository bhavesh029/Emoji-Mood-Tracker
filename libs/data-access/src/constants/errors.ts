import { prepareErrorRes } from '../handlers/error-handlers/error-handler';
import { ErrorWrapper } from '../handlers/error-handlers/error-wrapper';
import {
  InternalServerErrorStatus,
  InvalidInputStatus,
} from '../models/status-codes';
import { prepMsg } from '../utils/response-utils';

export function ValidationErr(msg?: string): ErrorWrapper {
  return prepareErrorRes(InvalidInputStatus.code, {
    error: { msg: prepMsg('Validation Failed', msg) },
  });
}

export function InternalServerErr(msg?: string): ErrorWrapper {
  return prepareErrorRes(InternalServerErrorStatus.code, {
    error: { msg: prepMsg(`Internal Server Error`, msg) },
  });
}