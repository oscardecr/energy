import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import apiClient from './apiClient';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  MenuItem,
  Button,
  CssBaseline,
  GlobalStyles
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppAppBar from './AppAppBar'; // Import AppAppBar
import Footer from './Footer'; // Import Footer
import theme from '../theme';

const plans = [
  { value: 'mes', label: 'Mes', amount: 21000 },
  { value: 'quincena', label: 'Quincena', amount: 12000 },
  { value: 'familiar', label: 'Familiar', amount: 19000 },
  { value: 'colegial', label: 'Colegial', amount: 15000 },
  { value: 'semanal', label: 'Semanal', amount: 6500 },
  { value: 'sesion', label: 'Sesión', amount: 2500 },
  { value: 'courtesy', label: 'Cortesía', amount: 0 }
];

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state ? location.state.user : null;
  const [plan, setPlan] = useState('');
  const [amount, setAmount] = useState(0);

  if (!user) {
    return <Typography variant="h6">No user selected for payment.</Typography>;
  }

  const handlePlanChange = (event) => {
    const selectedPlan = plans.find(p => p.value === event.target.value);
    setPlan(event.target.value);
    setAmount(selectedPlan.amount);
  };

  const handleRegisterPayment = async () => {
    const today = new Date();
    let membershipExpiration = null;

    switch (plan) {
      case 'Regular':
      case 'Familiar':
      case 'Colegial':
      case 'Cortesía':
        membershipExpiration = new Date(today.setDate(today.getDate() + 31));
        break;
      case 'Quincena':
        membershipExpiration = new Date(today.setDate(today.getDate() + 15));
        break;
      case 'Semanal':
        membershipExpiration = new Date(today.setDate(today.getDate() + 8));
        break;
      case 'Sesion':
        membershipExpiration = new Date(today.setDate(today.getDate() + 1));
        break;
      default:
        membershipExpiration = new Date(user.membership_expiration);
        break;
    }

    const payload = {
      user: user.id,  // Ensure this field is always included
      plan,
      amount,
      membership_expiration: membershipExpiration ? membershipExpiration.toISOString().split('T')[0] : null,
    };

    try {
      await apiClient.post('/finance/payments/', payload);
      await apiClient.post('/users/api/register-payment/', {
        user_id: user.id,
        plan,
        amount,
        membership_expiration: membershipExpiration.toISOString().split('T')[0],
      });
      navigate('/users');
    } catch (error) {
      console.error('Error registering payment:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
      }
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
                    <Typography variant="h6" sx={{ mt: 2 }}>
                      Precio: ₡{amount}
                    </Typography>
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
