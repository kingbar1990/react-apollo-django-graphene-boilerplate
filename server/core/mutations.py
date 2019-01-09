import graphene
from graphene_django import DjangoObjectType

from .models import Task

class TaskMutationDelete(graphene.Mutation):
    class Arguments:
        task_id = graphene.String()
    
    success = graphene.Boolean()
    errors = graphene.List(graphene.String)
    
    @staticmethod
    def mutate(root, info, **args):
        task_id = args.get('task_id')
        errors = []
        success = False

        if not task_id:
            errors.task_id('Task must be specified')

        if not errors:
            try:
                Task.objects.get(id=task_id).delete()
                success = True
            except Task.DoesNotExist:
                errors.append('Task with provided ID does not exist')

        return TaskMutationDelete(errors=errors, success=success)

