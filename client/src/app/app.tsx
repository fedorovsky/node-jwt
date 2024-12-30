import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { RootPage } from '@/features/root';
import { store } from './store';
import { AuthInitializer } from '@/features/auth';

export function App() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <AuthInitializer>
          <BrowserRouter>
            <RootPage />
          </BrowserRouter>
        </AuthInitializer>
      </Provider>
    </React.StrictMode>
  );
}
