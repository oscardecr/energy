// AuthContext.js
import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../components/apiClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const tokens = localStorage.getItem('authTokens');
    return tokens ? JSON.parse(tokens) : null;
  });
  const navigate = useNavigate();

  const loginUser = async (national_id, password) => {
    try {
      const response = await apiClient.post('/users/api/auth/login/', {
        national_id,
        password,
      });
      localStorage.setItem('authTokens', JSON.stringify(response.data));
      setUser(response.data);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem('authTokens');
    setUser(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
