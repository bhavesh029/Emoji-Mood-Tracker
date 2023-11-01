import {
  MoodCreateInfo,
  MwDbContext,
  createMood,
} from "@emojiTracker-js/data-access";

export function addMood(ctx: MwDbContext, info: MoodCreateInfo) {
  return createMood(ctx, info);
}
