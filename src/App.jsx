import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import QuestionScreen from './pages/question'
import ConvinceScreen from './pages/convince'
import ValentineMessage from './pages/final'
import EntryVerificationScreen from './pages/entry'
import WelcomeScreen from './pages/welcome'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Routes>
      <Route path="/" element={<EntryVerificationScreen />} />
      <Route path="/welcome" element={
        <ProtectedRoute>
          <WelcomeScreen />
        </ProtectedRoute>
      } />
      <Route path="/question" element={
        <ProtectedRoute>
          <QuestionScreen />
        </ProtectedRoute>
      } />
      <Route path="/convince" element={
        <ProtectedRoute>
          <ConvinceScreen />
        </ProtectedRoute>
      } />
      <Route path="/yes" element={<Navigate to="/final" replace />} />
      <Route path="/final" element={
        <ProtectedRoute>
          <ValentineMessage />
        </ProtectedRoute>
      } />
    </Routes>
  )
}

export default App
