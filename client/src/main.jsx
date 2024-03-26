import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import Auth from './Auth.jsx'
import './index.css'

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/auth', element: <Auth /> },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </BrowserRouter> */}
    </RouterProvider>
  </React.StrictMode>,
)
