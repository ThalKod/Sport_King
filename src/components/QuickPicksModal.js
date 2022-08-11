import React, {useState} from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button, ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {moderateScale} from 'react-native-size-matters';
import numeral from "numeral";
import {useMutation} from '@apollo/client';
import { MAKE_BET } from '../graph-operations';
import { gameType, betType } from "../config"
import {useDispatch, useSelector} from 'react-redux';
import { truncate } from "../utils";
import { initUser } from '../redux/features/userSlice';
import analytics from "@react-native-firebase/analytics";


const QuickPicksModal = ({ isVisible, close, info }) => {

  const [inputValue, onInputValueChange] = useState();
  const [error, setError] = useState("");
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  console.log(info);

  const [makeBet, { loading }] = useMutation(MAKE_BET, {
    onCompleted(data){
      console.log("Data : ", data);
      close(true);
      const coins = (user.coins - parseFloat(inputValue)).toFixed(2);
      console.log("coins", coins);
      dispatch(initUser({ jsWebToken: user.jsWebToken, coins: coins }));
    },
    onError(error){
      console.log("Error ", error);
    }
  });

  const handleDelete = async () => {
    onInputValueChange("");
    await analytics().logEvent('click_on_reset_bet_input');
  };

  const onChangeText = (text) => {
    onInputValueChange(text.replace(/[^0-9]/g, ''));
    console.log(parseFloat(text), user.coins);
    if(parseFloat(text) > user.coins){
      return setError("Balance insuffisant");
    }
    setError("");
  };

  const handleMakeBet = async () => {
    makeBet({
      variables: {
        jsWebToken: user.jsWebToken,
        bid: parseInt(inputValue),
        gameId: info.matchId,
        odd: parseFloat(info.odd),
        gameType: gameType(info.sport),
        pick: info.pick.num,
        betType: betType(info.type),
        teams: `${info.homeName} - ${info.awayName}`,
        pickName: `${info.pick.name}`,
        spread: parseFloat(info.pick.spread),
        total: parseFloat(info.pick.total)
      }
    })
    await analytics().logEvent('click_on_make_bet', {
      gameId: info.matchId,
      total: parseFloat(info.pick.total),
    });

  };

  return (
    <View>
      <Modal
        isVisible={true}
        onSwipeComplete={close}
        swipeDirection={['up', 'left', 'right', 'down']}
        style={styles.modalContainer}>
        <View style={styles.container}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTextTitle}>Placer un Paris</Text>
            <TouchableOpacity
              onPress={() => close(false)}
              hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
              style={{ position: "absolute", right: moderateScale(10)}}>
              <AntDesign name="closecircle" size={20} color="#B3B3B6" />
            </TouchableOpacity>
          </View>
          <View style={styles.modalContent}>
            <View>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                <View>
                  <Text style={styles.versusText}>{`${truncate(info.homeName + " - " + info.awayName, moderateScale(45))}`}</Text>
                  <Text style={styles.betCategoryText}>{`${info.type}: ${info.pick.name} ${info.pick.spread? `(${info.pick.spread})` : ""}`}</Text>
                </View>
                <Text style={styles.oddText}>{info.odd}</Text>
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.inputStyle}
                  value={inputValue}
                  onChangeText={onChangeText}
                  textAlign={"right"}
                  placeholder={"0"}
                  placeholderTextColor={"white"}
                  keyboardType='numeric'
                  autoFocus
                />
              </View>
              { error? <Text style={styles.errorText}>{error}</Text> : null }
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                <TouchableOpacity onPress={handleDelete} style={{ flexDirection: "row", alignItems: "center", fontSize: moderateScale(16)}}>
                  <Text style={{ color: "#fff", marginRight: moderateScale(5)}}>Effacer</Text>
                  <AntDesign name="close" size={moderateScale(16)} color={"#fff"} />
                </TouchableOpacity>
                <View>
                  <Text style={{ opacity: 0.7, color: "#fff", textDecorationLine: 'underline' }}>Gains Potentiels:  {numeral(inputValue * info.odd).format("0,0[.]00 $")}</Text>
                </View>
              </View>
              <TouchableOpacity disabled={loading || error} onPress={handleMakeBet} style={styles.placeBetButton}>
                { loading && <ActivityIndicator size="large" color="#fff"/> }
                { !loading && <Text style={{ fontFamily: "OpenSans-Bold", color: "#fff", fontSize: moderateScale(16)}}>Confirmer</Text> }
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: "center",
    borderRadius: 5,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    width: "95%"
  },
  versusText: {
    color: "#fff",
    fontSize: moderateScale(14),
    marginTop: moderateScale(15)
  },
  betCategoryText: {
    color: "#fff",
    opacity: 0.8
  },
  oddText: {
    color: "#0BD664",
    fontFamily: "OpenSans-Bold"
  },
  modalContent: {
    backgroundColor: "#140A35",
    padding: moderateScale(5),
    paddingHorizontal: moderateScale(10),
    width: "100%"
  },
  modalContainer: {
    justifyContent: 'center', // "flex-end"
    margin: 0,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: moderateScale(5),
    backgroundColor: "#1A255C"
  },
  modalTextTitle: {
    fontFamily: "OpenSans-Bold",
    fontSize: moderateScale(16),
    color: "#fff"
  },
  inputContainer: {
    width: "100%",
    height: moderateScale(35),
    backgroundColor: "#1A255C",
    borderRadius: moderateScale(15),
    marginVertical: moderateScale(15),
    paddingHorizontal: moderateScale(10)
  },
  inputStyle: {
    flex: 1,
    fontFamily: "OpenSans",
    fontSize: moderateScale(14),
    textAlign: "right",
    color: "#fff"
  },
  placeBetButton: {
    width: "100%",
    height: moderateScale(35),
    backgroundColor: "#0BD664",
    borderRadius: moderateScale(15),
    marginVertical: moderateScale(15),
    paddingHorizontal: moderateScale(10),
    alignItems: "center",
    justifyContent: "center"
  },
  errorText: {
    color: "red",
    fontSize: moderateScale(14),
  }
});

export default QuickPicksModal;
