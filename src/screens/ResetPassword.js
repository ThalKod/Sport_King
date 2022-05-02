import React, {useState} from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity } from 'react-native';
import BackgroundImage from "../assets/jobil.jpg";
import LinearGradient from 'react-native-linear-gradient';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { moderateScale } from 'react-native-size-matters';
import CustomTextInput from "../components/CustomTextInput";
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MainButton from "../components/MainButton";
import arrowImage from "../assets/arrow.png";


const ResetPassword = ({ navigation })=>{

  return (
      <ImageBackground source={BackgroundImage} style={styles.container}>
        <LinearGradient
            colors={['#046572', '#4949D4']}
            style={styles.linearGradient}
        />
        <View style={styles.content}>
          <View style={{ flexDirection: "row"}}>
            <Text style={[styles.headerTitles, styles.white]}>Sport</Text>
            <Text style={[styles.headerTitles, styles.yellow]}>King</Text>
          </View>
          <View style={styles.loginSection}>
            <CustomTextInput placeHolder="E-mail" icon={<Feather style={{ marginRight: moderateScale(10)}} name="at-sign" size={20} color="#B3B3B6" />}/>
            <MainButton text={"RESET PASSWORD"} color={"#19D8B7"}/>
          </View>
        </View>
      </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  linearGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
    opacity: 0.7
  },
  content: {
    paddingTop: getStatusBarHeight(),
    alignItems: "center",
    padding: moderateScale(20),
    flex: 1,
  },
  headerTitles: {
    fontSize: moderateScale(50),
    fontFamily: "GROBOLD",
    marginTop: moderateScale(50),
    marginBottom: moderateScale(200)
  },
  forgetText: {
    fontSize: moderateScale(14),
    fontFamily: "OpenSans-Bold",
    color: "#36C0B0",
    textDecorationLine: 'underline',
    marginBottom: moderateScale(10)
  },
  white: {
    color: "#fff"
  },
  yellow: {
    color: "#FDE88E"
  },
  loginSection: {
    width: "100%"
  },
  newUserText: {
    textAlign: "center",
    fontSize: moderateScale(14),
    fontFamily: "OpenSans-Bold",
    color: "#36C0B0",
  }
});

export default ResetPassword;
