import * as React from 'react';
import { useAppDispatch } from '@/shared/hooks/use-app-dispatch.ts';
import { thunks } from '@/features/auth/redux';

interface AuthInitializer extends React.PropsWithChildren {}

export const AuthInitializer: React.FC<AuthInitializer> = ({ children }) => {
  const dispatch = useAppDispatch();
  const [hasInitialized, setHasInitialized] = React.useState(false);

  React.useEffect(() => {
    dispatch(thunks.validateToken()).finally(() => {
      setHasInitialized(true);
    });
  }, [dispatch]);

  // Показываем "Loading..." только на первом рендере
  if (!hasInitialized) {
    return <h1>Loading...</h1>;
  }

  return children;
};
