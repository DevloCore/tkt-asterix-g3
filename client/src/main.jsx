import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter, Routes, Route } from 'react-router-dom'
import Menu from './Menu.jsx'
import Auth from './Auth.jsx'
import Accueil from './Navbar.jsx'
import Missions from './Missions.jsx'
import './index.css'
import axios from 'axios'

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("apiToken");
  config.headers['Authorization'] = `Bearer ${token}`;
  return config;
})

axios.defaults.baseURL = "http://localhost:3000/";

const router = createBrowserRouter([
  { path: '/', element: <Accueil /> },
  { path: '/menu', element: <Menu /> },
  { path: '/auth', element: <Auth /> },
  { path: '/missions', element: <Missions /> },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
  </RouterProvider>
  </React.StrictMode>,
)
