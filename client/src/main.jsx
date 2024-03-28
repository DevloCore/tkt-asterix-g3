import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Menu from './Menu.jsx'
import Auth from './Auth.jsx'
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
  { path: '/', element: <Menu />, name:"Accueil" },
  { path: '/auth', element: <Auth />, name:"TempAuth" },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Navbar router={router} />
    <RouterProvider router={router}>
  </RouterProvider>
  </React.StrictMode>,
)
