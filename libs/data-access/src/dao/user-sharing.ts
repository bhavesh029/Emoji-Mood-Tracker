import { MwDbContext } from "../context/mw-db-context";
import { QueryTypes } from "sequelize";
import { handleRawQueryFindOne } from "../handlers/error-handlers/data-handler";

export function insertShareData(
  ctx: MwDbContext,
  userId: string,
  hash: string
) {
  return ctx.conn.query(
    `INSERT INTO emoji_tracker_app.user_sharing
  (user_id, shared_hash, created_timestamp)
  VALUES('${userId}', '${hash}', CURRENT_DATE);
  `,
    { type: QueryTypes.INSERT }
  );
}

export function getSharingData(ctx: MwDbContext, hash: string) {
  return ctx.conn
    .query(
      `select sharing_enabled  from ${ctx.dbSchema}.users  
      where
       id =(select user_id from ${ctx.dbSchema}.user_sharing us where shared_hash='${hash}')`,
      { type: QueryTypes.SELECT }
    )
    .then((res) => handleRawQueryFindOne(res, `User not found`))
    .then((val) => {
      console.log("value:::   ", val);
      return val["sharing_enabled"] as boolean;
    });
}
