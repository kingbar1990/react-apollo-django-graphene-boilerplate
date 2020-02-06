import graphene
import channels_graphql_ws
import graphql_jwt
from accounts.mutations import (
    LoginMutation,
    RegisterMutation,
    SendConfirmationEmailMutation,
    ResetPasswordMutation,
    UserEditMutation,
)
from accounts.schema import Query as AccountsQuery
from core.mutations import (
    TaskCreateMutation,
    TaskMutationDelete,
    TaskUpdateMutation,
    ProjectCreateMutation,
    ProjectUpdateMutation,
    ProjectMutationDelete
)
from core.schema import Query as CoreQuery
from core.subscriptions import OnNewProject


# class MySubscription(channels_graphql_ws.Subscription):
#     """Simple GraphQL subscription."""

#     # Subscription payload.
#     event = graphene.String()

#     class Arguments:
#         """That is how subscription arguments are defined."""
#         arg1 = graphene.String()
#         arg2 = graphene.String()

#     @staticmethod
#     def subscribe(root, info, arg1, arg2):
#         """Called when user subscribes."""

#         # Return the list of subscription group names.
#         return ['group42']

#     @staticmethod
#     def publish(payload, info, arg1, arg2):
#         """Called to notify the client."""

# Here `payload` contains the `payload` from the `broadcast()`
# invocation (see below). You can return `MySubscription.SKIP`
# if you wish to suppress the notification to a particular
# client. For example, this allows to avoid notifications for
# the actions made by this particular client.

# return MySubscription(event='Something has happened!')


class Subscription(graphene.ObjectType):
    """Root GraphQL subscription."""
    on_new_project = OnNewProject.Field()


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
    create_project = ProjectCreateMutation.Field()
    update_project = ProjectUpdateMutation.Field()
    delete_project = ProjectMutationDelete.Field()


schema = graphene.Schema(query=Query, mutation=Mutation,
                         subscription=Subscription)
