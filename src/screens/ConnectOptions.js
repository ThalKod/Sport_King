import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ImageBackground, Image, ActivityIndicator} from 'react-native';
import BackgroundImage from "../assets/jobil.jpg";
import CupImage from "../assets/cup_sports_2.png";
import arrowImage from "../assets/arrow.png";
import LinearGradient from 'react-native-linear-gradient';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { moderateScale } from 'react-native-size-matters';
import MainButton from "../components/MainButton";
import {useDispatch} from "react-redux";
import analytics from "@react-native-firebase/analytics";

const ConnectOptions = ({ navigation }) => {

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);


  const naviagateToRegister = async () => {
    if(loading)
      return;

    await analytics().logEvent('connect_button');
    navigation.navigate('Register');
  };

  const loadingComp =  <ActivityIndicator size="large" color="#fff"/>;
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


          <Image style={{ width: moderateScale(300), height: moderateScale(300)}} source={CupImage}/>

          <View style={{ width: "100%",}}>
            <MainButton onClick={naviagateToRegister} text={loading? loadingComp : "SIGN IN"} color={"#19D8B7"} arrow={arrowImage}/>
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
    justifyContent: "space-between",
    padding: moderateScale(20),
    flex: 1
  },
  headerTitles: {
    fontSize: moderateScale(50),
    fontFamily: "GROBOLD",
    marginTop: moderateScale(50),
    marginBottom: moderateScale(25)
  },
  white: {
    color: "#fff"
  },
  yellow: {
    color: "#FDE88E"
  }
});

export default ConnectOptions;
