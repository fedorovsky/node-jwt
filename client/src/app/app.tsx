import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RootPage } from '@/features/root';

export function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <RootPage />
      </BrowserRouter>
    </React.StrictMode>
  );
}
