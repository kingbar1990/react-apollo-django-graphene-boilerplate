from .base import *  # noqa

DEBUG = True
ALLOWED_HOSTS = ['*']
CORS_ORIGIN_ALLOW_ALL = True

SITE_URL = 'http://localhost:3000'

# email
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
