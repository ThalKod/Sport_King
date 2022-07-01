import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { moderateScale } from "react-native-size-matters";
import AntDesign from 'react-native-vector-icons/AntDesign';
import OddSelection from "./OddSelection";

const BetSelectionSingle = ({ title, odd, selection, onOddSelected, awayName, homeName, type, total }) => {
  const [isOpen, setIsOpen] = useState(true);

  const showSpread = type === "Handicap" || type === "Handicap Half";
  const showTotal = type === "Total";

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setIsOpen(!isOpen)} style={styles.textSection}>
        <Text style={styles.textTitle}>{title}</Text>
        <AntDesign name={isOpen? "down" : "right"} size={moderateScale(14)} color={"#fff"} />
      </TouchableOpacity>
      { isOpen &&
      <View style={styles.betSection}>
        <OddSelection
          onOddSelected={() => onOddSelected({pick: { name: showTotal? selection[0] : homeName, num: 1, spread: showSpread? selection[0] : null, total: showTotal? total : null }, odd: odd[0], type })}
          large={!odd[2]}
          selection={selection? selection[0] : 1}
          odd={odd[0]}/>
        { odd[2] && <OddSelection onOddSelected={() => onOddSelected({pick: { name: "Nulle", num: 0 }, odd: odd[2], type })} selection={"Nulle"} odd={odd[2]}/>}
        <OddSelection
          onOddSelected={() => onOddSelected({pick: { name: showTotal? selection[1] : awayName, num: 2, spread: showSpread? selection[1] : null, total: showTotal? total : null }, odd: odd[1], type })}
          large={!odd[2]}
          selection={selection? selection[1] : 2}
          odd={odd[1]}/>
      </View> }
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: moderateScale(2)
  },
  textSection: {
    backgroundColor: "#1A255C",
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(20),
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center"
  },
  textTitle: {
    color: "#fff",
    fontSize: moderateScale(14),
    fontFamily: "OpenSans"
  },
  betSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(5)
  }
});

export default BetSelectionSingle;
