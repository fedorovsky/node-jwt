import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { RootPage } from '@/features/root';
import { store } from './store';

export function App() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <RootPage />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
}
