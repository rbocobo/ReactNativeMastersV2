import { combineReducers } from 'redux';
import { firebaseStateReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import mockpostsReducer from './mockposts';

export default combineReducers({
    firebase: firebaseStateReducer, 
    firestore: firestoreReducer,
    mockposts: mockpostsReducer
})