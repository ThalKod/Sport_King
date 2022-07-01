import React from "react";
import {
  View,
    Text,
    StyleSheet,
    Image
} from "react-native";
import Gold from "../assets/Gold_Board.png";
import Silver from "../assets/Silver_Board.png";
import Bronze from "../assets/Bronze_Board.png";
import { moderateScale } from "react-native-size-matters";
import profilePhotos2  from "../assets/example_profile.jpg";
import Betcoin from '../assets/betcoin.png';
import numeral from "numeral";

const Profile = ({name, photos}) => (
    <View style={{ alignItems: "center"}}>
      <Text style={{ color: "#fff", fontSize: moderateScale(16), fontFamily: "OpenSans-Bold"}}>{name}</Text>
      <Image
          style={{
              width: moderateScale(50),
              height: moderateScale(50),
              borderRadius: moderateScale(25),
              overflow: "hidden",
              borderWidth: moderateScale(1.5),
              borderColor: "grey"
          }}
          source={photos}  />
    </View>
);

const TopTierLeaderBoard = ({ topData, weekly, monthly, alltime }) => {
  const renderCorrectCoins = (data) => {
    if(weekly)
      return data.weekly_count;

    if(monthly)
      return data.monthly_count;

    if(alltime)
      return data.alltime_count;
  };

  return (
      <View style={styles.container}>
        <View style={{ zIndex: 15, flexDirection: "row", alignItems: "center", justifyContent: "center", position: "absolute", top: moderateScale(135), left: moderateScale(50), width: moderateScale(70)}}>
          <Text style={styles.text}>{numeral(renderCorrectCoins(topData[2])).format("0.0a")}</Text>
          <Image style={{ resizeMode: "contain", width: moderateScale(18)}} source={Betcoin}/>
        </View>
        <View style={{ zIndex:15, flexDirection: "row", alignItems: "center", position: "absolute", top: moderateScale(85), left: moderateScale(165)}}>
          <Text style={styles.text}>{numeral(renderCorrectCoins(topData[0])).format("0.0a")}</Text>
          <Image style={{ resizeMode: "contain", width: moderateScale(18)}} source={Betcoin}/>
        </View>
        <View style={{ zIndex:15, flexDirection: "row", alignItems: "center", position: "absolute", top: moderateScale(125), right: moderateScale(50)}}>
          <Text style={styles.text}>{numeral(renderCorrectCoins(topData[1])).format("0.0a")}</Text>
          <Image style={{ resizeMode: "contain", width: moderateScale(18)}} source={Betcoin}/>
        </View>
        <View style={{ position: "absolute", left: moderateScale(55), top: moderateScale(60)}}>
          <Profile name={topData[2].user_name.split(" ")[0]} photos={profilePhotos2}/>
        </View>
        <View style={{ position: "absolute", right: moderateScale(50), top: moderateScale(55)}}>
          <Profile name={topData[1].user_name.split(" ")[0]} photos={profilePhotos2} />
        </View>
        <View style={{ position: "absolute", right: moderateScale(160), top: moderateScale(5)}}>
          <Profile name={topData[0].user_name.split(" ")[0]} photos={profilePhotos2}/>
        </View>
        <View style={styles.leadersBoard}>
          <Image style={[styles.standImage , { marginRight: moderateScale(-30),  }]} source={Bronze} />
          <Image style={[styles.standImage, { height: moderateScale(180), zIndex: 10}]} source={Gold} />
          <Image style={[styles.standImage, { marginLeft: moderateScale(-30), height: moderateScale(130), zIndex: 5 }]} source={Silver} />
        </View>
      </View>
  )
};

const styles = StyleSheet.create({
  container: {
    padding: moderateScale(5)
  },
  leadersBoard: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "baseline",
    paddingTop: moderateScale(50)
  },
  standImage: {
    resizeMode: "contain",
    width: moderateScale(140),
    height: moderateScale(125),
  },
  text: {
    fontSize: moderateScale(12),
    color: "#fff",
    fontFamily: "OpenSans-Bold",
    marginRight: moderateScale(5),
    textAlign: "center"
  }
});

export default TopTierLeaderBoard;
