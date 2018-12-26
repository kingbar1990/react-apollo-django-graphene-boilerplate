import gql from "graphql-tag";


export const verifyToken = gql`
  mutation verifyToken($token: String!) {
    verifyToken(token: $token) {
      payload
    }
  }
`;
