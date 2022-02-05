import gql from 'graphql-tag';

export const GET_MY_POSITION = gql`
  query getMyPosition($jsWebToken: String!, $orderBy: standingOrderByInput!) {
    getMyPosition(
      jsWebToken: $jsWebToken
      orderBy: $orderBy
    ){
      position
    }
  }
`;
