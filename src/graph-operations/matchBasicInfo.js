import gql from "graphql-tag";

export const GET_MATCH_BASIC_INFO = gql`
  query matchBasicInfo($jsWebToken: String!, $sport: String!, $matchId: [String!]) {
    matchBasicInfo(
      jsWebToken: $jsWebToken,
      sport: $sport,
      matchId:  $matchId
    ){
      matchId
      matchTime
      awayName
      homeName
      status
      homeLogo
      awayLogo
      moneyLine
      homeScore
      awayScore
    }
  }
`;
