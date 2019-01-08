import gql from 'graphql-tag';

export const register = gql`
mutation register($email: String!, $password1: String!, $password2: String!, $fullName: String!) {
  register(email: $email, password1: $password1, password2: $password2, fullName: $fullName) {
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

export const login = gql`
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

export const getUsers = gql`
  query getUsers {
      users {
          id
          fullName
          email
      }
 }
`

export const getTasks = gql`
  query getTasks {
      tasks {
           name
           description
           status
           dueDate
           estimatedTime
      }
 }
`
