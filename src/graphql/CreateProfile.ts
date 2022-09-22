import { gql } from '@apollo/client';

export const createProfile = gql`
  mutation CreateProfile {
    createProfile(
      request: {
        handle: "devjoshstevens"
        profilePictureUri: null
        followNFTURI: null
        followModule: null
      }
    ) {
      ... on RelayerResult {
        txHash
      }
      ... on RelayError {
        reason
      }
      __typename
    }
  }
`;
