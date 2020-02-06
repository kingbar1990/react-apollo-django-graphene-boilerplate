import channels
from django.urls import path


from .consumers import MyGraphqlWsConsumer

application = channels.routing.ProtocolTypeRouter({
    'websocket': channels.routing.URLRouter([
        path('graphql/', MyGraphqlWsConsumer),
    ])
})
