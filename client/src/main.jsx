import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as RouterProvider, createBrowserRouter, Routes, Route } from 'react-router-dom'
import Menu from './Menu.jsx'
import Auth from './Auth.jsx'
import './index.css'

const router = createBrowserRouter([
  { path: '/', element: <Menu /> },
  { path: '/auth', element: <Auth /> },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </RouterProvider>
  </React.StrictMode>,
)
