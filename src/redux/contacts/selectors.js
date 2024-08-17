import { createSelector } from 'reselect';

export const selectContacts = (state) => state.contacts.items;
export const selectIsLoading = (state) => state.contacts.isLoading;
export const selectError = (state) => state.contacts.error;
export const selectNameFilter = (state) => state.filter.name;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, filter) => {
    const filterString = typeof filter === 'string' ? filter.toLowerCase() : '';
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterString) ||
      contact.number.toLowerCase().includes(filterString) 
    );
  }
);
