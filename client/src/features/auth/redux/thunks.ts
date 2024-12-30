import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const register = createAsyncThunk(
  'auth/register',
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/auth/register', data);
      localStorage.setItem('token', response.data.token);

      return {
        token: response.data.token as string,
      };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Registration failed.',
      );
    }
  },
);

export const login = createAsyncThunk(
  'auth/login',
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/auth/login', data);
      localStorage.setItem('token', response.data.token);

      return {
        token: response.data.token as string,
      };
    } catch (error: any) {
      localStorage.removeItem('token');
      return rejectWithValue(error.response?.data?.message || 'Login failed.');
    }
  },
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      localStorage.removeItem('token');
      return 'Logout successful.';
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Logout failed.');
    }
  },
);

export const validateToken = createAsyncThunk(
  'auth/validateToken',
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('token');

    if (!token) {
      return rejectWithValue('No token found.');
    }

    try {
      const response = await axios.post<{ token: string }>(
        '/api/auth/validate-token',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      localStorage.setItem('token', response.data.token); // Перезаписываем продленый токен
      return { token: response.data.token };
    } catch (error: any) {
      localStorage.removeItem('token'); // Удаляем недействительный токен
      return rejectWithValue(
        error.response?.data?.message || 'Token validation failed.',
      );
    }
  },
);
