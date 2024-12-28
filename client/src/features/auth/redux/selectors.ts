import { RootState } from '@/app/store';

export const isAuthenticated = (state: RootState) => state.auth.isAuthenticated;
