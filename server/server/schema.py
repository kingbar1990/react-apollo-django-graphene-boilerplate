import graphene
import graphql_jwt
from accounts.mutations import (
    LoginMutation,
    RegisterMutation,
    SendConfirmationEmailMutation,
    ResetPasswordMutation,
    UserEditMutation,
)
from accounts.schema import Query as AccountsQuery
from core.mutations import TaskCreateMutation, TaskMutationDelete, TaskUpdateMutation
from core.schema import Query as CoreQuery


class Query(AccountsQuery, CoreQuery, graphene.ObjectType):
    pass


class Mutation(graphene.ObjectType):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()
    register = RegisterMutation.Field()
    login = LoginMutation.Field()
    edit_user = UserEditMutation.Field()
    delete_task = TaskMutationDelete.Field()
    create_task = TaskCreateMutation.Field()
    update_task = TaskUpdateMutation.Field()
    confirm_email = SendConfirmationEmailMutation.Field()
    reset_password = ResetPasswordMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
