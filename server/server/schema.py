import graphene
import graphql_jwt

from accounts.mutations import LoginMutation, RegisterMutation
from accounts.schema import Query as AccountsQuery
from accounts.mutations import Mutation as AuthMutation


class Query(AccountsQuery, graphene.ObjectType):
    pass


class Mutation(AuthMutation, graphene.ObjectType):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()
    register = RegisterMutation.Field()
    login = LoginMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
