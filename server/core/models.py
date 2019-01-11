from django.db import models
from django.contrib.auth import get_user_model


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
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.name
