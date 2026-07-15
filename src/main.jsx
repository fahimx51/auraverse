import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import router from './routes/router.jsx';
import './index.css'
import ShopContextProvider from './context/ShopContextProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ShopContextProvider>
      <RouterProvider router={router} />
    </ShopContextProvider>
  </StrictMode>,
)
