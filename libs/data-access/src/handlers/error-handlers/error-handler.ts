import {
  NextFunction,
  Request as ExRequest,
  Response as ExResponse,
} from 'express';
import { ValidateError } from '@tsoa/runtime';
import { ErrorResponse } from '../error-response';
import { ErrorWrapper } from './error-wrapper';
import {
  InternalServerErrRes,
  PreconditionFailedErrRes,
} from '../../constants/error-responses';
import { InternalServerErr, ValidationErr } from '../../constants/errors';

export function prepareErrorRes(
  statusCode: number,
  error: ErrorResponse,
  label = 'API Failed'
): ErrorWrapper {
  const err = new ErrorWrapper(statusCode, error);
  console.error(`*** ${label} | ${err} ***`);
  return err;
}

export function handleChainErrorF(): (reason: unknown) => Promise<never> {
  return (err: unknown) => {
    return handleChainError(err);
  };
}

export function handleChainError(err: unknown): Promise<never> {
  if (err instanceof ErrorWrapper) {
    return Promise.reject(err);
  } else {
    if (err instanceof Error) {
      console.error(`Caught Unhandled Error: ${err.message}`, '\n', err.stack);
    } else {
      console.error(`Caught Unknown Error Instance: ${err}`);
    }
    return InternalServerErrRes();
  }
}

export function checkIfUpdated(
  numOfRowsUpdated: number,
  msg: string
): Promise<number> {
  if (numOfRowsUpdated != 0) {
    return Promise.resolve(numOfRowsUpdated);
  } else {
    return PreconditionFailedErrRes(msg);
  }
}

// export function middlewareErrorHandler() {
export function middlewareErrorHandler(
  err: unknown,
  req: ExRequest,
  res: ExResponse,
  next: NextFunction
): ExResponse | void {
  if (err instanceof ValidateError) {
    console.error(`Caught Validation Error for ${req.path}:`, err.fields);
    const errorRes: ErrorResponse = {
      error: {
        msg: ValidationErr().message,
        stacktrace: err?.fields,
      },
    };
    return res.status(ValidationErr().statusCode).json(errorRes);
  } else if (err instanceof ErrorWrapper) {
    console.error(
      `Caught Handled Error: Status ${err.statusCode} | ${err.message}\n ${err.stack}`
    );
    return res.status(err.statusCode).json(err.error);
  } else if (err instanceof Error) {
    console.error(`Caught Unhandled Error: ${err}, '\n', ${err.stack}`);
    return res
      .status(InternalServerErr().statusCode)
      .json(InternalServerErr().error);
  }

  next();
}
