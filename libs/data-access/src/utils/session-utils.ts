import { env } from "@emojiTracker-js/milkyway-common";
import { AES, enc as cryptoJSEnc } from "crypto-js";

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
