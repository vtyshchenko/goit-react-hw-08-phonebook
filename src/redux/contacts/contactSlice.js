import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

// axios.defaults.headers.common['Authorization'] = `Bearer ${tok}`;
export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/contacts`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteContacts = createAsyncThunk(
  'contacts/deleteContacts',
  async (userData, { rejectWithValue, dispatch }) => {
    try {
      await axios.delete(`/contacts/${userData.id}`);

      dispatch(deleteContact(userData.id));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const editContacts = createAsyncThunk(
  'contacts/editContacts',
  async (userData, { rejectWithValue, dispatch }) => {
    try {
      await axios.patch(`/contacts/${userData.id}`, userData);

      dispatch(editContact(userData));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const addNewContact = createAsyncThunk(
  'contacts/addNewContact',
  async ({ name, number }, { rejectWithValue, dispatch }) => {
    let { data: contactData } = await axios.get(`/contacts`);

    if (contactData.length > 0) {
      const filteredContacts = contactData.filter(contactItem => {
        return (
          contactItem.name.toLowerCase() === name.toLowerCase() || contactItem.number === number
        );
      });

      if (filteredContacts.length > 0) {
        alert(`Contact with name '${name}' or '${number}' is alredy in contacts`);
        return;
      }
    }

    try {
      const contact = {
        name,
        number,
      };

      const { data } = await axios.post(`/contacts`, contact);
      dispatch(addContact({ id: data.id, name, number }));
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const setError = (state, action) => {
  state.status = 'rejected';
  state.error = action.payload;
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    filterText: '',
    status: null,
    error: null,
  },
  reducers: {
    addContact(state, action) {
      state.items.push({
        id: action.payload.id,
        name: action.payload.name,
        number: action.payload.number,
      });
    },
    deleteContact(state, action) {
      state.items = state.items.filter(contactItem => {
        return contactItem.id !== action.payload;
      });
    },
    editContact(state, action) {
      state.items = state.items.filter(contactItem => {
        return contactItem.id === action.payload.id;
      });
      state.items.name = action.payload.name;
      state.items.number = action.payload.number;
    },
    changeFilter(state, action) {
      state.filterText = action.payload.filterText;
    },
  },
  extraReducers: {
    [fetchContacts.pending]: state => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchContacts.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.items = action.payload;
    },
    [fetchContacts.rejected]: setError,
    [deleteContacts.pending]: state => {
      state.error = null;
    },
    [deleteContacts.rejected]: setError,
  },
});

export const { addContact, deleteContact, changeFilter, editContact } = contactsSlice.actions;

export default contactsSlice.reducer;
