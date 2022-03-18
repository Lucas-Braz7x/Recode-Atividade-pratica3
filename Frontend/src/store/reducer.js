import { ticketReducer } from './reducers/ticketReducer';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers(
  {
    ticketState: ticketReducer
  }
);
