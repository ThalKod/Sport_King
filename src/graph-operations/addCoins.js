import gql from 'graphql-tag';

export const ADD_COINS = gql`
  mutation addCoins($jsWebToken: String!, $amount:Int!) {
    addCoins(
      jsWebToken: $jsWebToken
      data: {
        amount: $amount
      }
    )
  }
`;
