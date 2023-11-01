import {
  MoodInfo,
  MwDbContext,
  UnsupportedFilterErrRes,
  createMood,
  deleteMood,
  getAllMonthMoodData,
  getAllTodayMoodData,
  getMonthMoodData,
  getMonthlyMoodData,
  getTodayMoodData,
  updateTodayMood,
} from "@emojiTracker-js/data-access";

export function addMood(ctx: MwDbContext, info: MoodInfo) {
  return createMood(ctx, info);
}

export function updateMood(ctx: MwDbContext, info: MoodInfo) {
  return updateTodayMood(ctx, info);
}

export function removeMood(ctx: MwDbContext, userId: string, moodId: string) {
  return deleteMood(ctx, moodId, userId);
}

export function getMoodData(
  ctx: MwDbContext,
  userId: string,
  monthFilter: string
) {
  let monthFilterMap = new Map<string, number>();

  monthFilterMap.set("this-month", 0);
  monthFilterMap.set("previous-month", 1);
  monthFilterMap.set("last-month", 2);

  let val: number;
  if (monthFilterMap.get(monthFilter) != undefined) {
    val = monthFilterMap.get(monthFilter) as number;
  } else {
    return UnsupportedFilterErrRes();
  }
  return getMonthlyMoodData(ctx, userId, val);
}

export function getPublicMoodData(ctx: MwDbContext, filter: string) {
  if (filter == "today") {
    return getAllTodayMoodData(ctx);
  } else if (filter == "this-month") {
    return getAllMonthMoodData(ctx);
  } else {
    return UnsupportedFilterErrRes();
  }
}

export function getUserMoodData(
  ctx: MwDbContext,
  filter: string,
  userId: string
) {
  if (filter == "today") {
    return getTodayMoodData(ctx, userId);
  } else if (filter == "this-month") {
    return getMonthMoodData(ctx, userId);
  } else {
    return UnsupportedFilterErrRes();
  }
}
