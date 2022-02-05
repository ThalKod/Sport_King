import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { moderateScale } from "react-native-size-matters";

const OddSelection = ({ selection, odd, onOddSelected, disabled, large }) => {
  return (
    <TouchableOpacity disabled={disabled} onPress={onOddSelected} style={[styles.container, { backgroundColor: disabled? "#000" : "#2A1474", width: large? "48%" : "32%"}]}>
      <Text style={styles.text}>{selection}</Text>
      <View style={styles.separator}/>
      <Text style={styles.text}>{odd}</Text>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  container: {
    height: moderateScale(25),
    alignItems: "center",
    borderRadius: moderateScale(15),
    width: "32%",
    backgroundColor: "#2A1474",
    flexDirection: "row",
    paddingHorizontal: moderateScale(10),
    justifyContent: "space-between"
  },
  text: {
    color: "#fff"
  },
  separator: {
    position: "absolute",
    height: "100%",
    width: moderateScale(1),
    backgroundColor: "#000000",
    right: moderateScale(45)
  }
});

export default OddSelection;
