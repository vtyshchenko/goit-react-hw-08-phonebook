import { createSlice } from '@reduxjs/toolkit';
import { registerUser, loginUser, logoutUser } from './authOperations';

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [registerUser.fulfilled](state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.error = null;
    },
    [registerUser.rejected](state, action) {
      state.user = initialState.user;
      state.token = initialState.token;
      state.isLoggedIn = false;
      state.error = action.payload;
    },
    [loginUser.fulfilled](state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.error = null;
    },
    [loginUser.rejected](state, action) {
      state.user = initialState.user;
      state.token = initialState.token;
      state.isLoggedIn = false;
      state.error = action.payload;
    },
    [logoutUser.fulfilled](state, action) {
      state.user = initialState.user;
      state.token = initialState.token;
      state.isLoggedIn = initialState.isLoggedIn;
      state.error = null;
    },
  },
});
export default authSlice.reducer;
