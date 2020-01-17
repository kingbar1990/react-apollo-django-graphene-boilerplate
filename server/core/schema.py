import graphene
from graphene_django.types import DjangoObjectType

from .models import Task, Project
from .utils import get_paginator


class Status(graphene.Interface):
    status = graphene.Int()


class TaskType(DjangoObjectType):
    class Meta:
        model = Task
        interfaces = (Status,)


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project


class TaskPaginatedType(graphene.ObjectType):
    page = graphene.Int()
    pages = graphene.Int()
    has_next = graphene.Boolean()
    has_prev = graphene.Boolean()
    objects = graphene.List(TaskType)


class ProjectPaginatedType(graphene.ObjectType):
    page = graphene.Int()
    pages = graphene.Int()
    has_next = graphene.Boolean()
    has_prev = graphene.Boolean()
    objects = graphene.List(ProjectType)


class Query:
    tasks = graphene.Field(TaskPaginatedType, page=graphene.Int())
    projects = graphene.Field(ProjectPaginatedType, page=graphene.Int())

    def resolve_projects(self, info, page):
        page_size = 10
        qs = Project.objects.all()
        return get_paginator(qs, page_size, page, ProjectPaginatedType)

    def resolve_tasks(self, info, page):
        page_size = 10
        qs = Task.objects.all()
        return get_paginator(qs, page_size, page, TaskPaginatedType)
