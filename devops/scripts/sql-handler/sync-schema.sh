model_path=libs/data-access/src/dao/models
rm -rf $model_path

npx sequelize-auto -o "$model_path" -h localhost -d "postgres" -s "emoji_tracker_app" -u "bhavesh" -p "6432" -x "bhavesh" -e "postgres" -l ts --cm p --cp c --cf k -t users moods

npx ts-node devops/scripts/sql-handler/remove-schema-from-files.ts