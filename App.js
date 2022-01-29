import React from 'react';
import type {Node} from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import config from './config';
import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5';
import store from "./src/redux/store";
import {  Provider } from "react-redux";
import { moderateScale } from "react-native-size-matters";
import { rootDrawerNavigator } from "./src/routes";
import CustomDrawerContent from "./src/components/CustomDrawerContent";

const client = new ApolloClient({
  uri: config.API_HOST,
  cache: new InMemoryCache()
});

const Drawer = createDrawerNavigator();

const App: () => Node = () => {

  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <NavigationContainer>
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
        </NavigationContainer>
      </ApolloProvider>
    </Provider>
  );
};


export default App;
