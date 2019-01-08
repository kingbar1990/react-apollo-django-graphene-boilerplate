### Setup AWS S3 bucket
https://docs.aws.amazon.com/AmazonS3/latest/user-guide/create-bucket.html

### Setup constants in settings
- AWS_ID= your access key
- AWS_KEY= your secret key
- AWS_REGION_NAME= your region name
- AWS_BACKUP_BUCKET_NAME= your bucket name
- BACKUP_DIR_PATH= path to directory with backups (like '/app/')

### Setup constants in env file
- BACKUP_DIR_PATH= path to directory with backups (like '/app/')
- POSTGRES_HOST 
- POSTGRES_DB 
- POSTGRES_USER
### Requirements
- Install crontab on droplet:  <br />
`sudo apt-get update` <br />
`sudo apt-get install cron`
- Install boto3 in container with django: <br />
`pip install boto3`

### Deploy
- Copy `daily_backup_command.py` to management/commands directory 
- Add `chmod +x` to `make_backup.sh` file
- Change selected variables in  `make_backup.sh` file
- Setup cron task with `crontab -e` command
