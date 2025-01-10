import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app/App.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

const CLIEND_ID = "182560334827-a483crbq7b6bm97cv4n1smbe7tnkijmo.apps.googleusercontent.com"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <GoogleOAuthProvider clientId={CLIEND_ID}>
    <App />
  </GoogleOAuthProvider>
  </StrictMode>,
)
