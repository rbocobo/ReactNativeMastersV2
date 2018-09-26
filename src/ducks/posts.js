import { combineReducers } from 'redux';
import { firebaseStateReducer, firestoreReducer } from 'react-redux-firebase';
import mockpostsReducer from './mockposts';

export default combineReducers({
    firebase: firebaseStateReducer, 
    firestore: firestoreReducer,
    mockposts: mockpostsReducer
})