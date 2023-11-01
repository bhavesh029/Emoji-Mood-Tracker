import { Sequelize } from "sequelize";
import { MwTables } from "./mw-tables";
import { DbContext } from "../db/connection";

export class MwDbContext implements DbContext {
  conn: Sequelize;
  dbSchema: string;
  tables?: MwTables;

  constructor(conn: Sequelize, schema: string, tables?: MwTables) {
    this.conn = conn;
    this.dbSchema = schema;
    this.tables = tables;
  }
}
