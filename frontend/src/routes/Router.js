import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Register from '../pages/Register/RegisterPage'

const Router = () => {
    return (
        <Routes>
            <Route path='/' element={<Navigate to="/register" />}></Route>
            <Route path='/register' element={<Register />}></Route>
        </Routes>
    )
}

export default Router
