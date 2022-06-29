import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EventsScreen from '../screens/EventsScreen';
import LeagueListScreen from '../screens/LeagueListScreen';
import BetCardListScreen from '../screens/BetCardListScreen';
import React from 'react';
import { moderateScale } from "react-native-size-matters";

export const MatchScreen = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName={"Matchs"}
      screenOptions={{
        headerTitleStyle: {
          color: "#ffffff"
        },
        headerStyle: {
          backgroundColor: "#1C0C4F",
          paddingRight: moderateScale(-200)
        }
      }}
    >
      <Stack.Screen
        name="Matchs"
        component={EventsScreen}
      />
      <Stack.Screen name="Leagues" component={LeagueListScreen} />
      <Stack.Screen name="GamesList" component={BetCardListScreen} />
    </Stack.Navigator>
  )
};
