import { configureStore, combineReducers } from '@reduxjs/toolkit';
import contactsReducer from './contacts/contactSlice';
import authReducer from './auth/authSlice';

const rootReducer = combineReducers({
  contacts: contactsReducer,
  auth: authReducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV === 'development',
});

export default store;
