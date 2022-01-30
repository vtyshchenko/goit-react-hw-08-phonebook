import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';
const token = {
  set(tok) {
    axios.defaults.common.Authorization = `Bearer ${tok}`;
  },
  reset() {
    axios.defaults.common.Authorization = '';
  },
};

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      // userData = {
      //   "name": "Adrian Cross",
      //   "email": "across@mail.com",
      //   "password": "examplepassword"
      // }
      const { data } = await axios.post(`/users/signup`, userData);
      token.set(data.token);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const login = createAsyncThunk('auth/login', async (userData, { rejectWithValue }) => {
  // userData = {
  //   "email": "string",
  //   "password": "string"
  // }
  console.log(userData);
  try {
    const { data } = await axios.post(`/users/login`, userData);
    console.log('data', data);
    token.set(data.token);
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const logout = createAsyncThunk('auth/logout', async (userData, { rejectWithValue }) => {
  try {
    await axios.post(`/users/logout`, userData);
    token.reset();
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const currentUser = createAsyncThunk('auth/current', async (__, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`/users/current`);
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
