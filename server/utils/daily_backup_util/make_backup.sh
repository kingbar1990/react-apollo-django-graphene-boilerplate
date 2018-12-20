#!/bin/bash

cd $project_root_dir # Change $project_root_dir to your project root

# old mode 100644 | new mode 100755
# apply env varibales from .env file
export $(cat .env | xargs)

docker exec $docker_database_id pg_dump --inserts -h $POSTGRES_HOST $POSTGRES_DB -U $POSTGRES_USER > $BACKUP_DIR_PATH`date+\%d-\%m-\%Y`.sql # Change $docker_database_id to your database container id
/home/ubuntu/.local/bin/docker-compose run $django_container_name python manage.py daily_backup_command  # Change $django_container_name to your django container id
rm $BACKUP_DIR_PATH`date +\%d-\%m-\%Y`.sql
