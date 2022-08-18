import React, {useState} from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {moderateScale} from 'react-native-size-matters';
import { truncate } from "../utils";



const AdsModal = ({ close,text, buttonText, onPress}) => {
  return (
    <View>
      <Modal
        isVisible={true}
        swipeDirection={['up', 'left', 'right', 'down']}
        onSwipeComplete={close}
        style={styles.modalContainer}>
        <View style={styles.container}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTextTitle}>Regarder une pub</Text>
            <TouchableOpacity
              onPress={close}
              hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
              style={{ position: "absolute", right: moderateScale(10)}}>
              <AntDesign name="closecircle" size={20} color="#B3B3B6" />
            </TouchableOpacity>
          </View>
          <View style={styles.modalContent}>
            <View>
              <Text style={styles.versusText}>{text}</Text>
              <TouchableOpacity onPress={onPress} style={styles.placeBetButton}>
                <Text style={{ fontFamily: "OpenSans-Bold", color: "#fff", fontSize: moderateScale(16)}}>{buttonText}</Text>
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

export default AdsModal;
