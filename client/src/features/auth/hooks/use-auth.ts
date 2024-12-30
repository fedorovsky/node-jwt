import { useAppSelector } from '@/shared/hooks/use-app-selector.ts';
import { selectIsAuthenticated } from '../redux/selectors';

export const useAuth = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  return { isAuthenticated };
};
