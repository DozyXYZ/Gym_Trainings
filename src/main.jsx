import React from 'react'
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Customerlist from './components/CustomerList.jsx';
import Traininglist from './components/TrainingList.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { element: <Customerlist />, index: true },
      { path: "trainings", element: <Traininglist /> }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
