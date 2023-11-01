export interface SuccessResponse<T> {
  response: T;
}

export interface StateSuccessResponse<T> {
  response: T;
  state: string;
}

export interface StateSuccessNoResponse {
  state: string;
}