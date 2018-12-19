import graphene
from graphene_django import DjangoObjectType

from serious_django_graphene import ValidationErrors, FormMutation

from .models import User
from .schema import UserType
from .utils import obtain_jwt
from .forms import UserForm


class RegisterMutation(FormMutation):
    class Meta:
        form_class = UserForm

    token = graphene.String()
    user = graphene.Field(lambda: UserType)

    @classmethod
    def perform_mutate(cls, form, info):
        user = form.save()
        token = obtain_jwt(user.id)
        return cls(
            error=ValidationErrors(validation_errors=[]),
            user=user, token=token, success=True
        )


class LoginMutation(graphene.Mutation):
    class Arguments:
        email = graphene.String()
        password = graphene.String()

    token = graphene.String()
    errors = graphene.List(graphene.String)
    user = graphene.Field(lambda: UserType)

    @staticmethod
    def mutate(root, info, **args):
        email = args.get('email')
        password = args.get('password')
        errors = []
        token = None
        user = None

        if not email:
            errors.append('Email must be specified')

        if not password:
            errors.append('Password must be specified')

        if not errors:
            try:
                user = User.objects.get(email=email)
                if not user.check_password(password):
                    errors.append('Invalid email or password')
                    user = None
                else:
                    token = obtain_jwt(user.id)
            except User.DoesNotExist:
                errors.append('User with provided email doesn\t exist')

        return LoginMutation(errors=errors, user=user, token=token)
