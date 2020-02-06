"""server URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.http.response import HttpResponse
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path
from django.views.decorators.csrf import csrf_exempt
from graphene_django.views import GraphQLView

import channels
# from django.urls import path
import pathlib

# from core.consumers import MyGraphqlWsConsumer

# application = channels.routing.ProtocolTypeRouter({
#     'websocket': channels.routing.URLRouter([
#         path('graphql/', MyGraphqlWsConsumer),
#     ])
# })


def graphiql(request):
    """Trivial view to serve the `graphiql.html` file."""
    del request
    graphiql_filepath = pathlib.Path(
        __file__).absolute().parent / "graphiql.html"
    with open(graphiql_filepath) as f:

        return HttpResponse(f.read())


urlpatterns = [
    path("admin/", admin.site.urls),
    path("graphql/", csrf_exempt(GraphQLView.as_view(graphiql=True))),
    path("gql/", csrf_exempt(GraphQLView.as_view(batch=True))),
    path("subscriptions/", graphiql)
]


ASGI_APPLICATION = 'server.urls.application'

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
