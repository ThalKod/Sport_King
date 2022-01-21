import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EventsScreen from '../screens/EventsScreen';
import LeagueListScreen from '../screens/LeagueListScreen';
import BetCardListScreen from '../screens/BetCardListScreen';
import React from 'react';

export const MatchScreen = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName={"Events"}
    >
      <Stack.Screen
        name="Events"
        component={EventsScreen}
      />
      <Stack.Screen name="Leagues" component={LeagueListScreen} />
      <Stack.Screen name="GamesList" component={BetCardListScreen} />
    </Stack.Navigator>
  )
};
