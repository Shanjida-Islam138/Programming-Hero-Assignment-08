import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../Components/Layout.jsx';
import Error from '../pages/Error.jsx';
import Home from '../pages/Home.jsx';
import Apps from '../pages/Apps.jsx';
import AppDetails from '../pages/AppDetails.jsx';
import MyInstallation from '../pages/MyInstallation.jsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Error />, 
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'apps',
        element: <Apps />,
      },
      {
        path: 'apps/:appId',
        element: <AppDetails />,
      },
      {
        path: 'my-installations',
        element: <MyInstallation />,
      },
    ],
  },
]);
