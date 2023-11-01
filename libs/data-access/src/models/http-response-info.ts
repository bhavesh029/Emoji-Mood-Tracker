import { StatusCode } from './status-codes';

export type HttpResponseInfo = {
  responseHeader: string;
  statusCode: StatusCode;
};
