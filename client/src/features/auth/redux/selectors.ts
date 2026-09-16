import type { RootState } from '@/app/store';

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectIsSessionChecked = (state: RootState) =>
  state.auth.isSessionChecked;
export const selectIsAuthLoading = (state: RootState) => state.auth.isLoading;
export const selectAuthError = (state: RootState) => state.auth.error;
