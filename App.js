import React from 'react';
import type {Node} from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import config from './config';

const client = new ApolloClient({
  uri: config.API_HOST,
  cache: new InMemoryCache()
});

const App: () => Node = () => {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Paryaj Sport"
          drawerContent={(props) => ( <CustomDrawerContent {...props} />)}
          drawerStyle={{
            backgroundColor: '#261D44',
          }}
          drawerContentOptions={{
            inactiveTintColor: '#fff',
          }}
        >
          <Drawer.Screen
            name="Paryaj Sport"
            component={rootDrawerNavigator}
            options={{
              drawerIcon: ({focused, size}) => (
                <FontAwesome5Icons name="dice" size={moderateScale(14)} color="#fff" />
              )
            }}
          />
          {/* <Drawer.Screen
                  name="Rezilta Live"
                  component={liveScoreDrawerNavigation}
                  options={{
                    drawerIcon: ({focused, size}) => (
                        <AntDesignIcons name="videocamera" size={moderateScale(18)} color="#fff" />
                    )
                  }}
              /> */}
          <Drawer.Screen
            name="Live Sports"
            component={liveTvDrawerNavigation}
            options={{
              drawerIcon: ({focused, size}) => (
                <MaterialIcons name="live-tv" size={moderateScale(18)} color="#fff" />
              )
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
};


export default App;
