export type ErrorResponse = {
  error: Error;
  state?: string;
};

export type Error = {
  msg: string;
  stacktrace?: unknown;
};
