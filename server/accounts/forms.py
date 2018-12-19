from django.forms import ModelForm
from django.contrib.auth.forms import UserCreationForm

from accounts.models import User


class UserForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['email', 'full_name']
