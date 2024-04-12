import React, { useContext } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Auth from './Auth.jsx'
import Missions from './Missions.jsx'
import Avertissements from './Avertissements.jsx'
import Attractions from './Attractions.jsx'
import axios from 'axios'
import Navbar from './Navbar.jsx'
import GestionStaff from './GestionStaff.jsx'
import Login from './Login.jsx'
import { UserContext, UserProvider } from './assets/contexts/UserContext.jsx'

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("apiToken");
  config.headers['Authorization'] = `Bearer ${token}`;
  return config;
})

axios.defaults.baseURL = "http://localhost:3000/";

const router = createBrowserRouter([
  { path: '/', element: <Attractions /> },
  { path: '/login', element: <Login /> },
  { path: '/attractions', element: <Attractions /> },
  { path: '/auth', element: <Auth /> },
  { path: '/missions', element: <Missions /> },
  { path: '/avertissements', element: <Avertissements /> },
  { path: '/gestionstaff', element: <GestionStaff /> },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
          <Navbar router={router} />
          <div className="myBody"><RouterProvider router={router}>
        </RouterProvider></div>
    </UserProvider>
  </React.StrictMode>,
)

export const { navigate } = router;