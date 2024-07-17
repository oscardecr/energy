import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import AdminUsers from './components/AdminUsers';
import ClassSchedule from './components/ClassSchedule';
import Home from './components/Home';
import GymInfo from './components/GymInfo';
import UserList from './components/UserList'; // Import the UserList component
import SignIn from './components/SignIn'; 
import SignUp from './components/SignUp'; 
import { AuthProvider } from './contexts/AuthContext'; // Import AuthProvider
import AppAppBar from './components/AppAppBar';
import Payment from './components/Payment';
import ExpiredMemberships from './components/ExpiredMemberships'; // Import the new component
import DeleteUser from './components/DeleteUser';
import UpdateUser from './components/UpdateUser';
import ClassRegistrations from './components/ClassRegistrations';
import MonthlyIncome from './components/MonthlyIncome';

function App() {
  const [mode, setMode] = useState('light');

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const location = useLocation();

  // Define routes that should not have the AppAppBar
  const noAppBarRoutes = ['/class-registrations'];

  const shouldShowAppBar = !noAppBarRoutes.includes(location.pathname);

  return (
    <AuthProvider>
      {shouldShowAppBar && <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/classes" element={<ClassSchedule />} />
        <Route path="/info" element={<GymInfo />} />
        <Route path="/users" element={<UserList />} /> {/* Add this route */}
        <Route path="/signin" element={<SignIn />} />  {/* Add route for SignIn */}
        <Route path="/signup" element={<SignUp />} />  {/* Add route for Signup */}
        <Route path="/payment" element={<Payment />} />
        <Route path="/expired-memberships" element={<ExpiredMemberships />} />
        <Route path="/delete-user" element={<DeleteUser />} /> 
        <Route path="/update-user/" element={<UpdateUser />} /> 
        <Route path="/class-registrations" element={<ClassRegistrations />} />
        <Route path="/monthly-incomes" element={<MonthlyIncome />} />
      </Routes>
    </AuthProvider>
  );
}

export default function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}
