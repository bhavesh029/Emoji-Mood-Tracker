import { MwState } from '../models/mw-state';

export const KycVerifiedState: MwState = { value: 'KYC-VERIFIED' };
export const KycPersonalDetailsFailedState: MwState = {
  value: 'KYC-PERSONAL-DETAILS-FAILED',
};
export const KycPhotoMatchFailedState: MwState = {
  value: 'KYC-PHOTO-MATCH-FAILED',
};

export const KycDlPhotoMatchFailedState: MwState = {
  value: 'KYC-DL-PHOTO-MATCH-FAILED',
};
