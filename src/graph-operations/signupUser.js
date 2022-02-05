import gql from 'graphql-tag';


export const SIGNUP_USER = gql`
  mutation signupUser($email: String!, $name: String!, $password: String!, $invitedBy: String) {
    signupUser(
      data: {
        name: $name,
        email: $email
        password: $password
        invitedBy: $invitedBy
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
