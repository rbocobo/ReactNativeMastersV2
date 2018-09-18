import React, { Component } from 'react';
import { StyleSheet, Animated, Easing, YellowBox } from 'react-native';
import FlatListScreen from './src/components/FlatListScreen';
import { createStackNavigator } from 'react-navigation';
import ItemDetailScreen from './src/components/ItemDetailScreen';
import { fromLeft } from 'react-navigation-transitions'
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import thunk from 'redux-thunk';
import reducer from './src/ducks/reducer';
//import rockets from './src/ducks/rockets';
//import connectivity from './src/ducks/connectivity';

import RocketScreen from './src/components/RocketScreen'


const client = axios.create({
  baseURL: 'https://launchlibrary.net/1.4',
  responseType: 'json'
});

const store = createStore(
  reducer, 
  applyMiddleware(
    axiosMiddleware(client), 
    thunk)
  );

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RootStack/>
      </Provider>
    );
  }
}

YellowBox.ignoreWarnings(["Warning:"]);

const RootStack = createStackNavigator({
  Home: {
    screen: FlatListScreen,
    navigationOptions: {
      title: "Movie List"
    }
  },
  Details: {
    screen: ItemDetailScreen
  },
  Rocket: {
    screen: RocketScreen,
    navigationOptions: {
      title: "Rockets"
    }
  }
}, {
  initialRouteName: 'Rocket',
  transitionConfig: () => fromLeft()
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
