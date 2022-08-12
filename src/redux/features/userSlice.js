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
       return {...state, ...action.payload};
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

export const { initUser, addCoins } = userSlice.actions;

export default userSlice.reducer;
