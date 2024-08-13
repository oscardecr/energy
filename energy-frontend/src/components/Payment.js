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
  GlobalStyles,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppAppBar from './AppAppBar'; // Import AppAppBar
import Footer from './Footer'; // Import Footer
import theme from '../theme';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const plans = [
  { value: 'Regular', label: 'Regular', amount: 21000 },
  { value: 'Quincena', label: 'Quincena', amount: 12000 },
  { value: 'Familiar', label: 'Familiar', amount: 19000 },
  { value: 'Colegial', label: 'Colegial', amount: 15000 },
  { value: 'Semanal', label: 'Semanal', amount: 6500 },
  { value: 'Sesion', label: 'Sesion', amount: 2500 },
  { value: 'Cortesía', label: 'Cortesía', amount: 0 }
];

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state ? location.state.user : null;
  const [plan, setPlan] = useState('');
  const [amount, setAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('SINPE');

  if (!user) {
    return <Typography variant="h6">No user selected for payment.</Typography>;
  }

  const handlePlanChange = (event) => {
    const selectedPlan = plans.find(p => p.value === event.target.value);
    setPlan(event.target.value);
    setAmount(selectedPlan.amount);
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
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
      case 'courtesy':
        membershipExpiration = user.membership_expiration; // No change for courtesy
        break;
      default:
        membershipExpiration = new Date(user.membership_expiration);
        break;
    }

    const payload = {
      user: user.id,  // Ensure this field is always included
      plan,
      amount,
      payment_method: paymentMethod,
      membership_expiration: membershipExpiration ? membershipExpiration.toISOString().split('T')[0] : null,
    };

    console.log('Payload:', payload);

    try {
      await apiClient.post('/finance/payments/', payload);
      const response = await apiClient.post('/users/api/register-payment/', {
        user_id: user.id,
        plan,
        amount,
        payment_method: paymentMethod,
        membership_expiration: membershipExpiration.toISOString().split('T')[0],
      });
      console.log('Payment response:', response.data);
      
      generatePDF(user, plan, amount, paymentMethod, membershipExpiration);

      navigate('/users');
    } catch (error) {
      console.error('Error registering payment:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
      }
    }
  };

  const generatePDF = (user, plan, amount, paymentMethod, membershipExpiration) => {
    const doc = new jsPDF();
    doc.text(`Resumen de Pago - Energy Training Center\nUsuario: ${user.first_name} ${user.last_name}`, 14, 22);
    doc.autoTable({
      startY: 40,
      head: [['Campo', 'Valor']],
      body: [
        ['Nombre', `${user.first_name} ${user.last_name}`],
        ['Plan', plan],
        ['Monto', `${amount}`],
        ['Método de Pago', paymentMethod],
        ['Fecha de Expiración', membershipExpiration.toISOString().split('T')[0]],
      ],
    });
    doc.save(`Resumen_de_Pago_${user.first_name}_${user.last_name}.pdf`);
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
                    <FormControl component="fieldset" sx={{ mt: 2 }}>
                      <FormLabel component="legend" sx={{ color: '#ffffff' }}>Método de pago</FormLabel>
                      <RadioGroup
                        aria-label="payment_method"
                        name="payment_method"
                        value={paymentMethod}
                        onChange={handlePaymentMethodChange}
                        row
                      >
                        <FormControlLabel value="SINPE" control={<Radio />} label="SINPE" sx={{ color: '#ffffff' }} />
                        <FormControlLabel value="Efectivo" control={<Radio />} label="Efectivo" sx={{ color: '#ffffff' }} />
                      </RadioGroup>
                    </FormControl>
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