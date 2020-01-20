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
    all_projects = graphene.List(ProjectType)
    all_tasks = graphene.List(TaskType)

    def resolve_all_tasks(self, info):
        return Task.objects.all()

    def resolve_projects(self, info, page):
        page_size = 10
        qs = Project.objects.all()
        return get_paginator(qs, page_size, page, ProjectPaginatedType)

    def resolve_all_projects(self, info):
        return Project.objects.all()

    def resolve_tasks(self, info, page):
        page_size = 10
        qs = Task.objects.all()
        return get_paginator(qs, page_size, page, TaskPaginatedType)
