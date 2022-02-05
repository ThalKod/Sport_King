import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image
} from "react-native";
import { moderateScale } from "react-native-size-matters";

const TeamName = ({left, teamName, teamLogo}) => {

  const renderCorrectDirection = () => {
    if(left){
      return (
        <View style={styles.container}>
          <Text adjustsFontSizeToFit numberOfLines={2} style={styles.text}>{teamName}</Text>
          {/* <Image style={{ width: moderateScale(50), height: moderateScale(50), resizeMode: "contain", marginLeft: moderateScale(-10)}} source={{ uri: teamLogo }}/> */ }
        </View>
      )
    }

    return (
      <View style={styles.container}>
        {/* <Image style={{ width: moderateScale(50), height: moderateScale(50), resizeMode: "contain", marginRight: moderateScale(-10)}} source={{ uri: teamLogo }}/>  */}
        <Text adjustsFontSizeToFit numberOfLines={2} style={styles.text}>{teamName}</Text>
      </View>
    )
  };

  return renderCorrectDirection();
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center"
  },
  text: {
    color: "#fff",
    fontSize: moderateScale(16),
    fontFamily: "OpenSans-Semibold",
    width: moderateScale(80),
    textAlign: "center",
  }
});

export default TeamName;
