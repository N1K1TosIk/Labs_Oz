import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Main from './main/Main';
import List from './list/List';
import Bridge from './bridge/Bridge';
import Chart from './chart/Chart';

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
    path: '/bridge/:id',
    element: <Bridge />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
