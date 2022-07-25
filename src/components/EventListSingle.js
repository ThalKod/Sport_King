import React, { useState, useEffect } from "react";
import {
  View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from "react-native";
import { useQuery, useLazyQuery } from "@apollo/client";
import { GET_SCHEDULED_GAMES_COUNT } from "../graph-operations";
import { moderateScale } from "react-native-size-matters";
import ArrowTOuch from "../assets/arrow.png";
import {useSelector} from 'react-redux';
import { truncate} from '../utils';

const EventListSingle = ({ request, text, icon, liveCount, onPress }) => {
  const [gamesCount, setGameCount] = useState(0);
  const user = useSelector(state => state.user);

  console.log("URI=======================", icon)

  useEffect(() => {
    getScheduledGamesCount();
  }, []);

  const [getScheduledGamesCount, { loading }]= useLazyQuery(GET_SCHEDULED_GAMES_COUNT, {
    fetchPolicy: 'no-cache',
    pollInterval: 10000,
    skip: !request,
    variables: {
      jsWebToken: user.jsWebToken,
      sport: text.toLowerCase()
    },
    onCompleted(data){
      console.log("request", request);
      if(request){
        console.log("scheduled games", data);
        setGameCount(data.scheduledGamesCount);
      }
    }
  });

  return (
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <View style={{ flexDirection: "row", alignItems: "center"}}>
          { request?
              <Image style={styles.sportImageStyle} source={icon}/> :
              <Image style={styles.sportImageStyle} source={{ uri: icon }}/>
          }
          <Text adjustsFontSizeToFit style={styles.text}>{truncate(text, 25)}</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center"}}>
          <View style={styles.liveCount}>
            <Text style={styles.liveCountText}>{request? gamesCount : liveCount}</Text>
          </View>
          <Image style={styles.arrowImageStyle} source={ArrowTOuch}/>
        </View>
      </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#140A35",
    height: moderateScale(55),
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(20),
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: moderateScale(5)
  },
  text: {
    color: "#fff",
    fontFamily: "OpenSans-Bold",
    fontSize: moderateScale(14)
  },
  sportImageStyle: {
    width: moderateScale(16),
    height: moderateScale(16),
    resizeMode: "contain",
    marginRight: moderateScale(10)
  },
  arrowImageStyle: {
    width: moderateScale(30),
    height: moderateScale(30),
    resizeMode: "contain",
    marginLeft: moderateScale(15)
  },
  liveCount: {
    backgroundColor: "#716E7C",
    width: moderateScale(50),
    height: moderateScale(25),
    justifyContent: "center",
    alignItems: "center"
  },
  liveCountText: {
    color: "#FEB400",
  }
});

export default EventListSingle;
