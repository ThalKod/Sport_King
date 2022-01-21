import {Image} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import HomeImage from '../assets/new_menu_home_active.png';
import MatchImage from '../assets/new_menu_matches_active.png';
import PariImage from '../assets/new_menu_bets_active.png';
import KlasmanImage from '../assets/new_menu_leaderboard_active.png';
import HomeScreen from '../screens/HomeScreen';
import BetScreen from '../screens/BetScreen';
import LeadersBoardScreen from '../screens/LeadersBoard';
import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import { MatchScreen } from "./index";

const Tab = createMaterialBottomTabNavigator();


export const Home = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Acceuil') {
            return <Image style={{ height: moderateScale(25), width: moderateScale(25), resizeMode: "contain" }} source={HomeImage}/>
          } else if (route.name === 'Matchs') {
            return <Image style={{ height: moderateScale(25), width: moderateScale(25), resizeMode: "contain" }} source={MatchImage}/>
          } else if (route.name === "Paris"){
            return <Image style={{ height: moderateScale(25), width: moderateScale(25), resizeMode: "contain" }} source={PariImage}/>
          } else if (route.name === "Classement"){
            return <Image style={{ height: moderateScale(25), width: moderateScale(25), resizeMode: "contain" }} source={KlasmanImage}/>
          }
        },
      })}
      activeColor="white"
      barStyle={{ backgroundColor: '#1C0C4F' }}
      sceneAnimationEnabled={false}
    >
      <Tab.Screen name="Acceuil" component={HomeScreen} options={{ tabBarLabel: 'Acceuil' }}/>
      <Tab.Screen name="Matchs" component={MatchScreen} options={{ tabBarLabel: 'Matchs' }} />
      <Tab.Screen name="Paris" component={BetScreen} options={{ tabBarLabel: 'Paris' }} />
      <Tab.Screen name="Classement" component={LeadersBoardScreen} options={{ tabBarLabel: 'Classement' }} />
    </Tab.Navigator>
  )
};
