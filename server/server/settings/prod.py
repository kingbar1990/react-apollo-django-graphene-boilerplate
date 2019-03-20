from .base import *  # noqa

DEBUG = True
ALLOWED_HOSTS = ["*"]
CORS_ORIGIN_ALLOW_ALL = True

SITE_URL = "https://test.com"

# email
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_USE_TLS = True
EMAIL_HOST = "smtp.gmail.com"
EMAIL_HOST_USER = "test@gmail.com"
EMAIL_HOST_PASSWORD = "test"
EMAIL_PORT = 587
