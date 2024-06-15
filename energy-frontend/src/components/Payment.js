import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Container, Typography, Grid, Card, CardContent, TextField, MenuItem, Button, CssBaseline, GlobalStyles } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppAppBar from './AppAppBar'; // Import AppAppBar
import Footer from './Footer'; // Import Footer
import theme from '../theme';

const plans = [
  { value: 'mes', label: 'Mes' },
  { value: 'quincena', label: 'Quincena' },
  { value: 'familiar', label: 'Familiar' },
  { value: 'colegial', label: 'Colegial' },
  { value: 'semanal', label: 'Semanal' },
  { value: 'sesion', label: 'Sesión' }
];

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state ? location.state.user : null;
  const [plan, setPlan] = useState('');

  if (!user) {
    return <Typography variant="h6">No user selected for payment.</Typography>;
  }

  const handlePlanChange = (event) => {
    setPlan(event.target.value);
  };

  const handleRegisterPayment = async () => {
    const today = new Date();
    let membershipExpiration;

    switch (plan) {
      case 'mes':
      case 'familiar':
      case 'colegial':
        membershipExpiration = new Date(today.setMonth(today.getMonth() + 1));
        break;
      case 'quincena':
        membershipExpiration = new Date(today.setDate(today.getDate() + 15));
        break;
      case 'semanal':
        membershipExpiration = new Date(today.setDate(today.getDate() + 8));
        break;
      case 'sesion':
        membershipExpiration = new Date(today.setDate(today.getDate() + 1));
        break;
      default:
        membershipExpiration = user.membership_expiration;
        break;
    }

    try {
      await axios.post('https://energy-e6xp.onrender.com:8000/users/api/register-payment/', {
        user_id: user.id,
        plan,
        membership_expiration: membershipExpiration.toISOString().split('T')[0],
      });
      navigate('/users');
    } catch (error) {
      console.error('Error registering payment:', error);
    }
  };

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
            justifyContent: 'center',
            flex: 1,
            textAlign: 'center',
            py: 3,
          }}
        >
          <Container sx={{ textAlign: 'center', mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Registrar pago para {user.first_name} {user.last_name}
            </Typography>
            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ backgroundColor: '#333333', color: '#ffffff' }}>
                  <CardContent>
                    <TextField
                      select
                      label="Plan"
                      value={plan}
                      onChange={handlePlanChange}
                      fullWidth
                      sx={{
                        backgroundColor: '#ffffff',
                        borderRadius: '5px',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                        input: {
                          color: '#000000',
                          padding: '10px 14px',
                        },
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: 'transparent',
                          },
                          '&:hover fieldset': {
                            borderColor: '#00e676',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#00e676',
                          },
                        },
                      }}
                    >
                      {plans.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    <Button
                      variant="contained"
                      color="success"
                      sx={{ mt: 2 }}
                      onClick={handleRegisterPayment}
                    >
                      Registrar pago
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default Payment;
