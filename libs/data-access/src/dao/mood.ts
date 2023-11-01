import { QueryTypes } from "sequelize";
import { MwDbContext } from "../context/mw-db-context";
import { checkIfUpdated } from "../handlers/error-handlers/error-handler";

export type MoodInfo = {
  moodId: string;
  userId: string;
  mood: string;
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
