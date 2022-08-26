import React from "react";
import {View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity} from 'react-native';
import { moderateScale } from "react-native-size-matters";

import CupMain from "../assets/cup_main.png";
import ChampionsBackground from '../assets/champions_background.jpg';
import LinearGradient from "react-native-linear-gradient";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';

const HomeInfoBox = () => {
  const user = useSelector(state => state.user);

  return (
    <View style={styles.container}>
      <ImageBackground source={ChampionsBackground} style={styles.imageBackground}>
        <LinearGradient
          colors={['#19194B', '#001E22']}
          style={styles.linearGradient}
        />
        <Image style={{ width: moderateScale(80), height: moderateScale(80)}} source={CupMain}/>
        {/* <ButtonBox/> */}
        <Text adjustsFontSizeToFit={true} numberOfLines={1} style={styles.text}>{user.name}</Text>
      </ImageBackground>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  text: {
    fontSize: moderateScale(24),
    color: "#fff",
    fontWeight: "bold",
    marginTop: moderateScale(10)
  },
  imageBackground: {
    resizeMode: "cover",
    justifyContent: "center",
    width: "100%",
    height: moderateScale(175),
    alignItems: "center",
  },
  linearGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: moderateScale(220),
    opacity: 0.75
  },

  containerButton: {
    position: 'absolute',
    left: moderateScale(0),
    top: moderateScale(5),
    backgroundColor: "#140A35",
    borderRadius: moderateScale(5),
    height: moderateScale(30),
    width: moderateScale(150),
    marginHorizontal: moderateScale(10),
    flexDirection: "row"
  },
  cartContainer: {
    width: "30%",
    height: "100%",
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: moderateScale(5),
    borderTopLeftRadius: moderateScale(5)
  },
  imageStyle: {
    width: moderateScale(20),
    height: moderateScale(20),
    resizeMode: "contain",
    marginRight: moderateScale(5)
  },
  textStyle: {
    color: "#fff",
    fontSize: moderateScale(14),
    fontFamily: "OpenSans-Bold"
  },
  coinCountContainer: {
    flexDirection: "row",
    marginHorizontal: moderateScale(10),
    justifyContent: "center",
    alignItems: "center"
  }
});

export default HomeInfoBox;
