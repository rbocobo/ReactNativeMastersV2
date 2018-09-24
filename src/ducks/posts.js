import { combineReducers } from 'redux';
import { firebaseStateReducer, firestoreReducer } from 'react-redux-firebase';

export default combineReducers({
    firebase: firebaseStateReducer, 
    firestore: firestoreReducer
})