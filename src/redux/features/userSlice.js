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
    invite_code: ""
  },
  reducers: {
    initUser:  (state, action) => {
      // await AsyncStorage.setItem("jsWebToken", action.payload.jsWebToken)
      console.log(action.payload)
      state.initialState = {...state.initialState, ...action.payload};
    },
    addCoins: (state, action) => {
      state.coins = state.coins + action.payload.coins
    }
  }
});

export const { initUser, addCoins } =userSlice.actions;

export default userSlice.reducer;
