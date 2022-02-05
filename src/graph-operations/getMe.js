import gql from 'graphql-tag';

export const GET_ME = gql`
  query getMe($jsWebToken: String!) {
    getMe(
      jsWebToken: $jsWebToken
    ){
      id
      name
      email
      coins
      bet_won
      bet_lost
      bet_pending
      invite_code
    }
  }
`;
