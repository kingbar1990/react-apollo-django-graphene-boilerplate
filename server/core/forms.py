from django import forms
from django.forms import ModelForm
from djmoney.forms.widgets import MoneyWidget
from .models import Task, Project


class TaskForm(ModelForm):
    task_id = forms.IntegerField()
    estimated_time = forms.IntegerField()

    class Meta:
        model = Task
        fields = [
          'task_id', 'name', 'description', 'status', 'due_date',
          'assigned_to', 'estimated_time', 'project'
        ]


class ProjectForm(ModelForm):
  project_id = forms.IntegerField(required=False)
  tasks = forms.CharField(required=False)

  class Meta:
    model = Project
    fields = [
      'name', 'description', 'budget', 'deadline', 'developer', 'project_id', 'tasks'
    ]

  def save(self, commit=True):
    instance = super(ProjectForm, self).save(commit=True)
    for i in self.cleaned_data['tasks'].split(','):
      try:
        task = Task.objects.get(pk=int(i))
      except Task.DoesNotExist:
        continue
      task.project = instance
      task.save()
    return instance
