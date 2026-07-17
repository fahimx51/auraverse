import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import router from './routes/router.jsx';
import './index.css'
import ShopContextProvider from './context/ShopContextProvider.jsx';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ShopContextProvider>
      <Toaster />
        <RouterProvider router={router} />
    </ShopContextProvider>
  </StrictMode>,
)
