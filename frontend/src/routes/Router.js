import React from 'react'
import { Routes, Route, Navigate} from 'react-router-dom'
import Register from '../pages/Register/RegisterPage'
import Dashboard from '../pages/Dashboard/DashboardPage'
const Router = () => {
    return (
        <Routes>
            <Route path='/' element={<Navigate to="/register" />}></Route>
            <Route path='/register' element={<Register/>}></Route>
            <Route path='/dashboard' element={<Dashboard/>}></Route>
        </Routes>
    )
}

export default Router
