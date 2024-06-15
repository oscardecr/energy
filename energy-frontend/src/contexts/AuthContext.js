import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const tokens = localStorage.getItem('authTokens');
    return tokens ? JSON.parse(tokens) : null;
  });
  const navigate = useNavigate();

  const loginUser = async (email, password) => {
    try {
      const response = await axios.post('https://energy-e6xp.onrender.com/users/api/auth/login/', {
        email,
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
