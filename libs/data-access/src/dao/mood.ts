import { QueryTypes } from "sequelize";
import { MwDbContext } from "../context/mw-db-context";
import { checkIfUpdated } from "../handlers/error-handlers/error-handler";
import { handleFindAllWithEmpty } from "../handlers/error-handlers/data-handler";

export type MoodInfo = {
  moodId: string;
  userId: string;
  mood: string;
  note?: string;
};

export type MoodStats = {
  emoji: string;
  moodCounts: string;
  note?: string;
};
export function createMood(ctx: MwDbContext, moodInfo: MoodInfo) {
  return ctx.conn
    .query(
      `INSERT INTO ${ctx.dbSchema}.moods
  (id, userid, emoji, note)
  VALUES('${moodInfo.moodId}','${moodInfo.userId}', '${moodInfo.mood}', ${
        moodInfo.note == undefined ? null : `'${moodInfo.note}'`
      });
  `,
      { type: QueryTypes.INSERT }
    )
    .then((res) => checkIfUpdated(res[1], `Failed to add mood`));
}

export function updateTodayMood(ctx: MwDbContext, moodInfo: MoodInfo) {
  return ctx.conn
    .query(
      `update ${ctx.dbSchema}.moods set 
  emoji = '${moodInfo.mood}', note =${
        moodInfo.note == undefined ? null : `'${moodInfo.note}'`
      } where userid ='${moodInfo.userId}' and id ='${moodInfo.moodId}'`,
      { type: QueryTypes.UPDATE }
    )
    .then((res) => checkIfUpdated(res[1], `Failed to update mood`));
}

export function deleteMood(ctx: MwDbContext, moodId: string, userId: string) {
  return ctx.conn
    .query(
      `delete from ${ctx.dbSchema}.moods where
      id='${moodId}' and userid ='${userId}'`,
      { type: QueryTypes.DELETE }
    )
    .then((res) => checkIfUpdated(res[1], `Failed to update mood`));
}

export function getMonthlyMoodData(
  ctx: MwDbContext,
  userId: string,
  monthFilter: number
) {
  return ctx.conn
    .query(
      `SELECT
      emoji,
      STRING_AGG(mood_count::TEXT, ', ') AS mood_counts,
      note
  FROM
      (SELECT userId, note, emoji, COUNT(*) AS mood_count FROM ${ctx.dbSchema}.moods where EXTRACT(MONTH FROM CURRENT_DATE)-${monthFilter} = EXTRACT(MONTH from created_timestamp) GROUP BY userId, emoji,note) m
  WHERE
      m.userId = '${userId}'
  GROUP BY emoji, note
  `,
      { type: QueryTypes.SELECT }
    )
    .then((res) => handleFindAllWithEmpty(res))
    .then((returnVal) => {
      return returnVal.map((res) => {
        let mapInfo: MoodStats;
        if (res["note"] || res)
          mapInfo = {
            emoji: res["emoji"],
            moodCounts: res["mood_counts"],
            note: res["note"],
          };
        else {
          mapInfo = {
            emoji: res["emoji"],
            moodCounts: res["mood_counts"],
          };
        }
        return mapInfo;
      });
    });
}

export function getAllTodayMoodData(ctx: MwDbContext) {
  return ctx.conn
    .query(
      `SELECT
  emoji,
  COUNT(*) AS mood_count
FROM
  ${ctx.dbSchema}.moods
WHERE
  DATE(created_timestamp) = CURRENT_DATE
GROUP BY emoji`,
      { type: QueryTypes.SELECT }
    )
    .then((res) => handleFindAllWithEmpty(res))
    .then((returnVal) => {
      return returnVal.map((res) => {
        console.log("mood pub data", res);
        let mapInfo: MoodStats = {
          emoji: res["emoji"],
          moodCounts: res["mood_count"],
        };

        return mapInfo;
      });
    });
}

export function getAllMonthMoodData(ctx: MwDbContext) {
  return ctx.conn
    .query(
      `    SELECT
  emoji,
  COUNT(*) AS mood_count
FROM
  ${ctx.dbSchema}.moods
WHERE
  DATE_TRUNC('month', created_timestamp) = DATE_TRUNC('month', CURRENT_DATE)
GROUP BY
  emoji;`,
      { type: QueryTypes.SELECT }
    )
    .then((res) => handleFindAllWithEmpty(res))
    .then((returnVal) => {
      return returnVal.map((res) => {
        let mapInfo: MoodStats = {
          emoji: res["emoji"],
          moodCounts: res["mood_counts"],
        };

        return mapInfo;
      });
    });
}

export function getTodayMoodData(ctx: MwDbContext, userId: string) {
  return ctx.conn
    .query(
      `SELECT
  emoji,
  COUNT(*) AS mood_count
FROM
userid ='${userId}' and
  ${ctx.dbSchema}.moods
WHERE
  DATE(created_timestamp) = CURRENT_DATE
GROUP BY emoji`,
      { type: QueryTypes.SELECT }
    )
    .then((res) => handleFindAllWithEmpty(res))
    .then((returnVal) => {
      return returnVal.map((res) => {
        let mapInfo: MoodStats = {
          emoji: res["emoji"],
          moodCounts: res["mood_counts"],
        };

        return mapInfo;
      });
    });
}

export function getMonthMoodData(ctx: MwDbContext, userId: string) {
  return ctx.conn
    .query(
      `    SELECT
  emoji,
  COUNT(*) AS mood_count
FROM
  ${ctx.dbSchema}.moods
WHERE
userid ='${userId}' and
  DATE_TRUNC('month', created_timestamp) = DATE_TRUNC('month', CURRENT_DATE)
GROUP BY
  emoji;`,
      { type: QueryTypes.SELECT }
    )
    .then((res) => handleFindAllWithEmpty(res))
    .then((returnVal) => {
      return returnVal.map((res) => {
        let mapInfo: MoodStats = {
          emoji: res["emoji"],
          moodCounts: res["mood_counts"],
        };

        return mapInfo;
      });
    });
}
