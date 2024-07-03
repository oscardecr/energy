import React, { useEffect, useState } from 'react';
import apiClient from './apiClient';
import { CssBaseline, Box, Container, Typography, Grid, Card, CardContent, CircularProgress, TextField, Button, GlobalStyles } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppAppBar from './AppAppBar'; // Import AppAppBar
import Footer from './Footer'; // Import Footer
import theme from '../theme';

const DeleteUser = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await apiClient.get('/users/api/users/');
        setUsers(response.data);
        setFilteredUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    if (query) {
      setFilteredUsers(
        users.filter((user) =>
          `${user.first_name} ${user.last_name}`.toLowerCase().includes(query) ||
          user.national_id.toLowerCase().includes(query)
        )
      );
    } else {
      setFilteredUsers(users);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await apiClient.delete(`/users/api/users/delete/${userId}/`);
      setFilteredUsers(filteredUsers.filter((user) => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
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
              Eliminar Usuarios
            </Typography>
            <Box sx={{ mt: 3, mb: 4 }}>
              <TextField
                label="Buscar Usuario"
                variant="outlined"
                value={searchQuery}
                onChange={handleSearchChange}
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
              />
            </Box>
            {loading ? (
              <CircularProgress />
            ) : (
              <Grid container spacing={4}>
                {filteredUsers.map((user) => (
                  <Grid item xs={12} sm={6} md={4} key={user.id}>
                    <Card sx={{ backgroundColor: '#333333', color: '#ffffff' }}>
                      <CardContent>
                        <Typography variant="h6">{`${user.first_name} ${user.last_name}`}</Typography>
                        <Typography variant="body2">Cédula: {user.national_id}</Typography>
                        <Typography variant="body2">Fecha de Nacimiento: {user.date_born}</Typography>
                        <Typography variant="body2">Contacto de Emergencia: {user.emergency_contact}</Typography>
                        <Typography variant="body2">Caducidad de Membresía: {user.membership_expiration}</Typography>
                        <Button
                          variant="contained"
                          color="error"
                          sx={{ mt: 2 }}
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          Eliminar
                        </Button>
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

export default DeleteUser;
