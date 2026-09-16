import { useCallback } from 'react';
import { useAppDispatch } from '@/shared/hooks/use-app-dispatch';
import { useAppSelector } from '@/shared/hooks/use-app-selector';
import type { Credentials } from '../api/auth-api';
import { clearError } from '../redux/slice';
import {
  selectAuthError,
  selectIsAuthenticated,
  selectIsAuthLoading,
  selectIsSessionChecked,
} from '../redux/selectors';
import { login, logout, register } from '../redux/thunks';

/**
 * Facade over the auth slice so components never import thunks or selectors
 * directly. Action helpers resolve to `true` on success.
 */
export const useAuth = () => {
  const dispatch = useAppDispatch();

  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isSessionChecked = useAppSelector(selectIsSessionChecked);
  const isLoading = useAppSelector(selectIsAuthLoading);
  const error = useAppSelector(selectAuthError);

  const signIn = useCallback(
    async (credentials: Credentials) =>
      login.fulfilled.match(await dispatch(login(credentials))),
    [dispatch],
  );

  const signUp = useCallback(
    async (credentials: Credentials) =>
      register.fulfilled.match(await dispatch(register(credentials))),
    [dispatch],
  );

  const signOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const dismissError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    isAuthenticated,
    isSessionChecked,
    isLoading,
    error,
    signIn,
    signUp,
    signOut,
    dismissError,
  };
};
