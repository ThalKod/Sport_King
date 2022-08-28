import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator, Platform,
} from "react-native";
import BackgroundImage from "../assets/jobil.jpg";
import LinearGradient from 'react-native-linear-gradient';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { moderateScale } from 'react-native-size-matters';
import { StackActions } from '@react-navigation/native';
import CustomTextInput from "../components/CustomTextInput";
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MainButton from "../components/MainButton";
import arrowImage from "../assets/arrow.png";
import { LOGIN_USER, SAVE_DEVICE_INFO } from "../graph-operations";
import { useMutation } from "@apollo/client";
import { initUser, initUserPersit } from '../redux/features/userSlice';
import { useDispatch } from 'react-redux';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import analytics from "@react-native-firebase/analytics";
import { getDeviceInfo } from "../utils";
import messaging from "@react-native-firebase/messaging";


const Login = ({ navigation })=>{

  const dispatch = useDispatch();
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorCompletion, setErrorCompletion] = useState(false)
  const [errorUser, setErrorUser] = useState(false)
  const [fcmToken, setFcmToken] = useState("")

  useEffect(() => {
    // Get the device token
    messaging()
      .getToken()
      .then(token => {
        console.log("token", token)
        setFcmToken(token)
      });
  }, []);

  const [login] = useMutation(LOGIN_USER, {
    onCompleted: async (data) => {
      // console.log("Data : ", data);

      const { token, user } = data.login;
      dispatch(initUserPersit({
        jsWebToken: token,
        id: user.id,
        name: user.name,
        coins: user.coins ,
        bet_won: user.bet_won,
        bet_lost: user.bet_lost,
        bet_pending: user.bet_pending
      }));

      const info = await getDeviceInfo();
      console.log("Device info", info)
      saveDeviceInfo({
        variables: {
          jsWebToken: token,
          ...info
        }
      })

      navigation.dispatch(StackActions.popToTop());
      setLoading(false);
      navigation.dispatch(
        StackActions.replace('Home')
      );
    },
    onError(error){
      setLoading(false);
      setErrorUser(true)
      // console.log("Error ", error);
    }
  });

  const [saveDeviceInfo] = useMutation(SAVE_DEVICE_INFO, {
    onCompleted(data){
       console.log("Data : ", data);
    },
    onError(error){
      console.log("Error device info ", error);
    }
  });

  const handleLogin = async () => {
    if(!emailValue || !passwordValue || loading)
      return setErrorCompletion(true);

    setLoading(true);
    login({
      variables: {
        email: emailValue.toLowerCase(),
        password: passwordValue,
        fcmtoken: fcmToken
      }
    })
    await analytics().logEvent('signin_user_button');
  };

  const loadingComp =  <ActivityIndicator size="large" color="#fff"/>;

  const handleNewUser = async () => {
    await analytics().logEvent('new_registered_user');
    navigation.navigate("Register")
  }

  return (
      <ImageBackground source={BackgroundImage} style={styles.container}>
        <LinearGradient
            colors={['#046572', '#4949D4']}
            style={styles.linearGradient}
        />
        <KeyboardAwareScrollView>
          <ScrollView keyboardShouldPersistTaps="handled">
            <View style={styles.content}>
              <View style={{ flexDirection: "row"}}>
                <Text style={[styles.headerTitles, styles.white]}>Sport</Text>
                <Text style={[styles.headerTitles, styles.yellow]}>King</Text>
              </View>
              <View style={styles.loginSection}>
                <CustomTextInput value={emailValue} onValueChange={(v) => {
                  setErrorCompletion(false);
                  setErrorUser(false)
                  setEmailValue(v)
                }} placeHolder="E-mail" icon={<Feather style={{ marginRight: moderateScale(10)}} name="at-sign" size={20} color="#B3B3B6" />}/>
                <CustomTextInput value={passwordValue} onValueChange={(v) => {
                  setErrorCompletion(false)
                  setErrorUser(false)
                  setPasswordValue(v)
                }} password placeHolder="Password" icon={<AntDesign style={{ marginRight: moderateScale(10)}} name="lock" size={20} color="#B3B3B6" />}/>
                {/* <TouchableOpacity onPress={() => navigation.navigate("ResetPassword")}>
                  <Text style={styles.forgetText}>Ou bliye password ou ?</Text>
                </TouchableOpacity> */}
                { errorUser && <Text style={styles.errorText}>Email or password incorrect !</Text> }
                { errorCompletion && <Text style={styles.errorText}>Please complete the password !</Text> }
                <MainButton onClick={handleLogin} text={loading? loadingComp : "SIGN IN"} color={"#19D8B7"} arrow={arrowImage}/>
                <TouchableOpacity onPress={handleNewUser}>
                  <Text style={styles.newUserText}>Don't have an account yet? {"\n"}  Click here to create one </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAwareScrollView>
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
    // justifyContent: "space-between"
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
    textDecorationLine: 'underline',
  },
  errorText: {
    color: "red",
    fontSize: moderateScale(14),
    fontWeight: "bold"
  }
});

export default Login;
