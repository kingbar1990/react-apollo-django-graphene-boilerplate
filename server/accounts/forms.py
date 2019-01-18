from django import forms
from django.contrib.auth.forms import (
    PasswordResetForm, UserCreationForm, SetPasswordForm
)
from django.core.exceptions import ObjectDoesNotExist

from accounts.models import User


class UserForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['email', 'full_name']


class SendConfirmationEmailForm(PasswordResetForm):
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


class SetNewPasswordForm(SetPasswordForm):
    user_id = forms.IntegerField()
    confirm_token = forms.CharField()

    def __init__(self, *args, **kwargs):
        super(SetPasswordForm, self).__init__(*args, **kwargs)

    class Meta:
        model = User
        fields = ('new_password1', 'new_password2', 'user_id', 'token')

    def clean_new_password2(self):
        password1 = self.cleaned_data.get('new_password1')
        password2 = self.cleaned_data.get('new_password2')
        if password1 and password2:
            if password1 != password2:
                raise forms.ValidationError(
                    self.error_messages['password_mismatch'],
                    code='password_mismatch',
                )
        return password2
