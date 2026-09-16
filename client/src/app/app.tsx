import { StrictMode } from 'react';
import { ReduxProvider } from './providers/redux-provider';
import { RouterProvider } from './providers/router-provider';

export const App = () => (
  <StrictMode>
    <ReduxProvider>
      <RouterProvider />
    </ReduxProvider>
  </StrictMode>
);
