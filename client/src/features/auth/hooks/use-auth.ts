import { useSelector } from 'react-redux';
import * as authModule from '../redux';

export const useAuth = () => {
  const isAuthenticated = useSelector(authModule.selectors.isAuthenticated);

  return { isAuthenticated };
};
