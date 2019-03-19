# Write your factories for tests here

from datetime import datetime
from random import randint

import factory
import factory.fuzzy

from accounts.factories import UserFactory


class TaskFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = 'core.Task'

    name = factory.Sequence(lambda n: 'Task %s' % n)
    description = factory.Sequence(lambda n: 'Description %s' % n)
    status = factory.fuzzy.FuzzyInteger(0, 2)
    due_date = datetime.now().date()
    estimated_time = factory.fuzzy.FuzzyInteger(1, 100)
    assigned_to = factory.SubFactory(UserFactory)
