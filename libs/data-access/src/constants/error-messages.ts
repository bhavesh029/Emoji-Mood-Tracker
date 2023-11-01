export const InvalidOrExpiredTokenErrMsg = 'Either token is invalid or expired';
export const NoAccessErrMsg = 'User has no access to this resource';

export function DataNotFoundErrMsg(msg?: string): string {
  return msg ? msg : 'No Data Found';
}

export const UnauthorizedErrMsg = 'Unauthorized';

export const NidPhotoNotMatchErrMsgId = 'nid-photo-does-not-match';

export const NidDobNotMatchErrMsgId = 'nid-dob-does-not-match';

export const NidNameNotMatchErrMsgId = 'nid-name-does-not-match';

export const KycEnterValidDlNumberErrMsgId = 'kyc-enter-valid-dl-number';

export const KycEnterValidAadhaarNumberErrMsgId =
  'kyc-enter-valid-aadhaar-number';

export const KycWrongAadhaarOtpEnteredErrMsgId = 'kyc-aadhaar-incorrect-otp';

export const KycAadhaarOtpExpiredErrMsgId = 'kyc-aadhaar-otp-expired';

export const WrongOtpErrMsg = 'Wrong Otp Entered';

export const OtpExpiredErrMsg =
  'OTP has been expired, please send the otp again';

export const OtpVerifyRetryLimitErrMsg =
  'Otp Retry Limit Reached. Resend Your Otp Again';

export const NidPhotoDoesNotExistErrMsgId = "dl-photo-dosen't exist";
