import { MwDbContext, UsersCreationAttributes, createUser } from "@emojiTracker-js/data-access";

export function addUser(
  ctx: MwDbContext,
  info: UsersCreationAttributes
) {
  return createUser(ctx, info.id, info.username, info.email);
}
