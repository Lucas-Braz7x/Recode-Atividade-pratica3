import { createStore } from 'redux';
import { rootReducer } from './reducer';

export const Store = createStore(rootReducer);
