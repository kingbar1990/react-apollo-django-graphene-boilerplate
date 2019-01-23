import graphene
from graphene_django.types import DjangoObjectType

from .models import User


class UserType(DjangoObjectType):
    class Meta:
        model = User


class Query:
    users = graphene.List(UserType)
    me = graphene.Field(UserType)

    def resolve_users(self, info):
        return User.objects.all()

    def resolve_me(self, info):
        user = info.context.user
        if user.is_anonymous:
            raise Exception('Not logged in!')

        return user
