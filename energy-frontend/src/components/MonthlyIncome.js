import React, { useEffect, useState } from 'react';
import apiClient from './apiClient';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  CssBaseline,
  GlobalStyles
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppAppBar from './AppAppBar'; // Import AppAppBar
import Footer from './Footer'; // Import Footer
import theme from '../theme';

const MONTHS_IN_SPANISH = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const MonthlyIncome = () => {
  const [monthlyIncomes, setMonthlyIncomes] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMonthlyIncomes = async () => {
      try {
        const response = await apiClient.get('finance/monthly-incomes-by-payment-method/');
        setMonthlyIncomes(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching monthly incomes:', error);
        setLoading(false);
      }
    };

    fetchMonthlyIncomes();
  }, []);

  const getMonthInSpanish = (month) => {
    const monthIndex = month - 1; // Adjust for 0-indexed month array
    return MONTHS_IN_SPANISH[monthIndex];
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
            <Typography variant="h4" gutterBottom sx={{ color: '#ffffff' }}>
              Ingresos Mensuales
            </Typography>
            {loading ? (
              <CircularProgress />
            ) : (
              <Grid container spacing={4}>
                {Object.entries(monthlyIncomes).map(([year, months]) => (
                  Object.entries(months).map(([month, paymentMethods]) => (
                    <Grid item xs={12} sm={6} md={4} key={`${year}-${month}`}>
                      <Card sx={{ backgroundColor: '#333333', color: '#ffffff' }}>
                        <CardContent>
                          <Typography variant="h6">{`${getMonthInSpanish(month)} ${year}`}</Typography>
                          {Object.entries(paymentMethods).map(([method, total]) => (
                            <Typography variant="body1" key={method}>{`${method}: ₡${total}`}</Typography>
                          ))}
                        </CardContent>
                      </Card>
                    </Grid>
                  ))
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

export default MonthlyIncome;
