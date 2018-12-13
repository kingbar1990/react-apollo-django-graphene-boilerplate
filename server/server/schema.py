import graphene
from accounts.mutations import LoginMutation, RegisterMutation
from accounts.schema import Query as AccountsQuery


class Query(AccountsQuery, graphene.ObjectType):
    pass


class Mutation(graphene.ObjectType):
    register = RegisterMutation.Field()
    login = LoginMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
