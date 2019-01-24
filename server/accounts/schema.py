import graphene
from graphene_django.types import DjangoObjectType
from graphql_jwt.decorators import login_required

from .models import User


class UserType(DjangoObjectType):
    class Meta:
        model = User


class Query:
    users = graphene.List(UserType)
    me = graphene.Field(UserType)

    def resolve_users(self, info):
        return User.objects.all()

    @login_required
    def resolve_me(self, info):
        return info.context.user
