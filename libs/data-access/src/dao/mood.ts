import { QueryTypes } from "sequelize";
import { MwDbContext } from "../context/mw-db-context";
import { checkIfUpdated } from "../handlers/error-handlers/error-handler";

export type MoodCreateInfo = {
  moodId: string;
  userId: string;
  mood: string;
  note?: string;
};

export function createMood(ctx: MwDbContext, moodInfo: MoodCreateInfo) {
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

export function updateTodayMood(ctx: MwDbContext, mood, note, userId, moodId) {
  return ctx.conn
    .query(
      `update ${ctx.dbSchema}.moods set 
  emoji = '${mood}', note =${
        note == undefined ? null : `'${note}'`
      } where userid ='${userId}' and id ='${moodId}' and EXTRACT(DOY FROM moods."timestamp")=EXTRACT(DOY FROM CURRENT_DATE)`,
      { type: QueryTypes.UPDATE }
    )
    .then((res) => checkIfUpdated(res[1], `Failed to update mood`));
}
