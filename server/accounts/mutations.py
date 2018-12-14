import graphene

from .models import User
from .schema import UserType
from .utils import obtain_jwt


class RegisterMutation(graphene.Mutation):
    class Arguments:
        email = graphene.String()
        password1 = graphene.String()
        password2 = graphene.String()
        full_name = graphene.String()

    errors = graphene.List(graphene.String)
    token = graphene.String()
    user = graphene.Field(lambda: UserType)

    def mutate(root, info, **args):
        email = args.get('email')
        password1 = args.get('password1')
        password2 = args.get('password2')
        full_name = args.get('full_name')
        errors = []
        user = None
        token = None

        if User.objects.filter(email=email).exists():
            errors.append('This email is already in use')

        if password1 != password2:
            errors.append('Password confirmation is incorrect')

        if not errors:
            user = User.objects.create(
                email=email,
                full_name=full_name,
            )
            user.set_password(password1)
            user.save()
            token = obtain_jwt(user.id)

        return RegisterMutation(errors=errors, user=user, token=token)


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
