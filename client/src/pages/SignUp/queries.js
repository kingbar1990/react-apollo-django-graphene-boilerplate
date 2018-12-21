import gql from "graphql-tag";


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
