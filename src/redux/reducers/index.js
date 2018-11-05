import { combineReducers } from 'redux';
import tranxReducer from './tranxReducer';

export default combineReducers({
  transactions: tranxReducer
});