import graphene
import graphql_jwt

from accounts.mutations import LoginMutation, RegisterMutation
from accounts.schema import Query as AccountsQuery
from core.schema import Query as CoreQuery
from core.mutations import TaskMutationDelete, TaskCreateMutation


class Query(AccountsQuery, CoreQuery, graphene.ObjectType):
    pass


class Mutation(graphene.ObjectType):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()
    register = RegisterMutation.Field()
    login = LoginMutation.Field()
    delete_task = TaskMutationDelete.Field()
    create_task = TaskCreateMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
