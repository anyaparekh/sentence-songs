import React from 'react'
import ReactDOM from 'react-dom/client'
import Generate from './Generate.tsx'
import Home from './Home.tsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/generate",
    element: <Generate/>,
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <div className='rainbow'>
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>,
)
