import React, {useState} from 'react';
import { StyleSheet, Text, View, ImageBackground, } from 'react-native';
import BackgroundImage from "../assets/background_football_head.jpg";
import LinearGradient from 'react-native-linear-gradient';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { moderateScale } from 'react-native-size-matters';
import { StackActions } from '@react-navigation/native';

import OnBoardingInfoBox from "../components/onboardings/OnBoardingInfoBox";
import OnBoardingFooter from "../components/onboardings/OnBoardingFooter";

const Onboardings = ({ navigation })=>{
  const [slideNumber, setSlideNumber] = useState(0);

  const onNextButton = () => {
    setSlideNumber(slideNumber + 1);
    if(slideNumber + 1 === 3){
      navigation.dispatch(
        StackActions.replace('ConnectOptions')
      );
    }
  };


  return (
    <ImageBackground source={BackgroundImage} style={styles.container}>
      <LinearGradient
        colors={['#046572', '#4949D4']}
        style={styles.linearGradient}
      />
      <View style={styles.content}>
        <View style={{ flexDirection: "row", marginBottom: moderateScale(50)}}>
          <Text style={[styles.headerTitles, styles.white]}>Sport</Text>
          <Text style={[styles.headerTitles, styles.yellow]}>King</Text>
        </View>
        <View style={{ flexDirection: "row"}}>
          <OnBoardingInfoBox slideNumber={slideNumber}/>
        </View>
        <OnBoardingFooter currentPage={slideNumber} numPages={3} onPress={onNextButton} />
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
    flex: 1
  },
  headerTitles: {
    fontSize: moderateScale(50),
    fontFamily: "GROBOLD",
    marginTop: moderateScale(50),
    marginBottom: moderateScale(100)
  },
  white: {
    color: "#fff"
  },
  yellow: {
    color: "#FDE88E"
  }
});

export default Onboardings;
