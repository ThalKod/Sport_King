import React from "react";
import {View, Text, StyleSheet, Image, ImageBackground} from 'react-native';
import { moderateScale } from "react-native-size-matters";

import CupMain from "../assets/cup_main.png";
import StatWon from "../assets/stats_won.png";
import StatLost from "../assets/stats_lost.png";
import StatInPlay from "../assets/stats_in_play.png";
import StatPosition from "../assets/stats_rank.png";
import ChampionsBackground from '../assets/champions_background.jpg';
import LinearGradient from "react-native-linear-gradient";
import { useSelector } from 'react-redux';


const HomeInfoBox = () => {
  const user = useSelector(state => state.user);

  return (
    <View style={styles.container}>
      <ImageBackground source={ChampionsBackground} style={styles.imageBackground}>
        <LinearGradient
          colors={['#19194B', '#001E22']}
          style={styles.linearGradient}
        />
        <Image style={{ width: moderateScale(80), height: moderateScale(80)}} source={CupMain}/>
        <Text style={styles.text}>{user.name}</Text>
        <View style={styles.statsHolder}>
          <View style={{ alignItems: "center"}}>
            <Image style={{ width: moderateScale(30), height: moderateScale(30)}} source={StatWon}/>
            <Text style={{ fontSize: moderateScale(14), color: "#fff", fontWeight: "bold"}}><Text style={{ color: "#FDE88E"}}>Gagnez:</Text> {user.bet_won}</Text>
          </View>
          <View style={{ alignItems: "center"}}>
            <Image style={{ width: moderateScale(30), height: moderateScale(30)}} source={StatLost}/>
            <Text style={{ fontSize: moderateScale(14), color: "#fff", fontWeight: "bold"}}><Text style={{ color: "#FDE88E"}}>Perdu:</Text> {user.bet_lost}</Text>
          </View>
          <View style={{ alignItems: "center"}}>
            <Image style={{ width: moderateScale(30), height: moderateScale(30)}} source={StatInPlay}/>
            <Text style={{ fontSize: moderateScale(14), color: "#fff", fontWeight: "bold"}}><Text style={{ color: "#FDE88E"}}>En cours:</Text> {user.bet_pending}</Text>
          </View>
          <View style={{ alignItems: "center"}}>
            <Image style={{ width: moderateScale(30), height: moderateScale(30)}} source={StatPosition}/>
            <Text style={{ fontSize: moderateScale(14), color: "#fff", fontWeight: "bold"}}><Text style={{ color: "#FDE88E"}}>Position:</Text> {user.position}</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  text: {
    fontSize: moderateScale(24),
    color: "#fff",
    fontWeight: "bold",
    marginTop: moderateScale(10)
  },
  statsHolder: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingVertical: moderateScale(15)
  },
  imageBackground: {
    resizeMode: "cover",
    justifyContent: "center",
    height: moderateScale(220),
    alignItems: "center",
    padding: moderateScale(15)
  },
  linearGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: moderateScale(220),
    opacity: 0.75
  },
});

export default HomeInfoBox;
