import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {moderateScale} from "react-native-size-matters";

const OnBoardingNextButton = ({onPress, numPages, currentPage})=>{

  const [iconState, setIconState] = useState("arrowright");

  // TODO: Refactor logic later....
  const handlePress = () => {
    if(currentPage + 2 === numPages){
      if(iconState !== "check")
        setIconState("check");
    }

    onPress();
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <AntDesign name={iconState} size={moderateScale(24)} color="#fff" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(50)/2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#106BA3"
  },
});

export default OnBoardingNextButton;
