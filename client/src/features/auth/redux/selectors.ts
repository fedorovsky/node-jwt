import { RootState } from '@/app/store';

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;

export const selectLoading = (state: RootState) => state.auth.loading;

export const selectIsAuthChecked = (state: RootState) =>
  state.auth.isAuthChecked;
