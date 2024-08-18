import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = 'https://connections-api.goit.global/contacts';


const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token; 
    if (token) {
      setAuthHeader(token);
    }
    
    try {
      const response = await axios.get(apiUrl);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (newContact, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;
    if (token) {
      setAuthHeader(token);
    }
    
    try {
      const response = await axios.post(apiUrl, newContact);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;
    if (token) {
      setAuthHeader(token);
    }
    
    try {
      await axios.delete(`${apiUrl}/${contactId}`);
      return contactId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateContact = createAsyncThunk(
  'contacts/updateContact',
  async ({ id, updatedData }, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;
    if (token) {
      setAuthHeader(token);
    }
    
    try {
      const response = await axios.patch(`${apiUrl}/${id}`, updatedData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
