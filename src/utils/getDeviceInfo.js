import DeviceInfo from "react-native-device-info";

export const getDeviceInfo = async () => {

  const isEmulator =  DeviceInfo.isEmulatorSync();

  const info = {
    model: DeviceInfo.getDeviceId(),
    apiLevel: (await DeviceInfo.getApiLevel()).toString(),
    brand: DeviceInfo.getBrand(),
    buildNumber: DeviceInfo.getBuildNumber(),
    bootloader: await DeviceInfo.getBootloader(),
    carrier: await DeviceInfo.getCarrier(),
    codeName: await DeviceInfo.getCodename(),
    display: await DeviceInfo.getDisplay(),
    name: await DeviceInfo.getDeviceName(),
    token: isEmulator? "Emulator" : await DeviceInfo.getDeviceToken(),
    appFirstInstall: (await DeviceInfo.getFirstInstallTime()).toString(),
    freeStorage: (await DeviceInfo.getFreeDiskStorage()).toString(),
    hardward: await DeviceInfo.getHardware(),
    host: await DeviceInfo.getHost(),
    appLastUpdated: (await DeviceInfo.getLastUpdateTime()).toString(),
    osVersion:  DeviceInfo.getSystemVersion(),
    buildId: await DeviceInfo.getBuildId(),
    capacity: (await DeviceInfo.getTotalDiskCapacity()).toString(),
    islocationEnabled: await DeviceInfo.isLocationEnabled(),
  }
  return info;
}
