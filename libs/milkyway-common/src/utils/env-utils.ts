import * as dotenv from 'dotenv';
dotenv.config();

export function env<T>(key: string): T {
  const s = process.env[key];
  if (s == undefined) {
    throw new Error(`Env KEY: ${key} is not undefined`);
  } else {
    return s as T;
  }
}
