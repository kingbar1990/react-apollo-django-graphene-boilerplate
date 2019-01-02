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
    # task = graphene.Field(TaskType)

    def resolve_tasks(self, info):
        return Task.objects.all()

    # def resolve_task(self, info):
    #     return Task.objects.get(id=info.context.id)
