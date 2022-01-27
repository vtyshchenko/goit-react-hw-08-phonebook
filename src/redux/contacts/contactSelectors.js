import { createSelector } from 'reselect';

export const getAContacts = state => state.contacts.items;
export const getFilterText = state => state.contacts.filterText.toLowerCase();

export const getFilteredContacts = createSelector([getAContacts, getFilterText], (contacts, text) =>
  contacts.filter(item => item.name.toLowerCase().includes(text)),
);
