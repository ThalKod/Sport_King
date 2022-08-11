import React from "react";
import {
  View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from "react-native";
import { moderateScale } from 'react-native-size-matters';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const MainButton  = ({ text, arrow, color, textColor, onClick, icon }) => {
  return (
      <TouchableOpacity
          onPress={onClick}
          style={[styles.container, {backgroundColor: color}]}
      >
        <FontAwesome name={icon} size={moderateScale(20)} color={textColor} />
        <Text style={[styles.text, { color: textColor}]}>{text}</Text>
        {arrow && <Image source={arrow}/>}
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: moderateScale(50),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: moderateScale(5),
    borderRadius: moderateScale(50),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.30,

    elevation: 13,
  },
  text: {
    fontFamily: "OpenSans-Bold",
    fontSize: moderateScale(18),
    marginRight: moderateScale(10),
    marginLeft: moderateScale(10)
  }
});

export default MainButton;
