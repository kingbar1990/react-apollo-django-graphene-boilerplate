import gql from 'graphql-tag';


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
    estimatedTime
  }
}

`
