import React, { useEffect, useState } from 'react';
import apiClient from './apiClient';
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import { createGlobalStyle } from 'styled-components';
import CssBaseline from '@mui/material/CssBaseline';
import logo from '../assets/logo.jpeg'; // Adjust the path as necessary

const customTheme = createTheme({
  ...theme,
  typography: {
    ...theme.typography,
    h1: {
      fontSize: '6rem', // Increase the size of the class title
      fontWeight: 'bold',
    },
    h4: {
      fontSize: '4rem', // Increase the size of the time display
    },
    h6: {
      fontSize: '2.5rem', // Increase the size of the user names
    },
  },
});

const GlobalStyle = createGlobalStyle`
  body, html, #root {
    background-color: #000000;
    margin: 0;
    height: 100%;
  }
`;

const ClassRegistration = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await apiClient.get('users/api/recent-visits/');
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error obtaining visits:', error);
        setLoading(false);
      }
    };

    fetchUsers();
    const interval = setInterval(fetchUsers, 300000); // Refresh every 5 minutes (300,000 ms)
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const clockInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(clockInterval);
  }, []);

  const formatTime = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
      timeZone: 'America/Belize', // GMT-6 timezone
    }).format(date);
  };

  const getClassTitle = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();

    if (hours === 5 && minutes >= 0 && minutes < 60) {
      return 'Clase de 5:00 AM';
    } else if (hours === 6 && minutes >= 15 && minutes < 75) {
      return 'Clase de 6:15 AM';
    } else if (hours === 7 && minutes >= 30 && minutes < 90) {
      return 'Clase de 7:30 AM';
    } else if (hours === 8 && minutes >= 45 && minutes < 105) {
      return 'Clase de 8:45 AM';
    } else if (hours === 10 && minutes >= 0 && minutes < 60) {
      return 'Clase de 10:00 AM';
    } else if (hours === 16 && minutes >= 15 && minutes < 75) {
      return 'Clase de 4:15 PM';
    } else if (hours === 17 && minutes >= 30 && minutes < 90) {
      return 'Clase de 5:30 PM';
    } else if (hours === 18 && minutes >= 45 && minutes < 105) {
      return 'Clase de 6:45 PM';
    } else if (hours === 20 && minutes >= 0 && minutes < 60) {
      return 'Clase de 8:00 PM';
    } else {
      return 'No hay clase en este momento';
    }
  };

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <GlobalStyle />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          bgcolor: 'transparent',
          color: 'text.primary',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flex: 1,
            textAlign: 'center',
            py: 4,
            mt: 6,
          }}
        >
          <Container sx={{ textAlign: 'center', mb: 8 }}>
            <Box sx={{ mb: 5 }}>
              <img src={logo} alt="Logo" style={{ height: 500 }} /> {/* Increase logo size */}
            </Box>
            <Typography component="h2" variant="h2" sx={{ mb: 5, color: '#ffffff' }}>
              {getClassTitle(currentTime)}
            </Typography>
            {loading ? (
              <CircularProgress size={100} /> // Increase loader size
            ) : (
              <Grid container spacing={6}>
                {users.map((user, index) => (
                  user && user.id ? (
                    <Grid item xs={12} sm={6} md={4} key={user.id || index}>
                      <Card sx={{ backgroundColor: '#333333', color: '#ffffff' }}>
                        <CardContent>
                          <Typography variant="h6">
                            {user.first_name} {user.last_name}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ) : null
                ))}
              </Grid>
            )}
            <br />
            <br />
            <Typography component="div" variant="h4" sx={{ mb: 4, color: '#ffffff' }}>
              Hora: {formatTime(currentTime)}
            </Typography>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ClassRegistration;
