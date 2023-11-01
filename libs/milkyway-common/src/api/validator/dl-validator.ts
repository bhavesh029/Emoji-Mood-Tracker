import { KycDlVerifyReqBody } from '../controllers/models/kyc-dl-verify-req-body';

export function checkIfDlIsValid(dlData: KycDlVerifyReqBody) {
  const regex = /^(([A-Z]{2}[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$/;
  return dlData.drivingLicence.match(regex) != null;
}
