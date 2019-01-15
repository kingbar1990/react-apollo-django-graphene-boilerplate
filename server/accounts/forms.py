from django import forms
from django.contrib.auth.forms import UserCreationForm, PasswordResetForm
from django.core.exceptions import ObjectDoesNotExist

from accounts.models import User


class UserForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['email', 'full_name']


class SendConfirmationEmailForm(UserCreationForm):

    def __init__(self, *args, **kwargs):
        super(SendConfirmationEmailForm, self).__init__(*args, **kwargs)
        # Making location required
        self.fields['password1'].required = False
        self.fields['password2'].required = False

    class Meta:
        model = User
        fields = ('email',)

    def clean_email(self):
        email = self.cleaned_data['email']

        try:
            User.objects.get(email=email)
        except ObjectDoesNotExist as e:
            raise forms.ValidationError(e)
        return email
