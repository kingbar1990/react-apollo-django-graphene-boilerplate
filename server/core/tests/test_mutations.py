# Write your tests for graphql mutations here
from datetime import datetime

import pytest
from graphene.test import Client

from server.schema import schema
from accounts.factories import UserFactory


@pytest.mark.django_db
def test_create_tast_mutation1(snapshot):
    """ Test success create task mutation with full data"""

    assigned_to = UserFactory()
    client = Client(schema)

    executed = client.execute("""
mutation createTask($taskId: Int!, $name: String!, $description: String, $status: String!, $dueDate: Date, $assignedTo: ID, $estimatedTime: Int!) {
  createTask(taskId: $taskId, name: $name, description: $description, status: $status, dueDate: $dueDate, estimatedTime: $estimatedTime, assignedTo: $assignedTo) {
    error {
      __typename
      ... on ValidationErrors {
        validationErrors {
          field
          messages
        }
      }
    }
    task {
      id
      name
      description
      status
      estimatedTime
      assignedTo {
        id
      }
    }
  }
}

    """, variable_values={
        "taskId": 0,
        "name": "New task",
        "description": "DESC",
        "status": "1",
        "assignedTo": assigned_to.id,
        "estimatedTime": 2
    })

    snapshot.assert_match(executed)
