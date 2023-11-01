// authMiddleware.ts
import { Context, NextFunction } from "koa";
import * as jwt from "jsonwebtoken";
import { config } from "dotenv";
import { env } from "@emojiTracker-js/milkyway-common";

config();
export const authenticate = async (ctx: Context, next: NextFunction) => {
  const token = ctx.headers.authorization;

  try {
    if (!token) {
      throw new Error("Authorization header is missing.");
    }

    const user = jwt.verify(token, env("JWT_KEY")); // Replace with your actual secret key

    ctx.state.user = user;
  } catch (error) {
    ctx.status = 401;
    ctx.body = "Unauthorized";
    return;
  }

  await next();
};
