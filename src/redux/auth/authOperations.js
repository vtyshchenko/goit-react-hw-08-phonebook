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
      token.set(data.token);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const loginUser = createAsyncThunk('auth/login', async (userData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`/users/login`, userData);
    token.set(data.token);
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const logoutUser = createAsyncThunk('auth/logout', async (userData, { rejectWithValue }) => {
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
