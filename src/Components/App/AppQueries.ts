import { gql } from "apollo-boost";

export const IS_LOGGED_IN = gql`
  {
    auth {
      isLoggedIn @client
    }
  }
`;

// @client
// not send to API, send to cache
// inform Local state of Whether or not Login
