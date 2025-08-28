
import { Route, Routes } from 'react-router-dom'
import './App.css'
import {LoginPage } from './Presentation/Pages/LoginPage'
import { Dashboard } from './Presentation/Pages/Dashboard'
import { useAuthInitializer } from './Presentation/Hooks/useAuthInitializer'

function App() {
  // Inicializar el estado de autenticación desde localStorage
  useAuthInitializer();
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  )
}

export default App
