import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  ScrollView, ActivityIndicator,
} from 'react-native';
import Football from "../assets/soccer_icon.png"
import Basketball from "../assets/basketball_icon.png";
import {moderateScale} from 'react-native-size-matters';
// import RealMadrid from "../assets/real-madrid-logo.png";
// import ATHMdrid from "../assets/atletico-madrid-logo-vector.png";
import BetSelectionSingle from "../components/BetSelectionSingle";
import FootballBackground from "../assets/Football-Stadium-background.jpg";
import LinearGradient from "react-native-linear-gradient";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import moment from 'moment';
import { GET_MATCH_ODD } from '../graph-operations';
import {useQuery} from '@apollo/client';
import { useSelector } from 'react-redux'
import QuickPicksModal from '../components/QuickPicksModal';
import {roundDecimals, truncate} from '../utils';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';


// TODO: refactor this component for scalability....
const Tab = createMaterialTopTabNavigator();

const GameDetailsScreen = ({ route, navigation }) => {
  const {
    country,
    leagueName,
    name,
    matchTime,
    homeName,
    awayName,
    sport,
    matchId,
    moneyLine,
  } = route.params;

  console.log("params ", route.params);

  const [isQuickPickVisible, setIsQuickPicksVisible] = useState(false);
  const [quickPicksDetails, setQuickPicksDetails] = useState({});

  const handleCloseModal = (navigate) => {
    closeModal();
    if(navigate) navigation.navigate("Pari");
  };

  const handleSelection = (info) => {
    setIsQuickPicksVisible(true);
    console.log("itemes2 ", info);
    const details = { ...info, sport, homeName, awayName, matchId };

    console.log("detals", details);
    setQuickPicksDetails(details);
  };

  const closeModal = () => {
    setIsQuickPicksVisible(false);
    setQuickPicksDetails({});
  };


  const StatsScreen = () => {
    return (
      <View style={{ backgroundColor: "#1C0C4F", flex: 1, alignItems: "center", justifyContent: "center"}}>
        <AntDesignIcons name="warning" size={moderateScale(30)} color="#fff" />
        <Text style={{ color: "#fff", fontSize: moderateScale(14), textAlign: "center", fontFamily: "OpenSans-Bold"}}>Fonctionnalités à venir. {'\n'} Bientôt!</Text>
      </View>
    )
  };


  const BetSelectionScreen = () => {
    const [gameOdds, setGameOdds] = useState({});

    const user = useSelector(state => state.user);

    const { loading } = useQuery(GET_MATCH_ODD, {
      fetchPolicy: 'no-cache',
      pollInterval: 60000,
      notifyOnNetworkStatusChange: true,
      variables: {
        jsWebToken: user.jsWebToken,
        sport,
        matchId: matchId,
      },
      onCompleted(data){
        // console.log("Data ", data);
        setGameOdds(data.matchOdds);
      }
    });

    console.log("loading ", loading);

    if(loading || Object.keys(gameOdds).length <= 0){
      return (
        <View style={{ backgroundColor: "#1C0C4F", flex: 1, alignItems: "center", justifyContent: "center"}}>
          <ActivityIndicator size="large" color="#fff"/>
        </View>
      )
    }

    console.log(gameOdds);

    const odd1x2 = moneyLine.split(",");
    const { spread, total, handicap, handicapHalf, overUnder } = gameOdds;

    let basketSpreadOddHome;
    let basketSpreadOddAway;
    let basketTotalOddHome;
    let basketTotalOddAway;
    let basketSpreadTextHome;
    let basketSpreadTextAway;
    let basketTotalTextHome;
    let basketTotalTextAway;

    let footballHandicapOddHome;
    let footballHandicapOddAway;
    let footballHandicapTextHome;
    let footballHandicapTextAway;


    let footballHandicapHalfOddHome;
    let footballHandicapHalfOddAway;
    let footballHandicapHalfTextHome;
    let footballHandicapHalfTextAway;

    let footballTotalTextHome;
    let footballTotalTextAway;
    let footballTotalOddHome;
    let footballTotalOddAway;

    let totalSum;


    if(spread && total){
      const spreadOdds = spread[3].split(',');
      const totalOdds = total[3].split(',');

      basketSpreadOddHome = parseFloat(spreadOdds[9]) < 1? parseFloat(spreadOdds[9]) + 1 : parseFloat(spreadOdds[9]);
      basketSpreadOddAway = parseFloat(spreadOdds[10]) < 1? parseFloat(spreadOdds[10])  + 1 : parseFloat(spreadOdds[10]);

      basketTotalOddHome = parseFloat(totalOdds[9]) < 1? parseFloat(totalOdds[9]) + 1 : parseFloat(totalOdds[9]);
      basketTotalOddAway = parseFloat(totalOdds[10]) < 1? parseFloat(totalOdds[10]) + 1 : parseFloat(totalOdds[10]);

      console.log("spread home " + spreadOdds[8])
      const modifOdds = spreadOdds[8] < 0? spreadOdds[8] * -1 : spreadOdds[8];
      basketSpreadTextHome = odd1x2[4] > odd1x2[5]? '+' + modifOdds : '-' + spreadOdds[8];
      basketSpreadTextAway = odd1x2[4] > odd1x2[5]? '-' + modifOdds : '+' + spreadOdds[8];

      basketTotalTextHome = `Over ${totalOdds[8]}`;
      basketTotalTextAway = `Under ${totalOdds[8]}`;

      totalSum = totalOdds[8];
    }

    if(handicap && handicapHalf){
      const handicapOdd = handicap[3].split(',');
      const handicapHalfOdd = handicapHalf[3].split(',');
      const overUnderOdd = overUnder[3].split(',');

      footballHandicapOddHome = parseFloat(handicapOdd[6]) < 1? parseFloat(handicapOdd[6]) + 1 : parseFloat(handicapOdd[6]);
      footballHandicapOddAway = parseFloat(handicapOdd[7]) < 1? parseFloat(handicapOdd[7]) + 1 : parseFloat(handicapOdd[7]);
      footballHandicapTextHome = handicapOdd[5] * -1;
      footballHandicapTextAway = handicapOdd[5] * 1;

      footballHandicapHalfOddHome = parseFloat(handicapHalfOdd[6]) < 1? parseFloat(handicapHalfOdd[6]) + 1 : parseFloat(handicapHalfOdd[6]);
      footballHandicapHalfOddAway = parseFloat(handicapHalfOdd[7]) < 1? parseFloat(handicapHalfOdd[7]) + 1 : parseFloat(handicapHalfOdd[7]);
      footballHandicapHalfTextHome = handicapHalfOdd[5] * -1;
      footballHandicapHalfTextAway = handicapHalfOdd[5] * 1;

      footballTotalTextHome = `Over  ${roundDecimals(overUnderOdd[5])}`;
      footballTotalTextAway =  `Under  ${roundDecimals(overUnderOdd[5])}`;

      totalSum = overUnderOdd[5];

      footballTotalOddHome = parseFloat(overUnderOdd[6]) < 1? parseFloat(overUnderOdd[6]) + 1 : parseFloat(overUnderOdd[6]);
      footballTotalOddAway = parseFloat(overUnderOdd[7]) < 1? parseFloat(overUnderOdd[7]) + 1 : parseFloat(overUnderOdd[7]);
    }


    return (
      <ScrollView
        style={{ backgroundColor: "#1C0C4F", flex: 1}}>
        { sport === "basketball" && <BetSelectionSingle homeName={homeName} awayName={awayName} onOddSelected={(info) => handleSelection(info)} odd={[odd1x2[4], odd1x2[5]]} type={"1x2"} title={"Vainqueur"}/> }
        { sport === "basketball" && <BetSelectionSingle homeName={homeName} awayName={awayName} onOddSelected={(info) => handleSelection(info)} odd={[basketSpreadOddHome.toFixed(2), basketSpreadOddAway.toFixed(2)]} selection={[basketSpreadTextHome, basketSpreadTextAway]} type={"Handicap"} title={"Handicap"}/>}
        { sport === "basketball" && <BetSelectionSingle homeName={homeName} awayName={awayName} onOddSelected={(info) => handleSelection(info)} odd={[basketTotalOddHome.toFixed(2), basketTotalOddAway.toFixed(2)]} selection={[basketTotalTextHome, basketTotalTextAway]} total={roundDecimals(totalSum)} type={"Total"} title={"Total"}/> }

        { sport === "football" && <BetSelectionSingle homeName={homeName} awayName={awayName} onOddSelected={(info) => handleSelection(info)} odd={[odd1x2[5], odd1x2[7], odd1x2[6]]} type={"1x2"} title={"Vainqueur"}/> }
        { sport === "football" && <BetSelectionSingle homeName={homeName} awayName={awayName} onOddSelected={(info) => handleSelection(info)} odd={[footballHandicapOddHome.toFixed(2), footballHandicapOddAway.toFixed(2)]} type={"Handicap"} selection={[ roundDecimals(footballHandicapTextHome), roundDecimals(footballHandicapTextAway)]} title={"Handicap"}/> }
        {/* sport === "football" && <BetSelectionSingle homeName={homeName} awayName={awayName} onOddSelected={(info) => handleSelection(info)} odd={[footballHandicapHalfOddHome.toFixed(2), footballHandicapHalfOddAway.toFixed(2)]} type={"Handicap Half"} selection={[roundDecimals(footballHandicapHalfTextHome), roundDecimals(footballHandicapHalfTextAway)]} title={"Handicap Half"}/> */}
        { sport === "football" && <BetSelectionSingle homeName={homeName} awayName={awayName} onOddSelected={(info) => handleSelection(info)} odd={[footballTotalOddHome.toFixed(2), footballTotalOddAway.toFixed(2)]} total={roundDecimals(totalSum)} type={"Total"} selection={[footballTotalTextHome, footballTotalTextAway]} title={"Over/Under Goals"}/> }
      </ScrollView>
    )
  };

  const correctName = leagueName? leagueName : name;
  const gameIsInPlay = moment() > moment.unix(matchTime);

  return (
    <View style={styles.container}>
      <ImageBackground source={FootballBackground} style={styles.imageBackground}>
        <LinearGradient
          colors={['#046572', '#4949D4']}
          style={styles.linearGradient}
        />
        <View style={{ marginBottom: moderateScale(15)}}>
          <View style={styles.headerTitleContainer}>
            <Image style={styles.sportImageStyle} source={sport === "football"? Football : Basketball}/>
            <Text style={styles.text}>{truncate(`${country? country + " ," :  ""} ${correctName}`, 25)}</Text>
          </View>
          <View style={styles.teamSectionContainer}>
            <View style={styles.teamSection}>
              { /* <Image style={styles.teamBigStyle} source={RealMadrid}/>  */}
              <Text adjustsFontSizeToFit numberOfLines={2} style={[styles.text, { fontSize: moderateScale(14)}]}>{homeName}</Text>
            </View>
            <View style={{ alignItems: "center", alignSelf: "center"}}>
              <Text style={[styles.text, { fontSize: moderateScale(16), color: gameIsInPlay? "#4DFB47" : "#fff"}, ]}>{gameIsInPlay? "En" : moment.unix(matchTime).format("DD/MM")}</Text>
              <Text style={[styles.text, { fontSize: gameIsInPlay? moderateScale(16) : moderateScale(12), color: gameIsInPlay? "#4DFB47" : "#fff"}]}>{gameIsInPlay? "Cours" : moment.unix(matchTime).format("HH:mm")}</Text>
            </View>
            <View style={styles.teamSection}>
              {/* <Image style={styles.teamBigStyle} source={ATHMdrid}/> */ }
              <Text adjustsFontSizeToFit numberOfLines={2} style={[styles.text, { fontSize: moderateScale(14)}]}>{awayName}</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: "#fff",
          style: { backgroundColor: '#140A35' },
        }}
      >
        <Tab.Screen name="Match" component={BetSelectionScreen} />
        <Tab.Screen name="Stats" component={StatsScreen} />
      </Tab.Navigator>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "#1C0C4F"
  },
  headerTitleContainer: {
    paddingHorizontal: moderateScale(10),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  sportImageStyle: {
    width: moderateScale(16),
    height: moderateScale(16),
    resizeMode: "contain",
    marginRight: moderateScale(5)
  },
  imageBackground: {
    resizeMode: "cover",
    justifyContent: "center",
    height: moderateScale(175)
  },
  teamBigStyle: {
    width: moderateScale(75),
    height: moderateScale(75),
    resizeMode: "contain",
    marginBottom: moderateScale(5)
  },
  text: {
    color: "#fff",
    fontFamily: "OpenSans-Bold",
    fontSize: moderateScale(16),
    textAlign: "center"
  },
  teamSection: {
    alignItems: "center",
    width: moderateScale(100)
  },
  teamSectionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(5)
  },
  linearGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
    opacity: 0.25
  },
});

export default GameDetailsScreen;


