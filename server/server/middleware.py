from jwt_auth import exceptions
from jwt_auth.mixins import JSONWebTokenAuthMixin


class AuthorizationMiddleware(JSONWebTokenAuthMixin):
    def resolve(self, next, root, info, **args):
        try:
            info.context.user, info.context.token = self.authenticate(
                info.context)
        except exceptions.AuthenticationFailed:
            pass

        return next(root, info, **args)
