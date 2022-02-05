import gql from 'graphql-tag';

export const GET_LIVE_TV_CONFIG = gql`
  query getLiveTVConfig($jsWebToken: String!) {
    getLiveTVConfig(
      jsWebToken: $jsWebToken
    )
  }
`;
