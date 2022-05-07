import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
    ScrollView,
    ActivityIndicator,
    FlatList
} from "react-native";
import { useQuery, useLazyQuery } from "@apollo/client";
import { LEAGUES } from "../graph-operations";
import EventListSingle from "../components/EventListSingle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useSelector} from 'react-redux';


const LeagueListScreen = ({ route, navigation }) => {
  const [leaguesList, setLeaguesList] = useState([]);
  const { sport, liveScore } = route.params;
  const [jsWebToken, setJsWebToken] = useState("");

  const user = useSelector(state => state.user);


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log("loading");
      getLeagues();
    });
    getToken();

    return () => {
      unsubscribe();
    }
  }, []);

  const getToken = async () => {
    const token = await AsyncStorage.getItem("jsWebToken");
    if(token)
      setJsWebToken(token);
  };

  const [getLeagues, { loading }] = useLazyQuery(LEAGUES, {
    fetchPolicy: 'no-cache',
    variables: {
      jsWebToken: user.jsWebToken,
      sport
    },
    onCompleted(data){
      console.log("data : ", data.leagues);
      setLeaguesList(data.leagues);
    }
  });

  if(loading || !jsWebToken){
    return (
        <View style={{ backgroundColor: "#1C0C4F", flex: 1, alignItems: "center", justifyContent: "center"}}>
          <ActivityIndicator size="large" color="#fff"/>
        </View>
    )
  }

  const handleOnPress= (item) => {
    if(liveScore)
      return navigation.navigate("LeagueLive", {});

    navigation.navigate("GamesList", { matchIDs: item.matchIds, country: item.country, leagueName: item.leagueName, name: item.name, sport})
  };

  const renderLeague = ({ item }) => {
    return (
        <EventListSingle
            key={item.leagueId}
            request={false}
            onPress={() => handleOnPress(item)}
            text={`${item.country}, ${item.name || item.leagueName}`}
            icon={item.logo}
            liveCount={item.scheduledGames}
        />
    )
  };

  return (
      <View style={styles.container}>
        <FlatList
            data={leaguesList}
            keyExtractor={(items) => items.leagueId}
            renderItem={renderLeague}
        />
      </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C0C4F"
  },

});

export default LeagueListScreen;
