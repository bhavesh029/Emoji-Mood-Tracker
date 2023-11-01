import { ErrorResponse } from '../error-response';

export class ErrorWrapper extends Error {
  statusCode: number;
  error: ErrorResponse;

  constructor(statusCode: number, errorRes: ErrorResponse) {
    super(errorRes.error.msg);

    Object.setPrototypeOf(this, new.target.prototype);
    this.name = Error.name;
    this.statusCode = statusCode;
    errorRes.error.stacktrace = this.stack;
    this.error = errorRes;
    Error.captureStackTrace(this);
  }
}
