import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://61e9c3d87bc0550017bc646c.mockapi.io/contacts');
      if (!response.ok) {
        throw new Error('Error fetching data from server!');
      }
      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteContacts = createAsyncThunk(
  'contacts/deleteContacts',
  async ({ id }, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(`https://61e9c3d87bc0550017bc646c.mockapi.io/contacts/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error delete data from server!');
      }

      dispatch(deleteContact({ id }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const addNewContact = createAsyncThunk(
  'contacts/addNewContact',
  async ({ name, phone }, { rejectWithValue, dispatch }) => {
    let contactData = await fetch(`https://61e9c3d87bc0550017bc646c.mockapi.io/contacts`);
    contactData = await contactData.json();

    if (contactData.length > 0) {
      const filteredContacts = contactData.filter(contactItem => {
        return contactItem.name.toLowerCase() === name.toLowerCase() || contactItem.phone === phone;
      });
      if (filteredContacts.length > 0) {
        alert(`Contact with name '${name}' or '${phone}' is alredy in contacts`);
      }
    } else {
      try {
        const contact = {
          name,
          phone,
        };

        const response = await fetch(`https://61e9c3d87bc0550017bc646c.mockapi.io/contacts`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(contact),
        });

        if (!response.ok) {
          throw new Error('Error add data from server!');
        }
        const data = await response.json();

        dispatch(addContact({ id: data.id, name, phone }));
      } catch (error) {
        return rejectWithValue(error.message);
      }
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
        phone: action.payload.phone,
      });
    },
    deleteContact(state, action) {
      state.items = state.items.filter(contactItem => {
        return contactItem.id !== action.payload.id;
      });
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

export const { addContact, deleteContact, changeFilter } = contactsSlice.actions;

export default contactsSlice.reducer;
