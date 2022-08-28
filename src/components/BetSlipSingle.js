import React from "react";
import {
  View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import {  moderateScale } from "react-native-size-matters";
import { truncate } from "../utils";

const betType = (typeNumber) => {
  switch (typeNumber) {
    case 1:
      return "1x2";
    case 2:
      return "Handicap";
    case 3:
      return "Handicap Half";
    case 4:
      return "Total";
    default:
      return "Match";
  }
};

const BetSlipSingle = ({ eventIsOver, item }) => {
  const statusText = item.outcome === 1? "Won" : "Lost";
  const backgroundColor = item.outcome === 1? "#059A32" : "#9A052D";

  return (
      <View style={styles.container}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%"}}>
          <View>
            <Text style={[ styles.colorWhite, styles.teamHeader]}>{item.pickName + ` ${item.spread ? `(${item.spread})` : ""}`}</Text>
            <Text style={[ styles.colorWhite, styles.gameDetails ]}>{`${betType(item.betType)}: ${item.pickName} ${item.spread? `(${item.spread})` : ""}`}</Text>
            <Text adjustsFontSizeToFit style={[ styles.colorWhite, styles.gameDetails ]}>{truncate(item.teams, moderateScale(35))}</Text>
          </View>
          <View style={{alignItems: "flex-end"}}>
            <Text style={styles.odd}>{item.odd.toFixed(2)}</Text>
            <TouchableOpacity disable={true} style={[styles.cashoutButton, { backgroundColor: item.outcome !== null? backgroundColor : "#331493" }]}>
              <Text style={[ styles.colorWhite]}>{eventIsOver? statusText : "Pending"}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.separator}/>
        <View style={{ flexDirection: "row", justifyContent: "space-between"}}>
          <View style={{alignItems: "center"}}>
            <Text style={[styles.colorWhite, styles.bottomDetailsText]}>Odd</Text>
            <Text style={[styles.colorWhite, styles.bottomDetailsText]}>{item.odd.toFixed(2)}</Text>
          </View>
          <View style={{alignItems: "center"}}>
            <Text style={[styles.colorWhite, styles.bottomDetailsText]}>Amount</Text>
            <Text style={[styles.colorWhite, styles.bottomDetailsText]}>{item.bid} Ƀ</Text>
          </View>
          <View style={{alignItems: "center"}}>
            <Text style={[styles.colorWhite, styles.bottomDetailsText]}>{ eventIsOver? statusText : "Winning amount"}</Text>
            <Text style={[styles.colorWhite, styles.bottomDetailsText]}>{(item.bid * item.odd).toFixed(2)} Ƀ</Text>
          </View>
        </View>
      </View>
  )
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#140A35",
    height: moderateScale(125),
    padding: moderateScale(15),
    marginBottom: moderateScale(5),
    borderRadius: moderateScale(10)
  },
  separator: {
    height: moderateScale(0.5),
    backgroundColor: "#A9B8CC",
    width: "100%",
    marginVertical: moderateScale(5)
  },
  teamHeader: {
    fontSize: moderateScale(16),
    fontFamily: "OpenSans-Bold"
  },
  gameDetails: {
    fontSize: moderateScale(12),
    fontFamily: "OpenSans",
    opacity: 0.7
  },
  cashoutButton: {
    backgroundColor: "#331493",
    height: moderateScale(35),
    borderRadius: moderateScale(20),
    padding: moderateScale(10),
    width: moderateScale(75),
    alignItems: "center",
    justifyContent: "center"
  },
  colorWhite: {
    color: "#fff"
  },
  odd: {
    color: "#4DFB47",
    fontSize: moderateScale(14),
    fontFamily: "OpenSans",
    marginBottom: moderateScale(5)
  },
  bottomDetailsText: {
    fontSize: moderateScale(10),
    fontFamily: "OpenSans",
    opacity: 0.7
  }
});

export default BetSlipSingle;
