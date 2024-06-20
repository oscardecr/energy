import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterUser from './components/RegisterUser';
import AdminUsers from './components/AdminUsers';
import ClassSchedule from './components/ClassSchedule';
import Home from './components/Home';
import GymInfo from './components/GymInfo';
import UserList from './components/UserList'; // Import the UserList component
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import SignIn from './components/SignIn'; 
import SignUp from './components/SignUp'; 
import { AuthProvider } from './contexts/AuthContext'; // Import AuthProvider
import AppAppBar from './components/AppAppBar';
import Payment from './components/Payment';
import ExpiredMemberships from './components/ExpiredMemberships'; // Import the new component



function App() {
    return (
        <Router>
        <AuthProvider>
          <AppAppBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RegisterUser />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/classes" element={<ClassSchedule />} />
            <Route path="/info" element={<GymInfo />} />
            <Route path="/users" element={<UserList />} /> {/* Add this route */}
            <Route path="/signin" element={<SignIn />} />  {/* Add route for SignIn */}
            <Route path="/signup" element={<SignUp />} />  {/* Add route for Signup */}
            <Route path="/payment" element={<Payment />} />
            <Route path="/expired-memberships" element={<ExpiredMemberships />} /> 
          </Routes>
        </AuthProvider>
      </Router>
    );
}

export default App;
