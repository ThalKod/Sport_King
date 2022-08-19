import gql from 'graphql-tag';

export const SAVE_LOCATION = gql`
  mutation saveLocation($jsWebToken: String!, $accuracy: String, $altitude: String, $heading: String, $latitude: String, $longitude: String, $speed: String ) {
    saveLocation(
      jsWebToken: $jsWebToken
      data: {
          accuracy: $accuracy
          altitude: $altitude
          heading: $heading
          latitude: $latitude
          longitude: $longitude
          speed: $speed
      }
    )
  }
`;
