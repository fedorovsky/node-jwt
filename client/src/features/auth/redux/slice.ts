import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { register, login, logout, validateToken } from './thunks';

interface AuthState {
  isAuthenticated: boolean;
  isAuthChecked: boolean;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isAuthChecked: false, // Изначально проверка токена не завершена
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // Register
    builder.addCase(register.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      register.fulfilled,
      (state, action: PayloadAction<{ token: string }>) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
      },
    );
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    // Login
    builder.addCase(login.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      login.fulfilled,
      (state, action: PayloadAction<{ token: string }>) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
      },
    );
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.token = null;
    });
    // Logout
    builder.addCase(logout.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(logout.fulfilled, state => {
      state.loading = false;
      state.isAuthenticated = false;
      state.token = null;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    // Validate Token
    builder.addCase(validateToken.pending, state => {
      state.loading = true;
      state.error = null;
      state.isAuthChecked = false; // Пока токен не проверен
    });
    builder.addCase(
      validateToken.fulfilled,
      (state, action: PayloadAction<{ token: string }>) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.isAuthChecked = true; // Проверка завершена, токен валиден
      },
    );
    builder.addCase(validateToken.rejected, (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.token = null;
      state.error = action.payload as string;
      state.isAuthChecked = true; // Проверка завершена, токен не валиден
    });
  },
});

export const { name, actions, reducer } = authSlice;
