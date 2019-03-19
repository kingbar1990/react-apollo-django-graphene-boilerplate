# Write your factories for tests here

from datetime import datetime

import factory


class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = 'accounts.User'

    email = factory.Sequence(lambda n: 'email%s@email.com' % n)
    full_name = factory.Sequence(lambda n: 'Full name %s' % n)
    date_joined = datetime.now()
    is_active = True
    is_staff = False
