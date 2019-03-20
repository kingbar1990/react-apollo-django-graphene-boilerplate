from __future__ import absolute_import

import os
import warnings

from django.conf import settings

from celery import Celery

# set the default Django settings module for the 'celery' program.
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "server.settings.dev")

app = Celery("server")
app.conf.broker_url = "redis://redis:6379/0"
app.config_from_object("django.conf:settings")
app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)

warnings.filterwarnings("ignore")


@app.task(bind=True)
def debug_task(self):
    print("Request: {0!r}".format(self.request))
