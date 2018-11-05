import {
  FETCH_TRANSACTIONS,
  ADD_TRANSACTION,
  DELETE_TRANSACTION,
  UPDATE_TRANSACTION,
} from '../actions/types';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TRANSACTIONS:
      if (action.payload.message) {
        return [...state, action.payload];
      } else {
        return [...state, ...action.payload];
      }
    case ADD_TRANSACTION:
       return [...state, ...action.payload];

    default:
      return state;
  }
}