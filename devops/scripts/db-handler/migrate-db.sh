ENV=$1
set -xv
npm run generate-env $1
sh devops/scripts/sql-handler/modify-sqls.sh

npx ts-node devops/scripts/db-handler/migrate-db.ts .db-sqls .migrate
npx ts-node devops/scripts/db-handler/run-sqls.ts