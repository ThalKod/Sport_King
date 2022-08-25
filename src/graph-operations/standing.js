import gql from 'graphql-tag';

export const GET_STANDING = gql`
  query standing($jsWebToken: String!, $orderBy: standingOrderByInput!, $take: Int) {
    standing(
      jsWebToken: $jsWebToken
      orderBy: $orderBy
      take: $take
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
