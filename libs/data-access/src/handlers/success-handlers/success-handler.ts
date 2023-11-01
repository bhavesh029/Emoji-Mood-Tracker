import { Controller } from '@tsoa/runtime';
import { InternalServerErrRes } from '../../constants/error-responses';
import { StatusCode } from '../../models/status-codes';
import { HttpResponseInfo } from '../../models/http-response-info';
import { ContentTypeKey } from '../../constants/http-response-header-constants';

/**
 *
 * This function is useful if we want to use the status code other than 200
 */

export function handleSuccess<T>(
  res: T,
  responseInfo: HttpResponseInfo,
  scope?: Controller
): T {
  if (scope == undefined) {
    console.error('Scope is not defined');
    throw InternalServerErrRes;
  }

  scope.setStatus(responseInfo.statusCode.code);
  scope.setHeader(ContentTypeKey, responseInfo.responseHeader);
  return res;
}
