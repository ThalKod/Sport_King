import gql from 'graphql-tag';

export const GET_STANDING = gql`
  query standing($jsWebToken: String!, $orderBy: standingOrderByInput!) {
    standing(
      jsWebToken: $jsWebToken
      orderBy: $orderBy
    ){
      id
      user_id
      user_name
      weekly_count
      monthly_count
      alltime_count
    }
  }
`;
