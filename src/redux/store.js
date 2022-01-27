import { configureStore, combineReducers } from '@reduxjs/toolkit';
import contactsReducer from './contacts/contactSlice';

const rootReducer = combineReducers({
  contacts: contactsReducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV === 'development',
});

export default store;
