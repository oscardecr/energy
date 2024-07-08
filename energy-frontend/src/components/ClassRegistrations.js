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
import AppAppBar from './AppAppBar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import { createGlobalStyle } from 'styled-components';
import CssBaseline from '@mui/material/CssBaseline';
import logo from '../assets/logo.jpeg'; // Adjust the path as necessary

const customTheme = createTheme(theme);

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
        console.error('Error obteniendo visitas:', error);
        setLoading(false);
      }
    };

    fetchUsers();
    const interval = setInterval(fetchUsers, 4500000); // Refresh every 1 hour 15 minutes
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
        <AppAppBar />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flex: 1,
            textAlign: 'center',
            py: 3,
            mt: 4,
          }}
        >
          <Container sx={{ textAlign: 'center', mb: 5 }}>
            <Box sx={{ mb: 3 }}>
              <img src={logo} alt="Logo" style={{ height: 400 }} />
            </Box>
            <Typography component="h1" variant="h5" sx={{ mb: 3, color: '#ffffff'}}>
              Usuarios Registrados
            </Typography>
            <Typography component="div" variant="h4" sx={{ mb: 3, color: '#ffffff' }}>
              Hora: {formatTime(currentTime)}
            </Typography>
            {loading ? (
              <CircularProgress />
            ) : (
              <Grid container spacing={4}>
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
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ClassRegistration;
