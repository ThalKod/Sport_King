import gql from "graphql-tag";

export const GET_SCHEDULED_GAMES_COUNT = gql`
  query scheduledGamesCount($jsWebToken: String!, $sport: String!) {
    scheduledGamesCount(
      jsWebToken: $jsWebToken
      sport: $sport
    )
  }
`;
