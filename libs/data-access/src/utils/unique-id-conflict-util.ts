import { QueryTypes, Sequelize } from "sequelize";
import { checkIfUpdated } from "../handlers/error-handlers/error-handler";
import { isConstraintViolates } from "./db-utils";

export type ResolvedConflictedIdInfo = { workingId: string; retried: number };
export interface ResolvedConflictedFuncError extends Error {
  retried: number;
  error: unknown;
}

type Params = {
  conn: Sequelize;
  queryStr: string;
  retryCount: number;
  idCol: string;
  constraintName: string;
  generateValue: () => string;
  queryTypes: QueryTypes;
};

export function retryOnCollision(
  params: Params,
  retried = 0
): Promise<ResolvedConflictedIdInfo> {
  return runQuery(params).catch((e) => {
    if (
      isConstraintViolates(e, params.constraintName) &&
      retried != params.retryCount
    ) {
      retried += 1;
      console.error(`Retrying on collision ${retried} time`);
      return retryOnCollision(params, retried);
    } else {
      console.error(`Query failed`, e);
      const conflictErr: ResolvedConflictedFuncError = {
        retried,
        error: e,
        name: "MWIdConflictResolverFuncError",
        message: "Conflict resolver failed",
      };

      throw conflictErr;
    }
  });
}

function runQuery(params: Params): Promise<ResolvedConflictedIdInfo> {
  const value = params.generateValue();
  const updatedQuery = params.queryStr.replaceAll(`{${params.idCol}}`, value);

  return params.conn
    .query(updatedQuery, {
      type: params.queryTypes,
    })
    .then((res) => {
      if (params.queryTypes == QueryTypes.UPDATE) {
        return handleIfUpdated(res, value, params);
      } else {
        return { workingId: value, retried: params.retryCount };
      }
    });
}
function handleIfUpdated(
  res: [unknown[], unknown],
  value: string,
  params: Params
): PromiseLike<{ workingId: string; retried: number }> {
  return checkIfUpdated(
    res[1] as number,
    `Can't update because id doesn't exists`
  ).then(() => {
    return { workingId: value, retried: params.retryCount };
  });
}
