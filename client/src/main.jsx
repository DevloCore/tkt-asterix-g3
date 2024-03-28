import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Menu from './Menu.jsx'
import Auth from './Auth.jsx'
import Accueil from './Navbar.jsx'
import Missions from './Missions.jsx'
import Avertissements from './Avertissements.jsx'
import './index.css'
import axios from 'axios'
import Navbar from './Navbar.jsx'

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("apiToken");
  config.headers['Authorization'] = `Bearer ${token}`;
  return config;
})

axios.defaults.baseURL = "http://localhost:3000/";

const router = createBrowserRouter([
  { path: '/', element: <Auth /> },
  { path: '/menu', element: <Menu /> },
  { path: '/auth', element: <Auth /> },
  { path: '/missions', element: <Missions /> },
  { path: '/avertissements', element: <Avertissements /> },
  { path: '/admin', element: <Avertissements /> },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Navbar router={router} />
    <RouterProvider router={router}>
  </RouterProvider>
  </React.StrictMode>,
)
