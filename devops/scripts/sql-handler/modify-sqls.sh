SQL_DIR=.db-sqls
rm -rf $SQL_DIR

mkdir -p $SQL_DIR 

find $SQL_DIR -name "*.sql" > $SQL_DIR/sqls.txt

npx ts-node devops/scripts/sql-handler/flatten-file.ts
npx ts-node devops/scripts/sql-handler/create-schema-sql.ts $SQL_DIR