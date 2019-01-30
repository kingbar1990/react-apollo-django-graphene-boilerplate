import graphene
from serious_django_graphene import FormMutation

from .forms import TaskForm
from .models import Task
from .schema import TaskType


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


class TaskCreateMutation(FormMutation):
    class Meta:
        form_class = TaskForm

    task = graphene.Field(lambda: TaskType)

    @classmethod
    def perform_mutate(cls, form, info):
        task = form.save()
        task_id = task.id
        task = Task.objects.get(id=task_id)
        return cls(task=task)


class TaskUpdateMutation(FormMutation):
    class Meta:
        form_class = TaskForm

    task = graphene.Field(lambda: TaskType)

    @classmethod
    def perform_mutate(cls, form, info):
        task = Task.objects.get(id=form.cleaned_data.pop('task_id'))
        for key, value in form.cleaned_data.items():
            setattr(task, key, value)
        task.save()
        return cls(task=task)
