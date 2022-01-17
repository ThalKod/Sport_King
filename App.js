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

      </NavigationContainer>
    </ApolloProvider>
  );
};


export default App;
