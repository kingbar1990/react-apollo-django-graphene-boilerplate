import datetime

import boto3
from django.conf import settings
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = 'Make daily backup and upload to S3 bucket'

    def handle(self, *args, **options):

        now = datetime.datetime.now() - datetime.timedelta(days=1)
        gb_size_in_byte = 1024 ** 3

        file_name = '{}.sql'.format(
            now.strftime("%d-%m-%Y")
        )

        s3 = boto3.resource(
            's3',
            aws_access_key_id=settings.AWS_ID,
            aws_secret_access_key=settings.AWS_KEY,
            region_name=settings.AWS_REGION_NAME
        )

        config = boto3.s3.transfer.TransferConfig(
            multipart_threshold=5 * gb_size_in_byte,
            multipart_chunksize=gb_size_in_byte
        )

        try:
            s3.meta.client.upload_file(
                settings.BACKUP_DIR_PATH + file_name,
                settings.AWS_BACKUP_BUCKET_NAME,
                file_name,
                Config=config
            )
            res = file_name + ' success uploaded to bucket'
        except Exception:
            res = 'Something wrong with ' + file_name + ' uploading'

        file_log = open('backup_log.log', 'a')
        file_log.write(str(res) + '\n')
        file_log.close()
