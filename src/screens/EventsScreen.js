import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView, ActivityIndicator,
} from 'react-native';
import EventListSingle from "../components/EventListSingle";
import BallIcon from "../assets/soccer_icon.png";
import BasketBall from "../assets/basketball_icon.png";
import { moderateScale } from "react-native-size-matters";
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import NetInfo from '@react-native-community/netinfo';

const EventsScreen = ({ navigation, route }) => {

  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log("Connection type", state);
      setIsConnected(state.isConnected);
    });

    // Unsubscribe
    unsubscribe();
  }, []);

  return (
      <View style={styles.container}>
        <ScrollView>
          <EventListSingle request={true} onPress={() => navigation.navigate("Leagues", { sport: "football" })} text={"FOOTBALL"} icon={BallIcon}/>
          {/*<EventListSingle request={true} onPress={() => navigation.navigate("Leagues", { sport: "basketball", liveScore })} text={"BASKETBALL"} icon={BasketBall} />*/}
        </ScrollView>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C0C4F"
  }
});

export default EventsScreen;
