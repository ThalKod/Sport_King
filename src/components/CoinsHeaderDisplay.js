import React, { useEffect, useState } from "react";
import Modal from 'react-native-modal';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button, ActivityIndicator,
} from 'react-native';
import { moderateScale } from "react-native-size-matters";
import {initUser, addCoins } from '../redux/features/userSlice';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Betcoin from "../assets/betcoin.png";
import { useSelector, useDispatch } from 'react-redux'
import { useMutation } from "@apollo/client";
import {ADD_COINS} from '../graph-operations';


// TODO: Fix error for rewarded ads when mot available
const CoinsHeaderDisplay = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [isLoadingRewardedAds, setIsLoadingRewardedAds] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalErrorVisible, setModalErrorVisible] = useState(false);
  const [rewardEarned, setRewardsEarned] = useState({ status: false, amount: 0});

  useEffect(() => {

  }, []);

  const [sendCoins] = useMutation(ADD_COINS, {
    onCompleted(data){
      console.log("Add coins complete : ", data);
    },
    onError(error){
      console.log("Error ", error);
    }
  });

  if(rewardEarned.status){
    sendCoins({
      variables: {
        jsWebToken: user.jsWebToken,
        amount: rewardEarned.amount
      }
    });
    setRewardsEarned({ amount: 0, status: false });
  }

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const showAds = () => {
    toggleModal();
    rewarded.load();
    setIsLoadingRewardedAds(true);
  };

  return (
    <TouchableOpacity onPress={() => {}} style={styles.container}>
      <View style={styles.cartContainer}>
        <MaterialIcons name="add-shopping-cart" size={moderateScale(20)} color="#fff" />
      </View>
      <View style={styles.coinCountContainer}>
        <Image style={styles.imageStyle} source={Betcoin}/>
        <Text style={styles.textStyle}>{user.coins}</Text>
      </View>
      <Modal
        isVisible={isModalVisible}
        onBackButtonPress={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}
      >
        <View style={styles.modal}>
          <Text style={styles.modalText}>Ou vle ajoute plis coin? Gade publisite sa kounya, epi wap jwenn 5000 coins! </Text>
          <Button title="Gade Publisite" onPress={showAds} />
        </View>
      </Modal>
      <Modal
        isVisible={isModalErrorVisible}
        onBackButtonPress={() => setModalErrorVisible(false)}
        onBackdropPress={() => setModalErrorVisible(false)}
      >
        <View style={styles.modal}>
          <Text style={styles.modalText}>Erreur!, pa gen publisite disponib kounya, reessayer nan yon ti moman....</Text>
          <Button title="Ok" onPress={() => setModalErrorVisible(false)} />
        </View>
      </Modal>
      <Modal
        isVisible={isLoadingRewardedAds}
        onBackButtonPress={() => setIsLoadingRewardedAds(false)}
        onBackdropPress={() => setIsLoadingRewardedAds(false)}
      >
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
          <ActivityIndicator size="large" color="#fff"/>
        </View>
      </Modal>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#140A35",
    borderRadius: moderateScale(5),
    height: moderateScale(30),
    marginLeft: moderateScale(0),
    // marginRight: moderateScale(-30),
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
    fontSize: moderateScale(15),
    fontFamily: "OpenSans-Bold"
  },
  coinCountContainer: {
    flexDirection: "row",
    marginHorizontal: moderateScale(10),
    justifyContent: "center",
    alignItems: "center"
  },
  modal:{
    flex: 1,
    position: "absolute",
    backgroundColor: "#fff",
    width: moderateScale(300),
    height: moderateScale(125),
    padding: moderateScale(15),
    left: moderateScale(22.5),
    borderRadius: moderateScale(5),
    justifyContent: "center",
    alignItems: "center"
  },
  modalText: {
    fontFamily: "OpenSans-Bold",
    fontSize: moderateScale(12),
    textAlign: "center",
    marginBottom: moderateScale(10)
  },
});

export default CoinsHeaderDisplay;
