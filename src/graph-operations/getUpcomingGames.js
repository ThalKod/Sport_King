import gql from "graphql-tag";

export const GET_UPCOMING_GAMES = gql`
  query upcomingGames($jsWebToken: String!, $data: UpCommingGameInput! ) {
    upcomingGames(
      jsWebToken: $jsWebToken
      data: $data
    ){
      matchId
      matchTime
      awayName
      homeName
      status
      homeLogo
      awayLogo
      moneyLine
      leagueName
      homeScore
      awayScore
    }
  }
`;
