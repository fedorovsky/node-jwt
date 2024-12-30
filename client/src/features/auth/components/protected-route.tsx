import * as React from 'react';
import { Navigate } from 'react-router-dom';
import { selectIsAuthenticated } from '../redux/selectors';
import { useAppSelector } from '@/shared/hooks/use-app-selector.ts'; // Импортируйте ваш селектор

interface ProtectedRouteProps extends React.PropsWithChildren {
  redirectTo?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  redirectTo = '/auth/login',
}) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} />;
  }

  return children;
};
