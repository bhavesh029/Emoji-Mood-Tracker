import { SpecCtx } from "../models/env";
import { MwDbContext } from "./mw-db-context";
import { MwTables } from "./mw-tables";
import { DbContext } from "../db/connection";
export interface Tables {
  mwTables?: MwTables;
}

export function prepMwCtx(
  dbCtx: DbContext,
  tables: Tables,
  specCtx?: SpecCtx
): Promise<DbContext> {
  return Promise.resolve(dbCtx).then(() => {
    const mwDbCtx = new MwDbContext(
      dbCtx.conn,
      dbCtx.dbSchema,
      tables.mwTables
    );

    return mwDbCtx;
  });
}
