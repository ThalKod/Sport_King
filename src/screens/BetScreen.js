import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet, FlatList, ActivityIndicator,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import BetSlipSingle from "../components/BetSlipSingle";
import { moderateScale } from "react-native-size-matters";
import {useQuery, useLazyQuery} from '@apollo/client';
import { GET_BET } from '../graph-operations';
import {useSelector, useDispatch} from 'react-redux';
import { NavigationContext } from "../context";
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import NetInfo from '@react-native-community/netinfo';
import InAppReview from 'react-native-in-app-review';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistAppReviewLastTime } from '../redux/features/userSlice';
import moment from "moment";


const Tab = createMaterialTopTabNavigator();


const ActiveBet = ({ navigation }) => {
  const user = useSelector(state => state.user);
  const [betData, setBetData] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribeNetInfo = NetInfo.addEventListener(state => {
      console.log("Connection type", state);
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribeNetInfo();
    }
  }, []);

  useFocusEffect(
    React.useCallback(  () => {
      getBet();

      async function showInAppReview() {
        const totalBetCount = await AsyncStorage.getItem("totalBetCount");
        const appReviewLastTime = await AsyncStorage.getItem("appReviewLastTime");

        if(totalBetCount > 5){
          if(!appReviewLastTime){
            InAppReview.RequestInAppReview()
              .then((hasFlowFinishedSuccessfully) => {

                if (hasFlowFinishedSuccessfully) {
                  console.log("has finished persist", hasFlowFinishedSuccessfully);
                  dispatch(persistAppReviewLastTime({ appReviewLastTime: moment().toString()}))
                }
              })
              .catch((error) => console.log(error));
          }else {
            if(moment().diff(moment(appReviewLastTime), "days") >= 10){
              InAppReview.RequestInAppReview()
                .then((hasFlowFinishedSuccessfully) => {

                  if (hasFlowFinishedSuccessfully) {
                    console.log("has finished persist", hasFlowFinishedSuccessfully);
                    dispatch(persistAppReviewLastTime({ appReviewLastTime: moment().toString()}))
                  }
                })
                .catch((error) => console.log(error));
            }
          }
        }
      }

      showInAppReview()

    }, [])
  );

  const [getBet,  { loading }] = useLazyQuery(GET_BET, {
    fetchPolicy: 'no-cache',
    variables: {
      jsWebToken: user.jsWebToken,
      pending: true
    },
    onCompleted(data){
      // console.log("Active Bet data : ", data);
      setBetData(data.getBet);
    }
  });

  const renderCards = ({ item }) => {
    return (
        <BetSlipSingle item={item}/>
    )
  };

  if(loading){
    return (
        <View style={{ backgroundColor: "#1C0C4F", flex: 1, alignItems: "center", justifyContent: "center"}}>
          <ActivityIndicator size="large" color="#fff"/>
        </View>
    )
  }

  if(betData.length <= 0) {
    return (
        <View style={{ backgroundColor: "#1C0C4F", flex: 1, alignItems: "center", justifyContent: "center"}}>
          <Text style={{ color: "#fff", fontSize: moderateScale(16), textAlign: "center"}}>Aucun paris en cours.</Text>
        </View>
    )
  }

  return (
      <View style={styles.container}>
        <FlatList
            data={betData}
            keyExtractor={(items) => items.id.toString()}
            renderItem={renderCards}
        />
        {/* isConnected &&
        <BannerAd
            unitId={adUnitId}
            size={BannerAdSize.FULL_BANNER}
            onAdLoaded={() => console.log("Ads loaded")}
            onAdFailedToLoad={() => {
              console.log("ads failed to load");
            }}
        /> */}
      </View>
  )
};

const EndedBet = ({ navigation }) => {
  const user = useSelector(state => state.user);
  const [betData, setBetData] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log("loading");
      getBet();
    });

    const unsubscribeNetInfo = NetInfo.addEventListener(state => {
      console.log("Connection type", state);
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
      unsubscribeNetInfo();
    }
  }, []);

  const [getBet, { loading }] = useLazyQuery(GET_BET, {
    fetchPolicy: 'no-cache',
    variables: {
      jsWebToken: user.jsWebToken,
      pending: false
    },
    onCompleted(data){
      console.log("Ended Bet data : ", data);
      setBetData(data.getBet)
    }
  });

  const renderCards = ({ item }) => {
    return (
        <BetSlipSingle eventIsOver item={item}/>
    )
  };

  if(loading){
    return (
        <View style={{ backgroundColor: "#1C0C4F", flex: 1, alignItems: "center", justifyContent: "center"}}>
          <ActivityIndicator size="large" color="#fff"/>
        </View>
    )
  }

  if(betData.length <= 0) {
    return (
        <View style={{ backgroundColor: "#1C0C4F", flex: 1, alignItems: "center", justifyContent: "center"}}>
          <Text style={{ color: "#fff", fontSize: moderateScale(16), textAlign: "center"}}>Aucun paris en cours.</Text>
        </View>
    )
  }

  return (
      <View style={styles.container}>
        <FlatList
            data={betData}
            keyExtractor={(items) => items.id.toString()}
            renderItem={renderCards}
        />
        {/* isConnected &&
        <BannerAd
            unitId={adUnitId}
            size={BannerAdSize.FULL_BANNER}
            onAdLoaded={() => console.log("Ads loaded")}
            onAdFailedToLoad={() => {
              console.log("ads failed to load");
            }}
        /> */}
      </View>
  )
};

const BetScreen = ({ navigation }) => {
  return (
    <View style={styles.backgroundColor}>
      <NavigationContext.Provider value={navigation}>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: "#fff",
            tabBarStyle: { backgroundColor: '#140A35' },
          }}
        >
          <Tab.Screen name="En Cours" component={ActiveBet} />
          <Tab.Screen name="Terminee" component={EndedBet} />
        </Tab.Navigator>
      </NavigationContext.Provider>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C0C4F",
    padding: moderateScale(10)
  },
  backgroundColor: {
    flex: 1,
    backgroundColor: "#1C0C4F",
  }
});
export default BetScreen;
