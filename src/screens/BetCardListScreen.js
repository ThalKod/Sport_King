import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image, FlatList, ActivityIndicator,
} from 'react-native';
import BetCardSingle from "../components/BetCardSingle";
import { moderateScale } from "react-native-size-matters"
import spain from "../assets/spain.png";
import {useQuery} from '@apollo/client';
import { GET_MATCH_BASIC_INFO } from '../graph-operations';
import {useSelector} from 'react-redux';
import QuickPicksModal from '../components/QuickPicksModal';
import {truncate} from '../utils';
import NetInfo from '@react-native-community/netinfo';
import analytics from "@react-native-firebase/analytics";


const BetCardListScreen  = ({ route, navigation }) => {
  const { matchIDs, country, leagueName, sport, name } = route.params;
  const [gameDetails, setGameDetails] = useState([]);
  const [isQuickPickVisible, setIsQuickPicksVisible] = useState(false);
  const [quickPicksDetails, setQuickPicksDetails] = useState({});
  const [isConnected, setIsConnected] = useState(false);

  const user = useSelector(state => state.user);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log("Connection type", state);
      setIsConnected(state.isConnected);
    });

    // Unsubscribe
    unsubscribe();
  }, []);


  const { loading } = useQuery(GET_MATCH_BASIC_INFO, {
    fetchPolicy: 'no-cache',
    pollInterval: 5000,
    variables: {
      jsWebToken: user.jsWebToken,
      sport,
      matchId: matchIDs,
    },
    onCompleted(data){
      console.log("m basic info ", data);
      setGameDetails(data.matchBasicInfo);
    }
  });

  const handleCloseModal = (navigate) => {
    closeModal();
    if(navigate) navigation.navigate("Paris");
  };

  const handleSelection = async (info, item) => {
    setIsQuickPicksVisible(true);
    console.log("itemes1 ", item);
    console.log("itemes2 ", info);
    const details = { ...info, ...item, sport};

    console.log("detals", details);
    setQuickPicksDetails(details);

    await analytics().logEvent('click_on_odds');

  };

  const closeModal = () => {
    setIsQuickPicksVisible(false);
    setQuickPicksDetails({});
  };

  const renderCards = ({ item }) => {
    console.log("item ", item);
    return (
        <BetCardSingle onOddSelected={(info) => handleSelection(info, item)} {...item} sport={sport} onPress={() => navigation.navigate("GameDetails", {...item, country, leagueName, name, sport, matchId: item.matchId })}/>
    )
  };

  if(loading){
    return (
        <View style={{ backgroundColor: "#1C0C4F", flex: 1, alignItems: "center", justifyContent: "center"}}>
          <ActivityIndicator size="large" color="#fff"/>
        </View>
    )
  }

  const correctName = leagueName ? leagueName : name;

  return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.text}>{truncate(country + ", " + correctName, 25)}</Text>
        </View>
        <View style={[styles.container, { padding: moderateScale(5)}]}>
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
        /> */}
        { isQuickPickVisible && <QuickPicksModal info={quickPicksDetails} close={(navigate) => handleCloseModal(navigate)} /> }
      </View>
  )
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C0C4F",
  },
  sportImageStyle: {
    width: moderateScale(16),
    height: moderateScale(16),
    resizeMode: "contain",
    marginRight: moderateScale(10)
  },
  text: {
    color: "#fff",
    fontFamily: "OpenSans-Bold",
    fontSize: moderateScale(16)
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#140A35",
    padding: moderateScale(5)
  }
});

export default BetCardListScreen;
