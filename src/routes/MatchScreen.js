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
      initialRouteName={"MatchsStack"}
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
        name="MatchsStack"
        component={EventsScreen}
        options={{title: 'Matchs', headerShown: false}}
      />
      <Stack.Screen name="Leagues" component={LeagueListScreen} />
      <Stack.Screen name="GamesList" component={BetCardListScreen} options={{title: 'Matchs'}} />
    </Stack.Navigator>
  )
};
