import { gql } from "apollo-boost";

export const FACEBOOK_CONNECT = gql`
  mutation facebookConnect(
    $firstName: String!
    $lastName: String!
    $email: String
    $fbId: String!
  ) {
    ConnectFacebook(
      firstName: $firstName
      lastName: $lastName
      email: $email
      fbId: $fbId
    ) {
      ok
      error
      token
    }
  }
`;
