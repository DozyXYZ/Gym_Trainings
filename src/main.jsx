import React from 'react'
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Customerlist from './components/CustomerList.jsx';
import Traininglist from './components/TrainingList.jsx';
import Trainingcalendar from './components/TrainingCalendar.jsx';
import Trainingstats from './components/TrainingStats.jsx';
import Error from './components/Error.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      { element: <Customerlist />, index: true },
      { path: "trainings", element: <Traininglist /> },
      { path: "trainingscalendar", element: <Trainingcalendar /> },
      { path: "trainingstats", element: <Trainingstats /> }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
