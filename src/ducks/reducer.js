import { combineReducers } from 'redux';
import rockets from './rockets'
import connectivity from './connectivity'

export default combineReducers({
    rockets,
    connectivity
})