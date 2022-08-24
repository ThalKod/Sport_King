import React, { useEffect, useState } from "react";
import Modal from 'react-native-modal';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button, ActivityIndicator,
  Platform
} from 'react-native';
import { moderateScale } from "react-native-size-matters";
import {initUser, addCoins } from '../redux/features/userSlice';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Betcoin from "../assets/betcoin.png";
import { useSelector, useDispatch } from 'react-redux'
import { useMutation } from "@apollo/client";
import {ADD_COINS} from '../graph-operations';
import analytics from "@react-native-firebase/analytics";
import {RewardedAd, AdEventType, TestIds, RewardedAdEventType } from 'react-native-google-mobile-ads';
import AdsModal from "./AdsModal";

const adUnitId = Platform.OS === "ios"?  "ca-app-pub-4856517983898537/6949691507" : "ca-app-pub-4856517983898537/1049974470"


// TODO: Fix error for rewarded ads when mot available
const CoinsHeaderDisplay = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [modal, setModal] = useState({
    isMainModalVisible: false,
    isLoadingRewardedAdsModalVisible: false,
    isModalErrorVisible: false
  });

  const [loaded, setLoaded] = useState(false);
  const [isLoadingRewardedAds, setIsLoadingRewardedAds] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalErrorVisible, setModalErrorVisible] = useState(false);
  const [rewardEarned, setRewardsEarned] = useState({ status: false, amount: 0});
  const [appReviewLaunched, setAppReviewingLaunched] = useState(false)

  useEffect(() => {

  }, []);

  const [sendCoins] = useMutation(ADD_COINS, {
    onCompleted(data){
      console.log("Add coins complete : ", data);
      setRewardsEarned({ amount: 0, status: false });
    },
    onError(error){
      console.log("Error ", error);
    }
  });


  const toggleModal = async () => {
    await analytics().logEvent('click_on_add_coin');
    setModal({...modal, isMainModalVisible: !modal.isMainModalVisible})
  };

  const showAds = async () => {
    await analytics().logEvent('click_on_watch_ads');

    const rewarded = RewardedAd.createForAdRequest(adUnitId, {
      requestNonPersonalizedAdsOnly: true,
      keywords: [],
    });

    const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
      console.log("LOADED")
      rewarded.show()
    });

    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        console.log('User earned reward of ', reward);
        sendCoins({
          variables: {
            jsWebToken: user.jsWebToken,
            amount: reward.amount
          }
        });
        dispatch(addCoins({
          coins: reward.amount
        }));
      },
    );

    const unsubscribedClosed = rewarded.addAdEventListener(AdEventType.CLOSED, (error) => {
      console.log("should close all modal")
      setModal({...modal, isLoadingRewardedAdsModalVisible: false, isMainModalVisible: false , isModalErrorVisible: false})
    })

    const unsubscribedError = rewarded.addAdEventListener(AdEventType.ERROR, (error) => {
      console.log('Ad failed to load with error: ', error);
      console.log("should open modal error")
      setModal({...modal, isModalErrorVisible: true, isLoadingRewardedAdsModalVisible: false, isMainModalVisible: false})
    })

    rewarded.load();
    console.log("after main load")

    setModal({...modal, isMainModalVisible: false, isLoadingRewardedAdsModalVisible: true, isModalErrorVisible: false})
  };

  // console.log(modal)

  return (
    <TouchableOpacity onPress={toggleModal} style={styles.container}>
      <View style={styles.cartContainer}>
        <MaterialIcons name="add-shopping-cart" size={moderateScale(20)} color="#fff" />
      </View>
      <View style={styles.coinCountContainer}>
        <Image style={styles.imageStyle} source={Betcoin}/>
        <Text style={styles.textStyle}>{user.coins}</Text>
      </View>
      <Modal
        isVisible={modal.isMainModalVisible || modal.isModalErrorVisible || modal.isLoadingRewardedAdsModalVisible}
        onBackButtonPress={() => setModal({...modal, isMainModalVisible: false})}
        onBackdropPress={() => setModal({...modal, isMainModalVisible: false})}
      >
        {modal.isModalErrorVisible && <AdsModal close={() => setModal({...modal, isModalErrorVisible: false})} buttonText={"Ok"} text={"Pas de pub disponible pour le moment, veuillez reessayer dans un moment"} onPress={() => setModal({...modal, isMainModalVisible: false, isModalErrorVisible: false})} />}

        {modal.isMainModalVisible && <AdsModal close={() => setModal({...modal, isMainModalVisible: false})} buttonText={"Confirmer"} text={"Tu veut ajouter des coins sur ton compte? C'est gratuit ! Regarde une pub maintenant et recois 50 jetons !"} onPress={showAds} />}

        {modal.isLoadingRewardedAdsModalVisible &&
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
            <ActivityIndicator size="large" color="#fff"/>
          </View> }
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
    marginRight: moderateScale(-30),
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
