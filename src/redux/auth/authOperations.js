import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

const token = {
  set(tok) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${tok}`;
  },
  reset() {
    axios.defaults.headers.common['Authorization'] = '';
  },
};

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/users/signup`, userData);
      console.log('data', data);
      token.set(data.token);
      return data;
    } catch (error) {
      console.log('error', error);
      return rejectWithValue(error.message);
    }
  },
);

export const loginUser = createAsyncThunk('auth/login', async (userData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`/users/login`, userData);
    console.log('data', data);
    data && data.token && token.set(data.token);
    return data;
  } catch (error) {
    console.log('error', error);
    return rejectWithValue(error.message);
  }
});

export const logoutUser = createAsyncThunk('auth/logout', async (userData, { rejectWithValue }) => {
  try {
    await axios.post(`/users/logout`, userData);
    token.reset();
  } catch (error) {
    console.log('error', error);
    return rejectWithValue(error.message);
  }
});

export const currentUser = createAsyncThunk(
  'auth/current',
  async (__, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const persistToken = state.auth.token;
      if (!persistToken) {
        console.log('error persistToken');
        return rejectWithValue('error');
      }
      token.set(persistToken);
      const { data } = await axios.get(`/users/current`);
      console.log('data', data);
      return data;
    } catch (error) {
      console.log('error', error);
      return rejectWithValue(error.message);
    }
  },
);
