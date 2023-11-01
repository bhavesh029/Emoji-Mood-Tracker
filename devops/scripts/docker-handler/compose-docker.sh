set -xv
sh devops/scripts/sql-handler/modify-sqls.sh

cd docker
docker-compose -p emoji_tracker_app down
docker-compose -p emoji_tracker_app up -d
sleep 20
docker logs --since=1h mw-postgres
cd ..

sh devops/scripts/sql-handler/sync-schema.sh
