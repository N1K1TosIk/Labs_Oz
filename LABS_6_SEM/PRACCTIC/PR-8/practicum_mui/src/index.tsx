import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import store from './store';
import Main from './main/Main';
import List from './list/List';
import Bridge from './bridge/Bridge';
import Chart from './chart/Chart';
import Testing from './testing/Testing';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
  },
  {
    path: '/list',
    element: <List />,
  },
  {
    path: '/charts',
    element: <Chart />,
  },
  {
    path: '/testing',
    element: <Testing />,
  },
  {
    path: '/bridge/:id',
    element: <Bridge />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
