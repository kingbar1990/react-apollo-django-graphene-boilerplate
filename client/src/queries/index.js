import gql from "graphql-tag";

export const register = gql `
  mutation register(
    $email: String!
    $password1: String!
    $password2: String!
    $fullName: String!
  ) {
    register(
      email: $email
      password1: $password1
      password2: $password2
      fullName: $fullName
    ) {
      error {
        __typename
        ... on ValidationErrors {
          validationErrors {
            field
            messages
          }
        }
      }
      success
      token
      user {
        id
        email
        fullName
      }
    }
  }
`;

export const login = gql `
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      error {
        __typename
        ... on ValidationErrors {
          validationErrors {
            field
            messages
          }
        }
      }
      token
      user {
        id
        email
        fullName
      }
    }
  }
`;

export const verifyToken = gql `
  mutation verifyToken($token: String!) {
    verifyToken(token: $token) {
      payload
    }
  }
`;

export const getUsers = gql `
  query getUsers {
    users {
      id
      fullName
      email
    }
  }
`;

export const getTasks = gql `
  query getTasks {
    tasks {
      id
      name
      description
      status 
      dueDate
      estimatedTime
      assignedTo {
        fullName
      }
    }
  }
`;

export const createTask = gql `
  mutation createTask(
    $taskId: Int!
    $name: String!
    $description: String
    $status: String!
    $dueDate: Date
    $assignedTo: ID
    $estimateTime: Int!
  ) {
    createTask(taskId: $taskId, name: $name, description: $description, status: $status, dueDate: $dueDate,  estimateTime: $estimateTime, assignedTo: $assignedTo) {
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
        dueDate
        estimatedTime
        assignedTo {
          id
        }
      }
    }
  }
`

export const deleteTask = gql `
  mutation deleteTask($taskId: String) {
    deleteTask(taskId: $taskId) {
      success
    }
  }
`

export const profile = gql `
  query me {
    me {
      fullName
    }
  }
`