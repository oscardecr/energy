import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, CircularProgress, CssBaseline, GlobalStyles } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import axios from 'axios';
import AppAppBar from './AppAppBar'; // Import AppAppBar
import Footer from './Footer'; // Import Footer
import theme from '../theme';

const ExpiredMemberships = () => {
  const [expiredUsers, setExpiredUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExpiredUsers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/api/expired-memberships/`);
        setExpiredUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching expired users:', error);
        setLoading(false);
      }
    };

    fetchExpiredUsers();
  }, []);

  return (
    <ThemeProvider theme={createTheme(theme)}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: { backgroundColor: '#000000', margin: 0, height: '100%' },
          html: { backgroundColor: '#000000', height: '100%', margin: 0 },
          '#root': { backgroundColor: '#000000', height: '100%' }
        }}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          bgcolor: 'transparent', // Transparent to inherit the global black background
          color: 'text.primary',
        }}
      >
        <AppAppBar />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            textAlign: 'center',
            py: 3,
            mt: 8, // Add margin-top to create space below AppAppBar
          }}
        >
          <Container sx={{ textAlign: 'center', mb: 5 }}>
            <Typography variant="h2" gutterBottom sx={{ color: '#ffffff' }}>
              Usuarios con Membresías Expiradas
            </Typography>
            {loading ? (
              <CircularProgress />
            ) : (
              <Grid container spacing={4}>
                {expiredUsers.map((user) => (
                  <Grid item xs={12} sm={6} md={4} key={user.id}>
                    <Card sx={{ backgroundColor: '#333333', color: '#ffffff' }}>
                      <CardContent>
                        <Typography variant="h6">{`${user.first_name} ${user.last_name}`}</Typography>
                        <Typography variant="body2">Cédula: {user.national_id}</Typography>
                        <Typography variant="body2">Fecha de Nacimiento: {user.date_born}</Typography>
                        <Typography variant="body2">Contacto de Emergencia: {user.emergency_contact}</Typography>
                        <Typography variant="body2">Fecha de Expiración de Membresía: {user.membership_expiration}</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Container>
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default ExpiredMemberships;
