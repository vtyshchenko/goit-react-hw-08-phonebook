import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

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

      return data;
      //   switch (response.code) {
      //     case 201:
      //       alert('User was created.');
      //       break;
      //     case 400:
      //       alert('Error user creating.');
      //       break;
      //     case 500:
      //       alert('Server error.');
      //       break;
      //     default:
      //       break;
      //   }
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
    return data;
    // switch (response.code) {
    //   case 200:
    //     alert('User was logined.');
    //     break;
    //   case 400:
    //     alert('login error.');
    //     break;
    //   default:
    //     break;
    // }
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const logout = createAsyncThunk('auth/logout', async (userData, { rejectWithValue }) => {
  // params = Authorization (string) Токен выданный текущему пользователю.

  try {
    const { data } = await axios.post(`/users/logout`, userData);
    return data;

    // switch (response.code) {
    //   case 200:
    //     alert('User logout.');
    //     break;
    //   case 401:
    //     alert('Error absent header wuth tiken.');
    //     break;
    //   case 500:
    //     alert('Server error.');
    //     break;
    //   default:
    //     break;
    // }
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const currentUser = createAsyncThunk(
  'auth/current',

  // userData = Authorization (string) Токен выданный текущему пользователю.
  async (__, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/users/current`);
      return data;

      // switch (response.code) {
      //   case 200:
      //     alert('Ok.');
      //     break;
      //   case 401:
      //     alert('Error absent header wuth tiken.');
      //     break;
      //   default:
      //     break;
      // }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
