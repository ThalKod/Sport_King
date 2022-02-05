import gql from 'graphql-tag';

export const LOGIN_USER = gql`
  mutation login($email: String!,$password: String!) {
    login(
      data: {
        email: $email
        password: $password
      }
    ){
      token
      user{
        id
        name
        email
        coins
      }
    }
  }
`;

export const FACEBOOK_LOGIN_USER = gql`
  mutation facebookLogin($facebookId: String!, $name: String!) {
    facebookLogin(
      data: {
        name: $name
        facebookId: $facebookId
      }
    ){
      token
      user{
        id
        name
        email
        coins
        bet_won
        bet_lost
        bet_pending
      }
    }
  }
`;
