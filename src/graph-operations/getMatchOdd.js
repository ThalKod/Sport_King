import gql from 'graphql-tag';

export const GET_MATCH_ODD = gql`
  query matchOdds($jsWebToken: String!, $sport: String!, $matchId: String!) {
    matchOdds(
      jsWebToken: $jsWebToken
      sport: $sport
      matchId: $matchId
    ){
      spread
      moneyLine
      total
      handicap
      europeOdds
      overUnder
      handicapHalf
      overUnderHalf
    }
  }
`;
