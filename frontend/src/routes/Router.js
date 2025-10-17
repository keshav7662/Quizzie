import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Register from '../pages/Register/RegisterPage'
import Dashboard from '../pages/Dashboard/DashboardPage'
import QuizInterfacePage from '../pages/QuizInterface/QuizInterfacePage'
import Home from '../pages/Home/Home'
import AnalysisPage from '../pages/Analysis/AnalysisPage'
import CreateQuizPage from '../pages/createQuiz/CreateQuizPage'
import ProtectedRoute from './ProtectedRoute'
const Router = () => {
  const isLoggedIn = localStorage.getItem('token');
  return (
    <Routes>
      <Route path='/login' element={isLoggedIn ? <Navigate to='/' replace /> : <Register />} />

      <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>}>
        {/* Option 1: Redirect root to dashboard */}
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='analytics' element={<AnalysisPage />} />
        <Route path='create' element={<CreateQuizPage />} />
      </Route>

      <Route path='/quiz-interface/:id' element={<ProtectedRoute><QuizInterfacePage /></ProtectedRoute>} />
    </Routes>
  )
}

export default Router
