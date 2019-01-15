from django.contrib.auth.forms import AuthenticationForm

import graphene
from graphene_django import DjangoObjectType
from serious_django_graphene import FormMutation, ValidationErrors

from .forms import UserForm, SendConfirmationEmailForm
from .models import User
from .schema import UserType
from .utils import obtain_jwt
from server.tasks import reset_password_email


class RegisterMutation(FormMutation):
    class Meta:
        form_class = UserForm

    token = graphene.String()
    user = graphene.Field(lambda: UserType)

    @classmethod
    def perform_mutate(cls, form, info):
        user = form.save()
        token = obtain_jwt(user.id)
        return cls(
            error=ValidationErrors(validation_errors=[]),
            user=user, token=token, success=True
        )


class LoginMutation(FormMutation):
    class Meta:
        form_class = AuthenticationForm

    token = graphene.String()
    user = graphene.Field(lambda: UserType)

    @classmethod
    def perform_mutate(cls, form, info):
        user = form.get_user()
        token = obtain_jwt(user.id)
        return cls(user=user, token=token)


class SendConfirmationEmailMutation(FormMutation):
    class Meta:
        form_class = SendConfirmationEmailForm

    email = graphene.String()

    @classmethod
    def perform_mutate(cls, form, info):
        email = form.cleaned_data['email']
        reset_password_email(email)
        return cls(
            error=ValidationErrors(validation_errors=[]),
            success=True
        )
