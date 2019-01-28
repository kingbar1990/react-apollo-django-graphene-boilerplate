from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist
from django.core.mail import EmailMessage

from accounts.models import User
from accounts.tokens import account_activation_token
from celery import shared_task


@shared_task
def hello():
    print("Hello there!")


@shared_task(name='reset_password_email')
def reset_password_email(email):
    try:
        user = User.objects.get(email=email)
    except ObjectDoesNotExist as e:
        return str(e)
    token = account_activation_token.make_token(user)

    body = """
        Click here to reset your password:
        {site_url}/reset-password/{user_id}/{token}
    """.format(
        site_url=settings.SITE_URL, user_id=user.id, token=token
    )

    email = EmailMessage('title', body, to=[email])
    email.send()
