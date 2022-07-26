import gql from "graphql-tag";

export const GET_TEAM = gql`
  query getTeam($jsWebToken: String!, $sport: String!, $teamId: String!) {
    getTeam(
      jsWebToken: $jsWebToken,
      sport: $sport,
      teamId: $teamId
    ){
      teamId
      leagueId
      name
      logo
      foundingDate
      address
      area
      venue
      capacity
      coach
      website
    }
  }
`;
