import channels_graphql_ws
import graphene


class OnNewProject(channels_graphql_ws.Subscription):
    """Subscription triggers on a new project."""

    data = graphene.String()

    class Arguments:
        """Subscription arguments."""

        # name = graphene.String()
        # description = graphene.String()

    def subscribe(self, info, project=None):
        """Client subscription handler."""
        del info
        # Specify the subscription group client subscribes to.
        return [project] if project is not None else None

    def publish(self, info, project=None):
        """Called to prepare the subscription notification message."""
        print('publish'*50, flush=True)
        # The `self` contains payload delivered from the `broadcast()`.
        # new_proj_name = self["name"]
        # new_proj_description = self["description"]
        # new_proj_budget = self["budget"]

        # Method is called only for events on which client explicitly
        # subscribed, by returning proper subscription groups from the
        # `subscribe` method. So he either subscribed for all events or
        # to particular chatroom.
        print(self["data"], flush=True)
        project = {'name': 'new_proj_name'}
        assert project['name'] is None or project['name'] == 'new_proj_name'

        # Avoid self-notifications.
        # if (
        #     info.context.user.is_authenticated
        #     and new_proj_description == info.context.user.username
        # ):
        #     return OnNewChatMessage.SKIP

        return OnNewProject(data=self["data"])

    @classmethod
    def new_chat_message(cls, chatroom=None, text=None, sender=None, data=None):
        """Auxiliary function to send subscription notifications.
        It is generally a good idea to encapsulate broadcast invocation
        inside auxiliary class methods inside the subscription class.
        That allows to consider a structure of the `payload` as an
        implementation details.
        """
        print('new_chat_message'*50, flush=True)
        cls.broadcast(
            # group=chatroom,
            payload={
                "chatroom": 'chatroom, "text": text, "sender": sender', "data": data},
        )
