import { QueryTypes } from "sequelize";
import { MwDbContext } from "../context/mw-db-context";
import { checkIfUpdated } from "../handlers/error-handlers/error-handler";
import { handleRawQueryFindOne } from "../handlers/error-handlers/data-handler";

export function createUser(
  ctx: MwDbContext,
  userId: string,
  userName: string,
  email: string,
  token: string
): Promise<string> {
  return ctx.conn
    .query(
      `INSERT INTO ${ctx.dbSchema}.users (id, username, email, token)
      VALUES ('${userId}', '${userName}', '${email}', '${token}')
      ON CONFLICT (email) DO UPDATE
      SET token = excluded.token
      RETURNING token;
    `,
      { type: QueryTypes.SELECT }
    )
    .then((res) => handleRawQueryFindOne(res))
    .then((data) => data["token"] as string);
}
