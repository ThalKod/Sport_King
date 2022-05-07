import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
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
import { useMutation } from '@apollo/client';
import { SIGNUP_USER } from "../graph-operations";
import { useDispatch } from 'react-redux';
import { initUser } from '../redux/features/userSlice';


const Register = ({ navigation }) => {

  const dispatch = useDispatch();
  const [nameValue, setNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [passwordConfirmationValue, setPasswordConfirmationValue] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [loading, setLoading] = useState(false);

  const [signupUser] = useMutation(SIGNUP_USER, {
    onCompleted(data){
      console.log("Data : ", data);
      const { token, user } = data.signupUser;
      dispatch(initUser({
        jsWebToken: token,
        id: user.id,
        name: user.name,
        coins: user.coins,
        bet_won: user.bet_won,
        bet_lost: user.bet_lost,
        bet_pending: user.bet_pending
      }));
      navigation.dispatch(StackActions.popToTop());
      setLoading(false);
      navigation.dispatch(
          StackActions.replace('Home')
      );
    },
    onError(error){
      setLoading(false);
      console.log("Error ", error);
    }
  });

  const handleSignupUser = async () => {
    if(!nameValue || !emailValue || !passwordConfirmationValue || !passwordValue || loading)
      return;

    //TODO: Handle error: if confirmation password incorrect
    if(passwordValue !== passwordConfirmationValue)
      return;

    setLoading(true);
    signupUser({
      variables: {
        name: nameValue,
        email: emailValue.toLowerCase(),
        password: passwordValue,
        invitedBy: inviteCode
      }
    })
  };

  const loadingComp =  <ActivityIndicator size="large" color="#fff"/>;

  return (
      <ImageBackground source={BackgroundImage} style={styles.container}>
        <LinearGradient
            colors={['#046572', '#4949D4']}
            style={styles.linearGradient}
        />
        <KeyboardAvoidingView>
          <ScrollView keyboardShouldPersistTaps="handled">
            <View style={styles.content}>
              <View style={{ flexDirection: "row"}}>
                <Text style={[styles.headerTitles, styles.white]}>Sport</Text>
                <Text style={[styles.headerTitles, styles.yellow]}>King</Text>
              </View>
              <View style={styles.loginSection}>
                <CustomTextInput value={nameValue} onValueChange={(v) => setNameValue(v)} placeHolder="Nom d'Utilisateur" icon={<AntDesign style={{ marginRight: moderateScale(10)}} name="user" size={20} color="#B3B3B6" />}/>
                <CustomTextInput value={emailValue} onValueChange={(v) => setEmailValue(v)} placeHolder="E-mail" icon={<Feather style={{ marginRight: moderateScale(10)}} name="at-sign" size={20} color="#B3B3B6" />}/>
                <CustomTextInput value={passwordValue} onValueChange={(v) => setPasswordValue(v)} password placeHolder="Password" icon={<AntDesign style={{ marginRight: moderateScale(10)}} name="lock" size={20} color="#B3B3B6" />}/>
                <CustomTextInput value={passwordConfirmationValue} onValueChange={(v) => setPasswordConfirmationValue(v)} password placeHolder="Password Confirmation" icon={<AntDesign style={{ marginRight: moderateScale(10)}} name="lock" size={20} color="#B3B3B6" />}/>
                <CustomTextInput value={inviteCode} onValueChange={(v) => setInviteCode(v)} placeHolder="Invite Code(Optionnel)" icon={<AntDesign style={{ marginRight: moderateScale(10)}} name="barcode" size={20} color="#B3B3B6" />}/>
                <MainButton onClick={handleSignupUser} text={loading? loadingComp : "CREER UN COMPTE"} color={"#19D8B7"} arrow={arrowImage}/>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text style={styles.newUserText}>T'as deja un compte? {"\n"}  Clique ici pour te connecter! </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
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
    flex: 1,
    paddingTop: getStatusBarHeight(),
    alignItems: "center",
    padding: moderateScale(20),
    // justifyContent: "space-between"
  },
  headerTitles: {
    fontSize: moderateScale(50),
    fontFamily: "GROBOLD",
    marginTop: moderateScale(50),
    marginBottom: moderateScale(100)
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
  }
});

export default Register;
