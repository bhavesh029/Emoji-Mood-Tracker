import {
  MoodInfo,
  MwDbContext,
  createMood,
  updateTodayMood,
} from "@emojiTracker-js/data-access";

export function addMood(ctx: MwDbContext, info: MoodInfo) {
  return createMood(ctx, info);
}

export function updateMood(ctx: MwDbContext, info: MoodInfo) {
  return updateTodayMood(ctx, info);
}
