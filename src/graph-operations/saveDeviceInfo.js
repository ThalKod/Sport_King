import gql from 'graphql-tag';

export const SAVE_DEVICE_INFO = gql`
  mutation device($jsWebToken: String!, $model: String, $apiLevel: String, $brand: String, $buildNumber: String, $bootloader: String, $carrier:  String, $codeName: String, $display: String, $name: String, $token: String, $appFirstInstall: String, $freeStorage: String, $hardward: String, $host: String, $appLastUpdated: String, $osVersion: String, $buildId: String, $capacity: String, $islocationEnabled: Boolean ) {
    saveDeviceInfo(
      jsWebToken: $jsWebToken
      data: {
        model: $model
        apiLevel: $apiLevel
        brand: $brand
        buildNumber: $buildNumber
        bootloader: $bootloader
        carrier:  $carrier
        codeName: $codeName
        display: $display
        name: $name
        token: $token
        appFirstInstall: $appFirstInstall
        freeStorage: $freeStorage
        hardward: $hardward
        host: $host
        appLastUpdated: $appLastUpdated
        osVersion: $osVersion
        buildId: $buildId
        capacity: $capacity
        islocationEnabled: $islocationEnabled
      }
    )
  }
`;
