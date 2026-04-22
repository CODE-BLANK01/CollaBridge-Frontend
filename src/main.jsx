import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 5000,
            style: {
              background: '#1a1a28',
              color: '#fff',
              border: '1px solid #2a2a38',
              borderRadius: '12px',
              fontSize: '13px',
            },
            success: {
              duration: 4000,
              iconTheme: { primary: '#34d399', secondary: '#1a1a28' },
              ariaProps: { role: 'status', 'aria-live': 'polite' },
            },
            error: {
              duration: 6000,
              iconTheme: { primary: '#f87171', secondary: '#1a1a28' },
              ariaProps: { role: 'alert', 'aria-live': 'assertive' },
            },
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
