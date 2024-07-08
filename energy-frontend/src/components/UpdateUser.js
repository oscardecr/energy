import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from './apiClient';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import AppAppBar from './AppAppBar';
import Footer from './Footer';
import theme from '../theme';
import EditIcon from '@mui/icons-material/Edit';
import CircularProgress from '@mui/material/CircularProgress';
import { createGlobalStyle } from 'styled-components';

const customTheme = createTheme(theme);
const GlobalStyle = createGlobalStyle`
  body, html, #root {
    background-color: #000000;
    margin: 0;
    height: 100%;
  }
`;

export default function UpdateUser() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [formData, setFormData] = useState({
    national_id: '',
    first_name: '',
    last_name: '',
    date_born: '',
    emergency_contact: '',
    membership_expiration: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await apiClient.get('/users/api/users/');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleUserChange = (event) => {
    const userId = event.target.value;
    setSelectedUser(userId);
    const user = users.find((user) => user.id === userId);
    if (user) {
      setFormData({
        national_id: user.national_id,
        first_name: user.first_name,
        last_name: user.last_name,
        date_born: user.date_born,
        emergency_contact: user.emergency_contact,
        membership_expiration: user.membership_expiration,
      });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await apiClient.put(`/users/api/users/${selectedUser}/`, formData);
      if (response.status === 200) {
        navigate('/users');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      }
    } finally {
      setLoading(false);
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
            mt: 8,
          }}
        >
          <Container sx={{ textAlign: 'center', mb: 5 }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <EditIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ color: '#ffffff', textAlign: 'center' }}>
              Actualizar usuario
            </Typography>
            <FormControl fullWidth sx={{ mt: 3, mb: 2 }}>
              <InputLabel id="select-user-label">Seleccionar usuario</InputLabel>
              <Select
                labelId="select-user-label"
                id="select-user"
                value={selectedUser}
                label="Select User"
                onChange={handleUserChange}
                sx={{ color: '#ffffff', textAlign: 'left' }}
              >
                {users.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.first_name} {user.last_name} ({user.national_id})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
              <Grid item xs={12}>
                  <Typography sx={{ color: '#ffffff', textAlign: 'left' }}>Cédula</Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="national_id"
                    name="national_id"
                    autoComplete="national-id"
                    value={formData.national_id}
                    onChange={handleChange}
                    error={!!errors.national_id}
                    helperText={errors.national_id}
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
                </Grid>
                <Grid item xs={12}>
                  <Typography sx={{ color: '#ffffff', textAlign: 'left' }}>Nombre</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="first_name"
                    name="first_name"
                    autoComplete="given-name"
                    value={formData.first_name}
                    onChange={handleChange}
                    error={!!errors.first_name}
                    helperText={errors.first_name}
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
                </Grid>
                <Grid item xs={12}>
                  <Typography sx={{ color: '#ffffff', textAlign: 'left' }}>Apellido</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="last_name"
                    name="last_name"
                    autoComplete="family-name"
                    value={formData.last_name}
                    onChange={handleChange}
                    error={!!errors.last_name}
                    helperText={errors.last_name}
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
                </Grid>
                <Grid item xs={12}>
                  <Typography sx={{ color: '#ffffff', textAlign: 'left' }}>Fecha nacimiento</Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="date_born"
                    type="date"
                    id="date_born"
                    InputLabelProps={{ shrink: true }}
                    value={formData.date_born}
                    onChange={handleChange}
                    error={!!errors.date_born}
                    helperText={errors.date_born}
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
                </Grid>
                <Grid item xs={12}>
                  <Typography sx={{ color: '#ffffff', textAlign: 'left' }}>Contacto de emergencia</Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="emergency_contact"
                    id="emergency_contact"
                    autoComplete="emergency-contact"
                    value={formData.emergency_contact}
                    onChange={handleChange}
                    error={!!errors.emergency_contact}
                    helperText={errors.emergency_contact}
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
                </Grid>
                <Grid item xs={12}>
                  <Typography sx={{ color: '#ffffff', textAlign: 'left' }}>Expiración membresía</Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="date"
                    name="membership_expiration"
                    id="membership_expiration"
                    autoComplete="membership-expiration"
                    value={formData.membership_expiration}
                    onChange={handleChange}
                    error={!!errors.membership_expiration}
                    helperText={errors.membership_expiration}
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
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Actualizar usuario'}
              </Button>
            </Box>
          </Container>
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

                     
