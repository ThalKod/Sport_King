import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
    TextInput
} from "react-native";
import { moderateScale } from 'react-native-size-matters';

const CustomTextInput  = ({ icon, placeHolder, password, value, onValueChange }) => {
  return (
     <View style={styles.container}>
       {icon}
       <TextInput
           style={styles.inputStyle}
           autoCorrect={false}
           defaultValue={value}
           onChangeText={text => onValueChange(text)}
           secureTextEntry={password}
           placeholder={placeHolder}
       />
     </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: moderateScale(50),
    padding: moderateScale(5),
    flexDirection: 'row',
    backgroundColor: "#fff",
    alignItems: "center",
    marginVertical: moderateScale(5),
    borderRadius: moderateScale(5)
  },
  inputStyle: {
    flex: 1,
    fontFamily: "OpenSans",
    fontSize: moderateScale(16)
  },
  text: {
    fontFamily: "OpenSans-Bold",
    fontSize: moderateScale(16),
    marginRight: moderateScale(10),
    marginLeft: moderateScale(10)
  }
});

export default CustomTextInput;
