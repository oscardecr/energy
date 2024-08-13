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
import Autocomplete from '@mui/material/Autocomplete';
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

const planTypes = [
  'Regular',
  'Familiar',
  'Colegial',
  'Cortesía',
  'Quincena',
  'Semanal',
  'Sesion'
];

export default function UpdateUser() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    national_id: '',
    first_name: '',
    last_name: '',
    date_born: '',
    emergency_contact: '',
    membership_expiration: '',
    phone_number: '',
    plan_type: ''
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

  const handleUserChange = (event, value) => {
    setSelectedUser(value);
    if (value) {
      setFormData({
        national_id: value.national_id,
        first_name: value.first_name,
        last_name: value.last_name,
        date_born: value.date_born,
        emergency_contact: value.emergency_contact,
        membership_expiration: value.membership_expiration,
        phone_number: value.phone_number,
        plan_type: value.plan_type || ''
      });
    } else {
      setFormData({
        national_id: '',
        first_name: '',
        last_name: '',
        date_born: '',
        emergency_contact: '',
        membership_expiration: '',
        phone_number: '',
        plan_type: ''
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
      const response = await apiClient.put(`/users/api/users/${selectedUser.id}/`, formData);
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
            <Autocomplete
              id="select-user"
              options={users}
              getOptionLabel={(option) => `${option.first_name} ${option.last_name} (${option.national_id})`}
              value={selectedUser}
              onChange={handleUserChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Seleccionar usuario"
                  sx={{ mt: 3, mb: 2, color: '#ffffff', textAlign: 'left' }}
                  InputLabelProps={{ style: { color: '#ffffff' } }}
                />
              )}
            />
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
                  <Typography sx={{ color: '#ffffff', textAlign: 'left' }}>Teléfono</Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="phone_number"
                    id="phone_number"
                    autoComplete="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    error={!!errors.phone_number}
                    helperText={errors.phone_number}
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
                  <Typography sx={{ color: '#ffffff', textAlign: 'left' }}>Fecha expiración membresía</Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="date"
                    name="membership_expiration"
                    id="membership_expiration"
                    autoComplete="membresia"
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
                <Grid item xs={12}>
                  <Typography sx={{ color: '#ffffff', textAlign: 'left' }}>Tipo de plan</Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    select
                    fullWidth
                    name="plan_type"
                    id="plan_type"
                    value={formData.plan_type}
                    onChange={handleChange}
                    error={!!errors.plan_type}
                    helperText={errors.plan_type}
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
                    {planTypes.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
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
