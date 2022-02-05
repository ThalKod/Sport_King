import gql from 'graphql-tag';

export const LEAGUES = gql`
  query scheduledGamesCount($jsWebToken: String!, $sport: String!) {
    leagues(
      jsWebToken: $jsWebToken
      sport: $sport
    ){
      leagueId,
      logo,
      country,
      scheduledGames,
      leagueName,
      name,
      matchIds
    }
  }
`;
