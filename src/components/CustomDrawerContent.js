import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from '@react-navigation/drawer';
import React from "react";
import {
  View,
  StyleSheet,
  Text, Image, TouchableOpacity,
} from 'react-native';
import { moderateScale } from "react-native-size-matters";
import profilePhotos2  from "../assets/example_profile.jpg";
import { useSelector } from 'react-redux';
import AntDesignIcons from "react-native-vector-icons/AntDesign";

const CustomDrawerContent = (props) => {
  const user = useSelector(state => state.user);
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.header}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Image
            style={{
              width: moderateScale(60),
              height: moderateScale(60),
              borderRadius: moderateScale(35),
              overflow: "hidden",
              borderWidth: moderateScale(1.5),
              borderColor: "grey",
            }}
            source={profilePhotos2}  />
          <Text style={styles.headerText}>{user.name? user.name : "User"}</Text>
        </View>
      </View>
      <DrawerItemList {...props}/>
      <View style={styles.separator}/>
      <DrawerItem
        label="Profile"
        onPress={() => props.navigation.navigate("MyProfile")}
        inactiveTintColor={"#fff"}
        activeBackgroundColor={"#140A35"}
        icon={({ focused, color, size }) => <AntDesignIcons name="user" size={moderateScale(18)} color="#fff" />}
      />
      <DrawerItem
        label="Opsyon"
        onPress={() => props.navigation.navigate("Setting")}
        inactiveTintColor={"#fff"}
        activeBackgroundColor={"#140A35"}
        icon={({ focused, color, size }) => <AntDesignIcons name="setting" size={moderateScale(18)} color="#fff" />}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#140A35",
    width: "100%",
    height: moderateScale(125),
    justifyContent: "center",
    alignItems: "center"
  },
  headerText: {
    fontSize: moderateScale(20),
    color: "#fff",
    fontFamily: "OpenSans-Bold",
    marginTop: moderateScale(5)
  },
  separator: {
    width: "100%",
    height: moderateScale(0.5),
    backgroundColor: "grey"
  }
});

export default CustomDrawerContent;
