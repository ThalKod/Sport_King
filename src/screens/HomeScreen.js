import React, { useState, useEffect } from "react";
import {View, Text, StyleSheet, ScrollView, FlatList, ActivityIndicator, KeyboardAvoidingView} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { moderateScale } from "react-native-size-matters";
// import RatingModal from "../components/RateModal";
import HomeInfoBox from "../components/HomeInfoBox";
import BetCardSingle from "../components/BetCardSingle";
import QuickPicksModal from "../components/QuickPicksModal";
import { useLazyQuery } from '@apollo/client';
import {GET_UPCOMING_GAMES, GET_ME, GET_MY_POSITION} from '../graph-operations';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useDispatch} from 'react-redux';
import { initUser } from '../redux/features/userSlice';
import NetInfo from "@react-native-community/netinfo";


const HomeScreen = ({ navigation }) => {

  const [jsWebToken, setJsWebToken] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();


  useEffect(() => {
    getToken();

    const unsubscribe = NetInfo.addEventListener(state => {
      console.log("Connection type", state);
      setIsConnected(state.isConnected);
    });

    // Unsubscribe
    unsubscribe();
  }, []);

  const getToken = async () => {
    const token = await AsyncStorage.getItem("jsWebToken");
    const AppRated =  await AsyncStorage.getItem("AppRated");
    if(token){
      setJsWebToken(token);
      getMe();
      getUpcomingGames();
      getMyPosition();
    }

    if(!JSON.parse(AppRated)){
      const interaction =  await AsyncStorage.getItem("Interaction");
      if(JSON.parse(interaction) >= 3){
        await AsyncStorage.setItem("Interaction", JSON.stringify(0));
        setIsModalOpen(true);
      }else{
        const newInter = JSON.parse(interaction) + 1 || 1;
        await AsyncStorage.setItem("Interaction", JSON.stringify(newInter));
      }
    }
  };

  const sport = "football";
  const [isQuickPickVisible, setIsQuickPicksVisible] = useState(false);
  const [quickPicksDetails, setQuickPicksDetails] = useState({});
  const [gameDetails, setGameDetails] = useState([]);


  const [ getUpcomingGames, { loading }] = useLazyQuery(GET_UPCOMING_GAMES, {
    fetchPolicy: 'no-cache',
    variables: {
      jsWebToken: jsWebToken,
      data: {
        sport
      }
    },
    onCompleted(data){
      // console.log("data ", data);
      setGameDetails(data.upcomingGames);
    }
  });

  const [ getMe, { }] = useLazyQuery(GET_ME, {
    fetchPolicy: 'no-cache',
    variables: {
      jsWebToken: jsWebToken,
    },
    onCompleted(data){
      console.log("data ", data);
      dispatch(initUser({
        jsWebToken,
        id: data.getMe.id,
        name: data.getMe.name,
        coins: data.getMe.coins,
        bet_won: data.getMe.bet_won,
        bet_lost: data.getMe.bet_lost,
        bet_pending: data.getMe.bet_pending,
        invite_code: data.getMe.invite_code
      }));
    }
  });

  const [ getMyPosition, { }] = useLazyQuery(GET_MY_POSITION, {
    fetchPolicy: 'no-cache',
    variables: {
      jsWebToken: jsWebToken,
      orderBy: {
        weekly_count: "desc"
      }
    },
    onCompleted(data){
      console.log(data);
      dispatch(initUser({
        jsWebToken,
        position: data.getMyPosition.position
      }));
    }
  });

  const handleCloseModal = (navigate) => {
    closeModal();
    if(navigate) navigation.navigate("Pari");
  };

  const handleSelection = (info, item) => {
    setIsQuickPicksVisible(true);
    console.log("itemes1 ", item);
    console.log("itemes2 ", info);
    const details = { ...info, ...item, sport};

    console.log("detals", details);
    setQuickPicksDetails(details);
  };

  const closeModal = () => {
    setIsQuickPicksVisible(false);
    setQuickPicksDetails({});
  };

  const renderCards = ({ item }) => {
    // console.log("item ", item);
    return (
      <BetCardSingle onOddSelected={(info) => handleSelection(info, item)} {...item} sport={sport} onPress={() => navigation.navigate("GameDetails", {...item, country: "", sport, matchId: item.matchId })}/>
    )
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar style="light" />
      <HomeInfoBox/>
      <View style={styles.content}>
        <Text style={styles.titleText}>Matchs à la une</Text>
        { loading &&
        <View style={{ backgroundColor: "#1C0C4F", flex: 1, alignItems: "center", justifyContent: "center"}}>
          <ActivityIndicator size="large" color="#fff"/>
        </View>
        }
        <FlatList
          data={gameDetails}
          keyExtractor={(items) => items.matchId}
          renderItem={renderCards}
        />
      </View>
      {/* isConnected &&
          <BannerAd
              unitId={adUnitId}
              size={BannerAdSize.FULL_BANNER}
              onAdLoaded={() => console.log("Ads loaded")}
              onAdFailedToLoad={() => {
                console.log("ads failed to load");
              }}
          /> */ }
      { isQuickPickVisible && <QuickPicksModal info={quickPicksDetails} close={(navigate) => handleCloseModal(navigate)} /> }
      {/* <RatingModal isModalOpen={isModalOpen} closeModal={() => setIsModalOpen(false)}/> */}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#261D44",
  },
  content: {
    flex: 1,
    backgroundColor: "#1C0C4F",
    paddingHorizontal: moderateScale(5)

  },
  titleText: {
    fontSize: moderateScale(18),
    fontFamily: "OpenSans-Bold",
    color: "#fff",
    alignSelf: "center",
    marginVertical: moderateScale(5)
  }
});

export default HomeScreen;
