import {
  MwDbContext,
  ValidationErrRes,
  decryptData,
  encryptData,
  getSharingData,
  insertShareData,
} from "@emojiTracker-js/data-access";
import { emojitrackerBaseUrl } from "../emoji-tracker-lib-api-info";

export function createHashAndInsertData(
  ctx: MwDbContext,
  userId: string,
  filter: string
) {
  const tobeHashed = `${emojitrackerBaseUrl}/users/${userId}/mood?filter=${filter}`;
  const hashedData = encryptData(tobeHashed);
  return insertShareData(ctx, userId, hashedData).then(
    () => `${emojitrackerBaseUrl}/users/share/${hashedData}`
  );
}

export function sendSharedData(ctx: MwDbContext, hashedData: string) {
  const original = decryptData(hashedData);
  return getSharingData(ctx, hashedData).then((bool) => {
    if (bool) {
      return fetch(original, { method: "Get" }).then((res) => {
        if (res.ok) {
          return res.json().then((val) => val);
        } else {
          throw new Error(`Request failed with status: ${res.status}`);
        }
      });
    } else {
      return ValidationErrRes();
    }
  });
}
