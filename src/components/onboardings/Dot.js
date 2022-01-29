import React from 'react';
import { View } from 'react-native';

import { moderateScale } from 'react-native-size-matters';


const Dot = ({ isLight, selected }) => {
  let backgroundColor;
  if (isLight) {
    backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';
  } else {
    backgroundColor = selected ? '#fff' : 'rgba(255, 255, 255, 0.5)';
  }
  return (
    <View
      style={{
        ...styles.dot,
        backgroundColor,
      }}
    />
  );
};

const styles = {
  dot: {
    width: moderateScale(8),
    height: moderateScale(8),
    borderRadius: moderateScale(8) / 2,
    marginHorizontal: moderateScale(4),
  },
};

export default Dot;
