import React from "react";
import {
  View,
    Text,
  StyleSheet, Image,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import profilePhotos2  from "../assets/example_profile.jpg";
import Betcoin from "../assets/betcoin.png";

const LeaderBoardSingle = ({position, name, coins}) => {
  return (
    <View style={styles.container}>
      <View style={styles.teamContainer}>
        <Text style={styles.text}>{position}</Text>
        <Image
            style={{
              width: moderateScale(40),
              height: moderateScale(40),
              borderRadius: moderateScale(25),
              overflow: "hidden",
              borderWidth: moderateScale(1.5),
              borderColor: "grey",
              marginRight: moderateScale(20)
            }}
            source={profilePhotos2}  />
        <Text style={styles.text}>{name}</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center"}}>
        <Text style={styles.text}>{coins}</Text>
        <Image style={{ resizeMode: "contain", width: moderateScale(18)}} source={Betcoin}/>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#140A35",
    width: "100%",
    flexDirection: "row",
    height: moderateScale(50),
    alignItems: "center",
    justifyContent: "space-between",
    padding: moderateScale(15)
  },
  text: {
    fontFamily: "OpenSans",
    color: "#fff",
    fontSize: moderateScale(14),
    marginRight: moderateScale(15)
  },
  teamContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: moderateScale(150),
  }
});

export default LeaderBoardSingle;
