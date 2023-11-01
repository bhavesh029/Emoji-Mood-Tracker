import {
  MwDbContext,
  ValidationErrRes,
  getSharingData,
  insertShareData,
} from "@emojiTracker-js/data-access";
import { env } from "@emojiTracker-js/milkyway-common";
import { AES, enc as cryptoJSEnc } from "crypto-js";
import { emojitrackerBaseUrl } from "../emoji-tracker-lib-api-info";

export function encryptData(data: string): string {
  const encrypted = AES.encrypt(data, env("AES_KEY")).toString();
  return encrypted;
}

export function decryptData(data: string) {
  const decryptData = AES.decrypt(data, env("AES_KEY"));
  const original = decryptData.toString(cryptoJSEnc.Utf8);
  console.log("decryptData", original);
  return original;
}

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
