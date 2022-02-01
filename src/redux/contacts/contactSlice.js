import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// axios.defaults.baseURL = 'https://connections-api.herokuapp.com';
// id: "61f6fbe76b9f45001537ddf2"
// ​​name: "axios defaults"
// ​​number: "111-44-55"
// axios.defaults.headers.common['Authorization'] = `Bearer ${tok}`;

function showError(error) {
  if (error.response) {
    switch (error.response.status) {
      case 400:
        alert('Contact create/update error.');
        break;
      case 401:
        alert('There is no title with authorization token.');
        break;
      case 404:
        alert('The collections of this owner do not exist.');
        break;
      case 500:
        alert('Server error');
        break;
      default:
        break;
    }
  } else {
    alert('Error', error.message);
  }
}

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/contacts`).catch(showError);
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
      await axios.delete(`/contacts/${userData.id}`).catch(showError);

      dispatch(deleteContact(userData.id));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const editContacts = createAsyncThunk(
  'contacts/editContacts',
  async (userData, { rejectWithValue, dispatch }) => {
    const data = { name: userData.name, number: userData.number };
    try {
      const dataPatched = await axios.patch(`/contacts/${userData.id}`, data).catch(showError);

      dispatch(
        editContact({
          id: dataPatched.data.id,
          name: dataPatched.data.name,
          number: dataPatched.data.number,
        }),
      );
      return dataPatched.data;
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

      const { data } = await axios.post(`/contacts`, contact).catch(function (error) {
        if (error.response) {
          switch (error.response.status) {
            case 400:
              alert('Create accaount error');
              break;
            case 401:
              alert('There is no title with authorization token.');
              break;
            default:
              break;
          }
        } else {
          alert('Error', error.message);
        }
      });
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
      state.items = state.items.map(contact => {
        if (contact.id === action.payload.id) {
          contact.name = action.payload.name;
          contact.number = action.payload.number;
        }
        return contact;
      });
      state.error = null;
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
    [editContacts.fulfilled]: (state, action) => {
      state.status = 'resolved';
    },
    [editContacts.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
  },
});

export const { addContact, deleteContact, changeFilter, editContact } = contactsSlice.actions;

export default contactsSlice.reducer;
