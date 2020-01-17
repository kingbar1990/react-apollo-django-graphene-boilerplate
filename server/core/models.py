from django.db import models
from django.contrib.auth import get_user_model
from djmoney.models.fields import MoneyField


class Project(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    budget = models.IntegerField()
    deadline = models.DateField(null=True, blank=True)
    developer = models.ForeignKey(get_user_model(), on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.name


class Task(models.Model):
    STATUS_CHOICES = (
        (0, 'ToDo'),
        (1, 'InProgress'),
        (2, 'Done'),
    )
    name = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    status = models.SmallIntegerField(choices=STATUS_CHOICES)
    due_date = models.DateField(null=True, blank=True)
    estimated_time = models.SmallIntegerField(null=True, blank=True)
    assigned_to = models.ForeignKey(
        get_user_model(),
        related_name="tasks",
        null=True, blank=True,
        on_delete=models.SET_NULL
    )
    project = models.ForeignKey(
        Project,
        related_name="tasks",
        null=True, blank=True,
        on_delete=models.SET_NULL
    )
    
    def __str__(self):
        return self.name
