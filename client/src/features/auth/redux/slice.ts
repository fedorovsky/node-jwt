import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { login, logout, register, validateToken } from './thunks';

export interface AuthState {
  /** True once the stored token has been checked, whatever the outcome. */
  isSessionChecked: boolean;
  isAuthenticated: boolean;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isSessionChecked: false,
  isAuthenticated: false,
  token: null,
  isLoading: false,
  error: null,
};

const signIn = (state: AuthState, token: string) => {
  state.isAuthenticated = true;
  state.token = token;
  state.error = null;
};

const signOut = (state: AuthState, error: string | null = null) => {
  state.isAuthenticated = false;
  state.token = null;
  state.error = error;
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(register.fulfilled, (state, { payload }) =>
        signIn(state, payload),
      )
      .addCase(login.fulfilled, (state, { payload }) => signIn(state, payload))
      .addCase(login.rejected, (state, { payload }) => signOut(state, payload))
      .addCase(logout.fulfilled, state => signOut(state))
      .addCase(validateToken.fulfilled, (state, { payload }) => {
        signIn(state, payload);
        state.isSessionChecked = true;
      })
      .addCase(validateToken.rejected, (state, { payload }) => {
        // A missing token is the normal signed-out state, not an error to show.
        signOut(state, payload === 'No stored session.' ? null : payload);
        state.isSessionChecked = true;
      })
      .addMatcher(
        isAnyOf(
          register.pending,
          login.pending,
          logout.pending,
          validateToken.pending,
        ),
        state => {
          state.isLoading = true;
          state.error = null;
        },
      )
      .addMatcher(
        isAnyOf(
          register.fulfilled,
          register.rejected,
          login.fulfilled,
          login.rejected,
          logout.fulfilled,
          logout.rejected,
          validateToken.fulfilled,
          validateToken.rejected,
        ),
        state => {
          state.isLoading = false;
        },
      )
      .addMatcher(
        isAnyOf(register.rejected, logout.rejected),
        (state, { payload, error }) => {
          state.error =
            typeof payload === 'string' ? payload : (error.message ?? null);
        },
      );
  },
});

export const { name, reducer } = authSlice;
export const { clearError } = authSlice.actions;
