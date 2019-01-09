from django.contrib.auth.forms import AuthenticationForm

import graphene
from graphene_django import DjangoObjectType
from serious_django_graphene import ValidationErrors, FormMutation

from .models import User
from .schema import UserType
from .utils import obtain_jwt
from .forms import UserForm

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
