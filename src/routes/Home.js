import {Image} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import HomeImage from '../assets/new_menu_home_active.png';
import MatchImage from '../assets/new_menu_matches_active.png';
import PariImage from '../assets/new_menu_bets_active.png';
import KlasmanImage from '../assets/new_menu_leaderboard_active.png';
import CupMain   from "../assets/cup_main.png";
import HomeScreen from '../screens/HomeScreen';
import BetScreen from '../screens/BetScreen';
import LeadersBoardScreen from '../screens/LeadersBoard';
import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import { MatchScreen } from "./index";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createMaterialBottomTabNavigator();


export const Home = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Home') {
            return <Image style={{ height: moderateScale(25), width: moderateScale(25), resizeMode: "contain" }} source={HomeImage}/>
          } else if (route.name === 'Games') {
            return <Image style={{ height: moderateScale(25), width: moderateScale(25), resizeMode: "contain" }} source={MatchImage}/>
          } else if (route.name === "Bet"){
            return <Image style={{ height: moderateScale(25), width: moderateScale(25), resizeMode: "contain" }} source={PariImage}/>
          } else if (route.name === "Leaderboards"){
            return <Image style={{ height: moderateScale(25), width: moderateScale(25), resizeMode: "contain" }} source={KlasmanImage}/>
          }else if (route.name === "Profile"){
            return <Image style={{ height: moderateScale(25), width: moderateScale(25), resizeMode: "contain" }} source={CupMain}/>
          }
        },
      })}
      activeColor="white"
      barStyle={{ backgroundColor: '#1C0C4F' }}
      sceneAnimationEnabled={false}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Home' }}/>
      <Tab.Screen name="Games" component={MatchScreen} options={{ tabBarLabel: 'Games' }} />
      <Tab.Screen name="Bet" component={BetScreen} options={{ tabBarLabel: 'Bet' }} />
      <Tab.Screen name="Leaderboards" component={LeadersBoardScreen} options={{ tabBarLabel: 'Leaderboards' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: 'Profile' }} />
    </Tab.Navigator>
  )
};
