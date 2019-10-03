import { gql } from "apollo-boost";

// first line is for apollo
// second for graphql
export const PHONE_SIGN_IN = gql`
  mutation startPhoneVerification($phoneNumber: String!) {
    startPhoneVerification(phoneNumber: $phoneNumber) {
      ok
      error
    }
  }
`;
