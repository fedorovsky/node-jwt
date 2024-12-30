import { useAppSelector } from '@/shared/hooks/use-app-selector.ts';
import * as authModule from '../redux';

export const useAuth = () => {
  const isAuthenticated = useAppSelector(authModule.selectors.isAuthenticated);

  return { isAuthenticated };
};
