import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";
import * as pg from "pg";
import { handleChainError } from "../handlers/error-handlers/error-handler";
dotenv.config();

export interface DbContext {
  conn: Sequelize;
  dbSchema: string;
}

export function getConnectionDbCtx(): Promise<DbContext> {
  return Promise.resolve(getSequelize())
    .then((ctx) =>
      ctx.conn.authenticate().then(() => {
        return ctx;
      })
    )
    .catch((e) => handleChainError(e));

  // or `sequelize.sync()`
}

export function getSequelize(): DbContext {
  const url = process.env.DATABASE_URL;
  const dbSchema = process.env.DB_SCHEMA;

  if (url == undefined || dbSchema == undefined) {
    throw new Error("All required db properties are not provided");
  }

  console.log(`Connecting to ${url}`);

  const conn = new Sequelize(url, {
    dialectModule: pg,
    schema: dbSchema,
    // retry: { max: 10, timeout: 3000 },
    pool: {
      /*
       * Lambda functions process one request at a time but your code may issue multiple queries
       * concurrently. Be wary that `sequelize` has methods that issue 2 queries concurrently
       * (e.g. `Model.findAndCountAll()`). Using a value higher than 1 allows concurrent queries to
       * be executed in parallel rather than serialized. Careful with executing too many queries in
       * parallel per Lambda function execution since that can bring down your database with an
       * excessive number of connections.
       *
       * Ideally you want to choose a `max` number where this holds true:
       * max * EXPECTED_MAX_CONCURRENT_LAMBDA_INVOCATIONS < MAX_ALLOWED_DATABASE_CONNECTIONS * 0.8
       */
      max: 2,
      /*
       * Set this value to 0 so connection pool eviction logic eventually cleans up all connections
       * in the event of a Lambda function timeout.
       */
      min: 0,
      /*
       * Set this value to 0 so connections are eligible for cleanup immediately after they're
       * returned to the pool.
       */
      idle: 0,
      // Choose a small enough value that fails fast if a connection takes too long to be established.
      acquire: 3000,
      /*
       * Ensures the connection pool attempts to be cleaned up automatically on the next Lambda
       * function invocation, if the previous invocation timed out.
       */
      evict: 4000, //CURRENT_LAMBDA_FUNCTION_TIMEOUT
    },
  });
  const ctx: DbContext = { conn, dbSchema };
  return ctx;
}

export function createOrLoadConnection(ctx: DbContext): Promise<DbContext> {
  if (!ctx.conn) {
    console.log("****** Creating new connection *******");
    return getConnectionDbCtx();
  } else {
    // restart connection pool to ensure connections are not re-used across invocations
    return Promise.resolve()
      .then(() => console.log("****** Reusing connection *******"))
      .then(() => ctx.conn.connectionManager.initPools())
      .then(() => {
        // restore `getConnection()` if it has been overwritten by `close()`
        // eslint-disable-next-line no-prototype-builtins
        // if (ctx.conn.connectionManager.hasOwnProperty('getConnection')) {
        // delete ctx.conn.connectionManager.releaseConnection;
        // }
        return ctx;
      })
      .catch((e) => handleChainError(e));
  }
}
