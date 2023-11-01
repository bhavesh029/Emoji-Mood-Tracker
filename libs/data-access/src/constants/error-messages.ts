export const InvalidOrExpiredTokenErrMsg = "Either token is invalid or expired";
export const NoAccessErrMsg = "User has no access to this resource";

export function DataNotFoundErrMsg(msg?: string): string {
  return msg ? msg : "No Data Found";
}

export const UnauthorizedErrMsg = "Unauthorized";
