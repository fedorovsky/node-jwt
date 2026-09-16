import type { PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { ROUTES } from '@/shared/config/routes';
import { useAuth } from '../hooks/use-auth';

interface ProtectedRouteProps extends PropsWithChildren {
  redirectTo?: string;
}

/**
 * Renders children only for an authenticated user. While the stored session
 * is still being verified nothing is decided yet, so a neutral placeholder is
 * shown instead of a premature redirect.
 */
export const ProtectedRoute = ({
  children,
  redirectTo = ROUTES.login,
}: ProtectedRouteProps) => {
  const { isAuthenticated, isSessionChecked } = useAuth();
  const location = useLocation();

  if (!isSessionChecked) {
    return <p className="text-sm text-muted-foreground">Checking session…</p>;
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  return children;
};
