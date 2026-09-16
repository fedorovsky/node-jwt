import { createAsyncThunk } from '@reduxjs/toolkit';
import { rootApi } from '@/shared/api/root-api';
import { tokenStorage } from '@/shared/lib/token-storage';
import { getErrorMessage } from '@/shared/lib/get-error-message';
import { authApi, type Credentials } from '../api/auth-api';

type ThunkConfig = { rejectValue: string };

/**
 * Every thunk resolves with the token to keep in memory and persists it to
 * storage as a side effect. Signing in resets cached API data so nothing from
 * a previous session leaks through; this is safe there because no protected
 * component is mounted yet. Logout deliberately does not reset the cache:
 * subscribed components would refetch without a token and produce 401s.
 * Entries simply expire once the protected pages unmount.
 */
export const register = createAsyncThunk<string, Credentials, ThunkConfig>(
  'auth/register',
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      const token = await authApi.register(credentials);
      tokenStorage.set(token);
      dispatch(rootApi.util.resetApiState());
      return token;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, 'Registration failed.'));
    }
  },
);

export const login = createAsyncThunk<string, Credentials, ThunkConfig>(
  'auth/login',
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      const token = await authApi.login(credentials);
      tokenStorage.set(token);
      dispatch(rootApi.util.resetApiState());
      return token;
    } catch (error) {
      tokenStorage.clear();
      return rejectWithValue(getErrorMessage(error, 'Login failed.'));
    }
  },
);

export const logout = createAsyncThunk<void, void>('auth/logout', () => {
  tokenStorage.clear();
});

/** Restores the session on app start: verifies the stored token and renews it. */
export const validateToken = createAsyncThunk<string, void, ThunkConfig>(
  'auth/validateToken',
  async (_, { rejectWithValue }) => {
    const token = tokenStorage.get();
    if (!token) return rejectWithValue('No stored session.');

    try {
      const renewed = await authApi.validateToken(token);
      tokenStorage.set(renewed);
      return renewed;
    } catch (error) {
      tokenStorage.clear();
      return rejectWithValue(getErrorMessage(error, 'Session expired.'));
    }
  },
);
