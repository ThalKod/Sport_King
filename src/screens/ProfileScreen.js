import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Share,
  Image,
  ScrollView, ActivityIndicator,
} from "react-native";
import ProfileInfoBox from '../components/ProfileInfoBox';
import { moderateScale } from "react-native-size-matters";
import Emoji from 'react-native-emoji';
import AntDesignIcons from "react-native-vector-icons/AntDesign";
import StatWon from '../assets/stats_won.png';
import StatLost from '../assets/stats_lost.png';
import StatInPlay from '../assets/stats_in_play.png';
import StatPosition from '../assets/stats_rank.png';
import {useSelector, useDispatch} from 'react-redux';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import ArrowTOuch from "../assets/arrow.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initUser } from "../redux/features/userSlice";
import { StackActions } from "@react-navigation/native";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../graph-operations";
import ModalConfirmation from "../components/AdsModal";


const ProfileScreen = ({ navigation }) => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch()
  const [loadingLogout, setLoadingLogout] = useState(false);
  const [loadingDeleteUser, setLoadingDeleteUser] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleLogout = async () => {
    setLoadingLogout(true);
    await updateUser({
      variables: {
        jsWebToken: user.jsWebToken,
        data: {
          fcmtoken: ""
        }
      }
    })

    await AsyncStorage.setItem("jsWebToken", "");
    dispatch(initUser({
      jsWebToken: "",
      id: "",
      name: "",
      coins: 0,
      bet_won: 0,
      bet_lost: 0,
      bet_pending: 0,
      invite_code: ""
    }));
    navigation.dispatch(
      StackActions.replace('ConnectOptions')
    );
  }

  const handleDeletion = async () => {
    setShowModal(false);
    await updateUser({
      variables: {
        jsWebToken: user.jsWebToken,
        data: {
          fcmtoken: "",
          deleted: true
        }
      }
    });

    await AsyncStorage.setItem("jsWebToken", "");
    dispatch(initUser({
      jsWebToken: "",
      id: "",
      name: "",
      coins: 0,
      bet_won: 0,
      bet_lost: 0,
      bet_pending: 0,
      invite_code: ""
    }));

    navigation.dispatch(
      StackActions.replace('ConnectOptions')
    );
  }

  const [updateUser] = useMutation(UPDATE_USER, {
    onCompleted(data){
      console.log("Data : ", data);
    },
    onError(error){
      console.log("Error device info ", error);
    }
  });

  return (
    <ScrollView style={styles.container}>
      <ProfileInfoBox/>
      { showModal && <ModalConfirmation title={"Suprimer mon compte"} close={() => { setShowModal(false); setLoadingDeleteUser(false) }} buttonText={"Confirmer"} text={"Souhaitez vous vraiment suprimer votre compte ? Les données associées a votre compte seront suprimées. Cet action est irreversible!"} onPress={handleDeletion} /> }
      <View style={{ padding: moderateScale(5)}}>
        <View style={styles.prizeBox}>
          <Text style={styles.primText}>Stats</Text>
          <View style={styles.statsHolder}>
            <View style={{ alignItems: "center"}}>
              <Image style={{ width: moderateScale(30), height: moderateScale(30)}} source={StatWon}/>
              <Text style={{ fontSize: moderateScale(14), color: "#fff", fontWeight: "bold"}}><Text style={{ color: "#FDE88E"}}>Gagné:</Text> {user.bet_won}</Text>
            </View>
            <View style={{ alignItems: "center"}}>
              <Image style={{ width: moderateScale(30), height: moderateScale(30)}} source={StatLost}/>
              <Text style={{ fontSize: moderateScale(14), color: "#fff", fontWeight: "bold"}}><Text style={{ color: "#FDE88E"}}>Perdu:</Text> {user.bet_lost}</Text>
            </View>
            <View style={{ alignItems: "center"}}>
              <Image style={{ width: moderateScale(30), height: moderateScale(30)}} source={StatInPlay}/>
              <Text style={{ fontSize: moderateScale(14), color: "#fff", fontWeight: "bold"}}><Text style={{ color: "#FDE88E"}}>En Cours:</Text> {user.bet_pending}</Text>
            </View>
            <View style={{ alignItems: "center"}}>
              <Image style={{ width: moderateScale(30), height: moderateScale(30)}} source={StatPosition}/>
              <Text style={{ fontSize: moderateScale(14), color: "#fff", fontWeight: "bold"}}><Text style={{ color: "#FDE88E"}}>Position:</Text> {user.position}</Text>
            </View>
          </View>
        </View>
        <View style={styles.prizeBox}>
          <View style={{ flexDirection: "row" }}>
            <Emoji name=":tada:" style={{fontSize: moderateScale(20)}} />
            <Text style={styles.primText}>Cartes</Text>
            <Emoji name=":tada:" style={{fontSize: moderateScale(20)}} />
          </View>
          <Text style={styles.subPrimText}>Vous n'avez reçu aucune carte pour cette semaine, continuer de miser, et essayer de rester dans le top 3 du classement</Text>
          {/* <TouchableOpacity style={styles.claimButton}>
          <Text style={{ color: "#261D44" }}>Reklame</Text>
        </TouchableOpacity> */}
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.optionItemsContainer}>
          <Text style={styles.optionsItemsText}>Se déconnecter</Text>
          {loadingLogout?
            <ActivityIndicator size="large" color="#fff"/>
            :
            <Image style={styles.arrowImageStyle} source={ArrowTOuch}/>
          }
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { setShowModal(true); setLoadingDeleteUser(true)}} style={styles.optionItemsContainer}>
          <Text style={styles.optionsItemsText}>Supprimer mon compte</Text>
          {loadingDeleteUser?
            <ActivityIndicator size="large" color="#fff"/>
            :
            <Image style={styles.arrowImageStyle} source={ArrowTOuch}/>
          }
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C0C4F",
  },
  share: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(25),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#19D8B7",
    marginTop: moderateScale(10)
  },
  arrowImageStyle: {
    width: moderateScale(30),
    height: moderateScale(30),
    resizeMode: "contain",
    marginLeft: moderateScale(15)
  },
  prizeBox: {
    backgroundColor: "#140A35",
    width: "100%",
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(5),
    marginVertical: moderateScale(2),
    borderRadius: moderateScale(10),
    alignItems: "center",
  },
  primText: {
    color: "#fff",
    fontSize: moderateScale(20),
    marginHorizontal: moderateScale(5),
    fontFamily: "OpenSans-Bold",
    textDecorationLine: 'underline'
  },
  subPrimText: {
    color: "#fff",
    fontSize: moderateScale(12),
    fontFamily: "OpenSans",
    textAlign: "center",
    marginVertical: moderateScale(5)
  },
  optionItemsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(15),
    borderRadius: moderateScale(10),
    backgroundColor: "#140A35",
    marginBottom: moderateScale(5)
  },
  optionsItemsText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: moderateScale(14)
  },
  statsHolder: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingVertical: moderateScale(15)
  },
});

export default ProfileScreen;
