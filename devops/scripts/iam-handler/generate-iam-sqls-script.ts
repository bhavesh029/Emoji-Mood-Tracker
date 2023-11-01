import {
  operationData,
  emoji-trackerAuthzQueries,
  policiesData,
  rolePolicyMapsData,
  rolesData,
} from "@emojiTracker-js/data-access";
import { env } from "@emojiTracker/blackhole-common";
import * as fs from "fs";

export function generateIamSqlsScript(): string {
  const queriesSet1 = [operationData, policiesData].map((query) =>
    query.insertQuery()
  );
  const queriesSet2 = emoji-trackerAuthzQueries;

  const queriesSet3 = [rolesData, rolePolicyMapsData].map((query) =>
    query.insertQuery()
  );

  const iamSqlQueries = [queriesSet1, queriesSet2, queriesSet3]
    .flat()
    .join("\n");
  return `\\c $db;
  set schema '$schema'; \n
  ${iamSqlQueries}`;
}

function addtoFile() {
  fs.writeFile(
    `libs/data-access/sql/v1.0.0/${env("VERSION")}-${env(
      "IAM_SQL_SEQ"
    )}-iam-dml.sql`,
    generateIamSqlsScript(),
    () => {
      console.log("data added");
    }
  );
}

addtoFile();
