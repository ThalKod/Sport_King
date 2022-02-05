import gql from 'graphql-tag';

export const MAKE_BET = gql`
  mutation makeBet($jsWebToken: String!, $gameId: String!, $betType: Int!, $bid: Int!, $odd: Float!, $gameType: Int!, $pick: Int! $pickName: String! $teams: String!, $spread: Float, $total: Float) {
    makeBet(
      jsWebToken: $jsWebToken
      data: {
        gameId: $gameId
        betType: $betType
        bid: $bid
        odd: $odd
        gameType: $gameType
        pick: $pick
        pickName: $pickName
        teams: $teams
        spread: $spread
        total: $total
      }
    ){
      id
      bid
      gameId
      betType
      pick
      odd
      gameType
    }
  }
`;
