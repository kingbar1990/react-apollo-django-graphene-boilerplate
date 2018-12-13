from datetime import datetime

from django.conf import settings

import jwt


def obtain_jwt(user_id):
    token = jwt.encode({
        'exp': datetime.utcnow() + settings.JWT_EXPIRATION_DELTA,
        'user_id': user_id},
        settings.SECRET_KEY,
        algorithm=settings.JWT_ALGORITHM
    )

    return token.decode('utf-8')
