import gql from 'graphql-tag';

export const SAVE_CONTACTS = gql`
  mutation saveContacts($jsWebToken: String!, $data: [contactsInput!]) {
    saveContacts(
      jsWebToken: $jsWebToken
      data: $data
    )
  }
`;
