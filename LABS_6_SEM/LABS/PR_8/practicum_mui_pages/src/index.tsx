import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';
import Testing from './testing/Testing';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Testing />
    </Provider>
  </React.StrictMode>
);
