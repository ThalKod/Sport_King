import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Dots from "./Dots";
import Dot from "./Dot";
import {moderateScale} from "react-native-size-matters";
import OnBoardingNextButton from "./OnBoardingNextButton";

const OnBoardingFooter = ({currentPage, numPages, onPress})=>{

  return (
    <View style={styles.container}>
      <Dots numPages={numPages} currentPage={currentPage} Dot={Dot}/>
      <OnBoardingNextButton numPages={numPages} currentPage={currentPage} onPress={onPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    position: "absolute",
    justifyContent: 'space-between',
    bottom: moderateScale(15)
  },
});

export default OnBoardingFooter;
