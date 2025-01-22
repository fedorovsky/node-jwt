import React from 'react';
import { RouterProvider } from '@/app/providers/router-provider.tsx';
import { ReduxProvider } from '@/app/providers/redux-provider.tsx';

export function App() {
  return (
    <React.StrictMode>
      <ReduxProvider>
        <RouterProvider />
      </ReduxProvider>
    </React.StrictMode>
  );
}
