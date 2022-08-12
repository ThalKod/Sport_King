import React, { useEffect, useState } from "react";
import type {Node} from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import config from './config';
import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5';
import store from "./src/redux/store";
import { Provider, useDispatch } from "react-redux";
import { moderateScale } from "react-native-size-matters";
import { rootDrawerNavigator } from "./src/routes";
import CustomDrawerContent from "./src/components/CustomDrawerContent";
import OnBoardingScreens from "./src/screens/Onboardings";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initUser } from "./src/redux/features/userSlice";
import { ActivityIndicator, View, Platform } from "react-native";
import { ANDROID_API_HOST, IOS_API_HOST } from "@env";
import analytics from '@react-native-firebase/analytics';
import mobileAds from 'react-native-google-mobile-ads';

console.log("==================", IOS_API_HOST, ANDROID_API_HOST)

const client = new ApolloClient({
  uri: Platform.OS === "ios" ? IOS_API_HOST : ANDROID_API_HOST,
  cache: new InMemoryCache()
});

console.log("2", IOS_API_HOST, ANDROID_API_HOST)


mobileAds()
  .initialize()
  .then(adapterStatuses => console.log("Admob initialized", adapterStatuses));

const Drawer = createDrawerNavigator();

function DrawerMain() {
  return (
    <Drawer.Navigator
      initialRouteName="SportKing"
      drawerContent={(props) => ( <CustomDrawerContent {...props} />)}
      drawerStyle={{
        backgroundColor: '#261D44',
      }}
      drawerContentOptions={{
        inactiveTintColor: '#fff',
      }}
    >
      <Drawer.Screen
        name="SportKing"
        component={rootDrawerNavigator}
        options={{
          drawerIcon: ({focused, size}) => (
            <FontAwesome5Icons name="dice" size={moderateScale(14)} color="#fff" />
          )
        }}
      />
    </Drawer.Navigator>
  )
}

const App: () => Node = () => {

  const routeNameRef = React.useRef();
  const navigationRef = React.useRef();

  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <NavigationContainer
          ref={navigationRef}
          onReady={() => {
            routeNameRef.current = navigationRef.current.getCurrentRoute().name;
          }}
          onStateChange={async () => {
            const previousRouteName = routeNameRef.current;
            const currentRouteName = navigationRef.current.getCurrentRoute().name;

            if (previousRouteName !== currentRouteName) {
              await analytics().logScreenView({
                screen_name: currentRouteName,
                screen_class: currentRouteName,
              });
            }
            routeNameRef.current = currentRouteName;
          }}
        >
          <Drawer.Navigator
            initialRouteName="SportKing"
            screenOptions={{
              gestureEnabled: false,
              swipeEnabled: false,
            }}
            drawerContent={(props) => ( <CustomDrawerContent {...props} />)}
            drawerStyle={{
              backgroundColor: '#261D44',
            }}
            drawerContentOptions={{
              inactiveTintColor: '#fff',
            }}
          >
            <Drawer.Screen
              name="SportKing"
              component={rootDrawerNavigator}
              options={{
                drawerIcon: ({focused, size}) => (
                  <FontAwesome5Icons name="dice" size={moderateScale(14)} color="#fff" />
                ),
                headerShown: false
              }}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </ApolloProvider>
    </Provider>
  );
};


export default App;
