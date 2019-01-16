from django import forms
from django.forms import ModelForm

from .models import Task


class TaskForm(ModelForm):
    task_id = forms.IntegerField()
    estimated_time = forms.IntegerField()

    class Meta:
        model = Task
        fields = [
          'task_id', 'name', 'description', 'status', 'due_date',
          'assigned_to', 'estimated_time'
        ]
