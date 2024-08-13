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

const IncomesByUser = () => {
  const [userIncomes, setUserIncomes] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserIncomes = async () => {
      try {
        const response = await apiClient.get('/finance/incomes-by-user/');
        console.log('Fetched user incomes:', response.data); // Debugging
        setUserIncomes(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching incomes by user:', error);
        setLoading(false);
      }
    };

    fetchUserIncomes();
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
              Ingresos por Usuario
            </Typography>
            {loading ? (
              <CircularProgress />
            ) : (
              <Grid container spacing={4}>
                {Object.entries(userIncomes).map(([user, incomes]) => (
                  <Grid item xs={12} sm={6} md={4} key={user}>
                    <Card sx={{ backgroundColor: '#333333', color: '#ffffff' }}>
                      <CardContent>
                        <Typography variant="h6">{user}</Typography>
                        {incomes.map((income, index) => (
                          <Typography variant="body1" key={index}>
                            {`${income.payment_method}: ₡${income.total_income.toFixed(2)} - ${income.payment_date}`}
                          </Typography>
                        ))}
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

export default IncomesByUser;
