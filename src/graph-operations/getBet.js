import gql from 'graphql-tag';

export const GET_BET = gql`
  query getBet($jsWebToken: String!, $pending: Boolean!) {
    getBet(
      jsWebToken: $jsWebToken
      pending: $pending
    ){
      id
      bid
      gameId
      betType
      pick
      odd
      gameType
      status
      outcome
      pickName
      teams
      spread
      total
    }
  }
`;
