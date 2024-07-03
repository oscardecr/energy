import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from './apiClient';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import AppAppBar from './AppAppBar';
import Footer from './Footer';
import Link from '@mui/material/Link';
import { createGlobalStyle } from 'styled-components';
import theme from '../theme';
import { ForkLeft } from '@mui/icons-material';

const customTheme = createTheme(theme);

const GlobalStyle = createGlobalStyle`
  body, html, #root {
    background-color: #000000;
    margin: 0;
    height: 100%;
  }
`;

export default function SignUp() {
  const [formData, setFormData] = useState({
    national_id: '',
    first_name: '',
    last_name: '',
    password: '',
    date_born: '',
    emergency_contact: '',
    membership_expiration: '',
  });
  const [userType, setUserType] = useState('regular');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post(userType === 'regular' ? '/users/register/' : '/users/register/admin/', formData);
      if (response.status === 201) {
        navigate('/signin');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      }
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
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ color: '#ffffff' }}>
              Registro de usuarios
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <FormControl component="fieldset" sx={{ mb: 2 }}>
                <FormLabel component="legend" sx={{ color: '#ffffff' }}>Tipo de usuario</FormLabel>
                <RadioGroup
                  row
                  aria-label="userType"
                  name="userType"
                  value={userType}
                  onChange={handleUserTypeChange}
                >
                  <FormControlLabel value="regular" control={<Radio />} label="Usuario regular" sx={{ color: '#ffffff' }}/>
                  <FormControlLabel value="admin" control={<Radio />} label="Usuario administrador" sx={{ color: '#ffffff' }}/>
                </RadioGroup>
              </FormControl>
              <Grid container spacing={2}>
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
                    placeholder="Cedula"
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
                    placeholder="Nombre"
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
                    placeholder="Apellido"
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
                {userType === 'admin' && (
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      value={formData.password}
                      onChange={handleChange}
                      error={!!errors.password}
                      helperText={errors.password}
                      placeholder="Clave"
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
                )}
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
                    placeholder="Fecha Nacimiento"
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
                  <TextField
                    required
                    fullWidth
                    name="emergency_contact"
                    id="emergency_contact"
                    autoComplete="emergency-contact"
                    placeholder='Contacto de emergencia'
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
                    placeholder='Fecha expiracion membresia'
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
              >
                Registrarse
              </Button>
            </Box>
          </Container>
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
