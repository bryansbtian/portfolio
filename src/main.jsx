import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import AdminSkeleton from './admin/AdminSkeleton.jsx'
import './index.css'

// eslint-disable-next-line react-refresh/only-export-components
const Admin = lazy(() => import('./admin/Admin.jsx'))
const isAdminRoute = /^\/admin\/?$/.test(window.location.pathname)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isAdminRoute ? (
      <Suspense fallback={<AdminSkeleton />}>
        <Admin />
      </Suspense>
    ) : (
      <App />
    )}
  </StrictMode>,
)
