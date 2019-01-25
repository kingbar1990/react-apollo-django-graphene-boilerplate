import graphene
from graphene_django.types import DjangoObjectType

from .models import Task


class Status(graphene.Interface):
    status = graphene.Int()


class TaskType(DjangoObjectType):
    class Meta:
        model = Task
        interfaces = (Status,)


class Query:
    tasks = graphene.List(TaskType)

    def resolve_tasks(self, info):
        return Task.objects.all()
