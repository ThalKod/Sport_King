import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';


const OnBoardingInfoBox = ({slideNumber})=>{

  const text1 = () => {
    return (
      <View>
        <Text style={styles.headerText}><Text style={{ color: "#FDE88E"}}>San</Text> Lanjan !</Text>
        <Text style={styles.text}>Avek ParyajKing ou pa bezwen lajan, {"\n"} jis jwe avek coin ou,{"\n"} epi {"\n"} genyen <Text style={{ color: "#FDE88E"}}>prim</Text> chak week ends ! </Text>
      </View>
    )
  };

  const text2 = () => {
    return (
      <View>
        <Text style={styles.headerText}>Vin Prouvew c <Text style={{ color: "#FDE88E"}}>King</Text> lan !</Text>
        <Text style={styles.text}>Chak jou, parye sou nempot match rasanble coin, jwe kont lot moun, {"\n"} rete nan tet clasman an,{"\n"} pou gen chans genyen <Text style={{ color: "#FDE88E"}}>prim</Text> yo…</Text>
      </View>
    )
  };

  const text3 = () => {
    return (
      <View>
        <Text style={styles.headerText}>24/24, 7/7</Text>
        <Text style={styles.text}>Plis pase <Text style={{ color: "#FDE88E"}}>25</Text> diferan sport {"\n"} pou parye !{"\n"}  Tout gro lig yo <Text style={{ color: "#FDE88E"}}>live</Text> ak sport virtuel, {"\n"} ou pap janm manke <Text style={{ color: "#FDE88E"}}>plezi</Text>!</Text>
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
    fontSize: moderateScale(16)
  }
});

export default OnBoardingInfoBox;
