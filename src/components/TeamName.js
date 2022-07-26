import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Platform
} from "react-native";
import { moderateScale } from "react-native-size-matters";

const TeamName = ({left, teamName, teamLogo}) => {

  console.log("team logo", teamLogo)

  const correctUrl = Platform.OS == 'ios' ? teamLogo.split("?")[0].replace("http", "https") : teamLogo;

  const renderCorrectDirection = () => {
    if(left){
      return (
        <View style={styles.container}>
          <Text adjustsFontSizeToFit numberOfLines={2} style={styles.text}>{teamName}</Text>
          {teamLogo? <Image style={styles.image} source={{ uri: correctUrl }}/> : null }
        </View>
      )
    }

    return (
      <View style={styles.container}>
        { teamLogo? <Image style={styles.image} source={{ uri: correctUrl }}/> : null }
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
    fontWeight: "bold",
    fontSize: moderateScale(14),
    fontFamily: "OpenSans-Semibold",
    width: moderateScale(80),
    textAlign: "center",
  },
  image: {
    width: moderateScale(50),
    height: moderateScale(50),
    marginRight: moderateScale(0),
    borderRadius: moderateScale(50),
    resizeMode: "contain",
  }
});

export default TeamName;
