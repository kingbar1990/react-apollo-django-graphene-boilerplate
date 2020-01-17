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
  
  class Meta:
    model = Project
    fields = [
      'name', 'description', 'budget', 'deadline', 'developer'
    ]
