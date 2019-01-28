from django.contrib.auth.forms import AuthenticationForm
from django.core.files.base import ContentFile
import base64

import graphene
from serious_django_graphene import FormMutation, ValidationErrors
from server.tasks import reset_password_email

from .forms import (
    SendConfirmationEmailForm, UserForm, SetNewPasswordForm, UserEditForm
)
from .schema import UserType
from graphql_jwt.shortcuts import get_token
from .tokens import account_activation_token
from .models import User


class RegisterMutation(FormMutation):
    class Meta:
        form_class = UserForm

    token = graphene.String()
    user = graphene.Field(lambda: UserType)

    @classmethod
    def perform_mutate(cls, form, info):
        user = form.save()
        token = get_token(user)
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
        token = get_token(user)
        return cls(user=user, token=token)


class UserEditMutation(FormMutation):
    class Meta:
        form_class = UserEditForm

    user = graphene.Field(lambda: UserType)

    @classmethod
    def perform_mutate(cls, form, info):
        user = User.objects.get(email=form.cleaned_data['email'])
        if form.cleaned_data['avatar']:
            img_format, img_str = form.cleaned_data.pop(
                'avatar'
            ).split(';base64,')
            ext = img_format.split('/')[-1]
            avatar = ContentFile(
                base64.b64decode(img_str), name=str(user.id) + ext
            )
            user.avatar = avatar
        else:
            form.cleaned_data.pop('avatar')

        for key, value in form.cleaned_data.items():
            setattr(user, key, value)
        user.save()
        return cls(user=user, error=ValidationErrors(validation_errors=[]),)


class SendConfirmationEmailMutation(FormMutation):
    class Meta:
        form_class = SendConfirmationEmailForm

    email = graphene.String()

    @classmethod
    def perform_mutate(cls, form, info):
        email = form.cleaned_data['email']
        reset_password_email(email)
        return cls(
            success=True
        )


class ResetPasswordMutation(FormMutation):
    class Meta:
        form_class = SetNewPasswordForm

    email = graphene.String()

    @classmethod
    def perform_mutate(cls, form, info):
        confirm_token = form.cleaned_data['confirm_token']
        user = User.objects.get(id=form.cleaned_data['user_id'])

        if account_activation_token.check_token(user, confirm_token):
            user.set_password(form.cleaned_data.get('new_password2'))
            return cls(
                error=ValidationErrors(validation_errors=[]),
                success=True
            )
        else:
            return cls(
                error=ValidationErrors(validation_errors=[]),
                success=False
            )
