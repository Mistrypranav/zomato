import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserRegister from '../pages/auth/UserRegister';


const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                
                <Route path="/user/register" element={<UserRegister />} />
                
            </Routes>
        </Router>
    )
}

export default AppRoutes