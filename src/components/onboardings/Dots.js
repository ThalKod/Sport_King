import React from 'react';
import { I18nManager, Platform, View } from 'react-native';

const Dots = ({ isLight, numPages, currentPage, Dot }) => (
  <View style={styles.container}>
    {[...Array(numPages)].map((_, index) => (
      <Dot key={index} selected={index === currentPage} isLight={isLight} />
    ))}
  </View>
);


const styles = {
  container: {
    flex: 0,
    flexDirection: I18nManager.isRTL && Platform.OS === 'ios' ? 'row-reverse' : 'row',
    alignItems: 'center',
    alignSelf: "center",
  },
};

export default Dots;
