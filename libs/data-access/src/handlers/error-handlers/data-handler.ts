import { DataNotFoundErrMsg } from '../../constants/error-messages';
import { ResourceNotFoundErrRes } from '../../constants/error-responses';

export function handleNull<T>(x: T, message: string) {
  if (x == null || x == undefined) {
    return ResourceNotFoundErrRes(message);
  } else return x;
}

export function handleFindOne<T>(x: T, msg?: string) {
  return handleNull<T>(x, DataNotFoundErrMsg(msg));
}

export function handleRawQueryFindOne<T>(data: T[], msg?: string): Promise<T> {
  if (data.length != 0) {
    return Promise.resolve(data[0]);
  } else return ResourceNotFoundErrRes(DataNotFoundErrMsg(msg));
}

export function handleFindAll<T>(data: T[], msg?: string): Promise<T[]> {
  if (data.length != 0) {
    return Promise.resolve(data);
  } else return ResourceNotFoundErrRes(DataNotFoundErrMsg(msg));
}

export function handleFindAllWithEmpty<T>(data: T[]): T[] {
  if (data.length != 0) {
    return data;
  } else return [];
}
