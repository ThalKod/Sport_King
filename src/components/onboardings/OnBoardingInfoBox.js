import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';


const OnBoardingInfoBox = ({slideNumber})=>{

  const text1 = () => {
    return (
      <View>
        <Text style={styles.headerText}> Gratuit!</Text>
        <Text style={styles.text}>Avec Sport<Text style={{ color: "#FDE88E"}}>King</Text> plus besoin d'argent, {"\n"} placer gratuitement des paris sportifs avec vos monnaies virtuels!</Text>
      </View>
    )
  };

  const text2 = () => {
    return (
      <View>
        <Text style={styles.headerText}>Prouve que t'es le <Text style={{ color: "#FDE88E"}}>King</Text>!</Text>
        <Text style={styles.text}>Chaque jour, mise sur tes matchs préférer, rivalise avec les autres joueurs et défends ta position dans le classement !</Text>
      </View>
    )
  };

  const text3 = () => {
    return (
      <View>
        <Text style={styles.headerText}>24/7</Text>
        <Text style={styles.text}>Plus de <Text style={{ color: "#FDE88E"}}>25</Text> sports differents {"\n\n"}Les plus grandes leagues <Text style={{ color: "#FDE88E"}}>en direct</Text> Et des sports virtuels, {"\n\n"} Du <Text style={{ color: "#FDE88E"}}>Fun</Text> 24/7!</Text>
      </View>
    )
  };

  const renderCorrectText = () => {
    console.log("slide number ",slideNumber);
    switch (slideNumber) {
      case 0:
        return text1();

      case 1:
        return text2();

      case 2:
        return text3();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
      </View>
      {renderCorrectText()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: moderateScale(200),
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: moderateScale(15),
    paddingHorizontal: moderateScale(10)
  },
  overlay: {
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
    position: "absolute",
    backgroundColor: 'black',
    borderRadius: 5,
    opacity: 0.3
  },
  headerText: {
    alignSelf: "center",
    fontFamily: "GROBOLD",
    color: "#fff",
    fontSize: moderateScale(18),
    marginBottom: moderateScale(10)
  },
  text: {
    textAlign: 'center',
    alignSelf: "center",
    fontFamily: "GROBOLD",
    color: "#fff",
    fontSize: moderateScale(17.5)
  }
});

export default OnBoardingInfoBox;
