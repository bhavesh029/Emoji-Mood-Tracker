import { MwDbContext } from "../context/mw-db-context";
import { handleFindOne } from "../handlers/error-handlers/data-handler";
import { checkIfUpdated } from "../handlers/error-handlers/error-handler";

export function createUser(
  ctx: MwDbContext,
  userId: string,
  userName: string,
  email: string
): Promise<number> {
  return ctx.conn
    .query(
      `INSERT INTO ${ctx.dbSchema}.users
    (id, username, email)
    VALUES('${userId}', '${userName}', '${email}');
    `
    )
    .then((res) => checkIfUpdated(res[1] as number, `Failed to create user`));
}
