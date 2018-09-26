import React, { Component } from 'react';
import { StyleSheet, Animated, Easing, YellowBox } from 'react-native';
import FlatListScreen from './src/components/FlatListScreen';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import ItemDetailScreen from './src/components/ItemDetailScreen';
import { fromLeft } from 'react-navigation-transitions'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider, connect } from 'react-redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import thunk from 'redux-thunk';
import reducer from './src/ducks/reducer';
import rootReducer from './src/ducks/posts';

//firebase/firestore
import { reactReduxFirebase, firebaseStateReducer } from 'react-redux-firebase';
import firebase from 'firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
import 'firebase/firestore';
import 'firebase/functions';


import RocketScreen from './src/components/RocketScreen'
import CameraScreen from './src/components/CameraScreen';
import GalleryScreen from './src/components/GalleryScreen';
import AlbumsScreen from './src/components/AlbumsScreen';

/** Notifications */
import { NotificationsAndroid, PendingNotifications } from 'react-native-notifications';

let mainScreen;

onPushRegistered = () => {
  if(mainScreen){
    mainScreen.onPushRegistered();
  }
}

onNotificationOpened = (notification) => {
  if(mainScreen) {
    mainScreen.onNotificationOpened(notification);
  }
}

onNotificationReceived = (notification) => {
  if(mainScreen){
    mainScreen.onNotificationReceived(notification);
  }
}
NotificationsAndroid.setRegistrationTokenUpdateListener(onPushRegistered);
NotificationsAndroid.setNotificationOpenedListener(onNotificationOpened);
NotificationsAndroid.setNotificationReceivedListener(onNotificationReceived);


/** */
const firebaseConfig = {
  apiKey: 'AIzaSyAr7oiaV1oCYknw9VtOR5-Hcmbf5lDeRdg',
  databaseURL: 'https://mmreactnative.firebaseio.com',
  storageBucket: 'mmreactnative.appspot.com',
  projectId: 'mmreactnative'
}

firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ timestampsInSnapshots: true })
// react-redux-firebase options
const rrfConfig = {
  userProfile: 'users'
}

//Add redux Firebase to compose
const createStoreWithFirebase = compose(
  reduxFirestore(firebase),
  reactReduxFirebase(firebase, rrfConfig)
)(createStore)

// Add firebase and firestore to reducers
// const rootReducer = combineReducers({
//   firebase: firebaseStateReducer,
//   firestore: firestoreReducer
// })

// Create store with reducers and initial state
const initialState = {}
const store = createStoreWithFirebase(rootReducer, initialState)

// const client = axios.create({
//   baseURL: 'https://launchlibrary.net/1.4',
//   responseType: 'json'
// });

// const store = createStore(
//   reducer, 
//   applyMiddleware(
//     axiosMiddleware(client), 
//     thunk)
//   );

export default class App extends Component {

  constructor(props){
    super(props);
    mainScreen = this;
  }

  render() {
    return (
      <Provider store={store}>
        <RootStack/>
      </Provider>
    );
  }
}

YellowBox.ignoreWarnings(["Warning:", 'Setting a timer']);

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
  },
  Album: {
    screen: AlbumsScreen,
    navigationOptions: {
      headerMode: 'none'
    }
  },
  // Camera: {
  //   screen: CameraScreen,
  //   navigationOptions: {
  //     headerMode: 'none'
  //   }
  // },

  Images: {
    screen: createBottomTabNavigator({
      Camera: {
        screen: CameraScreen,
        navigationOptions: {
          headerMode: 'none'
        }
      },
      Gallery: {
        screen: GalleryScreen
      }
    },{
      initialRouteName: 'Camera',
      headerMode: 'none'
    })
  }

}, {
  initialRouteName: 'Album',
  transitionConfig: () => fromLeft(),
  headerMode: "none"
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
