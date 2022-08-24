import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from "@react-native-async-storage/async-storage";


export const userSlice = createSlice({
  name: "user",
  initialState: {
    jsWebToken: "",
    id: "",
    name: "",
    coins: 0,
    bet_won: 0,
    bet_lost: 0,
    bet_pending: 0,
    position: 0,
    invite_code: "",
    appReviewLastTime: 0,
    totalBetCount: 0
  },
  reducers: {
    initUser:  (state, action) => {
       return {...state, ...action.payload};
    },
    saveAppReviewTime: (state, action) => {
      return {...state, ...action.payload.appReviewLastTime.toString()};
    },
    increaseTotalBetCount: (state, action) => {
      return {...state, totalBetCount: action.payload.totalBetCount};
    },
    addCoins: (state, action) => {
      console.log({
        ...state,
        coins: state.coins + action.payload.coins
      }, action)
      return {
        ...state,
        coins: state.coins + action.payload.coins
      }
    }
  }
});

export const initUserPersit = (payload) => async (dispatch) => {
  await AsyncStorage.setItem("jsWebToken", payload.jsWebToken);
  dispatch(initUser(payload))
}

export const persistAppReviewLastTime = (payload) => async (dispatch) => {
  console.log("app Review last time =====", payload.appReviewLastTime)
  await AsyncStorage.setItem("appReviewLastTime", payload.appReviewLastTime.toString());
  dispatch(saveAppReviewTime(payload))
}

export const increaseTotalBetCountPersist = (payload) => async (dispatch) => {
  console.log("total bet jump", payload.totalBetCount)
  await AsyncStorage.setItem("totalBetCount", payload.totalBetCount.toString());
  dispatch(increaseTotalBetCount(payload))
}

export const { initUser, addCoins, saveAppReviewTime, increaseTotalBetCount } = userSlice.actions;

export default userSlice.reducer;
