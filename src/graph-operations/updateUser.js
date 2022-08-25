import gql from 'graphql-tag';

export const UPDATE_USER = gql`
  mutation updateUser($jsWebToken: String!, $data: UserUpdateInput!) {
    updateUser(
      jsWebToken: $jsWebToken
      data: $data
    )
  }
`;

