import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { visuallyHidden } from '@mui/utils';
import apiClient from './apiClient';
import registerIcon from '../assets/verify.png';


export default function Hero() {
  const [nationalId, setNationalId] = React.useState('');
  const [message, setMessage] = React.useState('');

  const handleRegister = async (event) => {
    event.preventDefault(); // Prevent the form from reloading the page
    try {
      const response = await apiClient.post('/users/register-visit/', { national_id: nationalId });
      setMessage(response.data.message);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setMessage(error.response.data.error);
      } else if (error.request) {
        // The request was made but no response was received
        setMessage('No response received from the server.');
      } else {
        // Something happened in setting up the request that triggered an Error
        setMessage('Error in request setup.');
      }
    }
  };

  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: '100%',
        backgroundImage:
          theme.palette.mode === 'light'
            ? 'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)'
            : 'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 16%), transparent)',
        backgroundRepeat: 'no-repeat',
      })}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack
          spacing={2}
          useFlexGap
          sx={{ alignItems: 'center', width: { xs: '100%', sm: '70%' } }}
        >
          <Typography
            variant="h1"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              fontSize: { xs: '2rem', sm: '3rem', md: '3.5rem' }, // Adjust font size for different screen sizes
              color: (theme) => theme.palette.success.main,
            }}
          >
            Energy&nbsp;Training&nbsp;Center
          </Typography>
          <Typography
            sx={{
              textAlign: 'center',
              color: 'white',
              width: { sm: '100%', md: '80%' },
            }}
          >
            Bienvenido al sitio web de Energy Training Center localizado en San Rafael de Poas, Alajuela.
          </Typography>
          <form onSubmit={handleRegister} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={1}
              useFlexGap
              sx={{ pt: 2, width: { xs: '100%', sm: 'auto' } }}
            >
              <InputLabel htmlFor="national-id" sx={visuallyHidden}>
                National ID
              </InputLabel>
              <TextField
                id="national-id"
                hiddenLabel
                size="small"
                variant="outlined"
                aria-label="Introduce tu cédula de identidad"
                placeholder="Cédula de identidad"
                value={nationalId}
                onChange={(e) => setNationalId(e.target.value)}
                sx={{
                  backgroundColor: '#ffffff',
                  borderRadius: '5px',
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                  input: {
                    color: '#000000', // Text color
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
              <Button
                type="submit"
                variant="contained"
                color="success"
                startIcon={<img src={registerIcon} alt="logo" style={{ width: 20, height: 20 }} />} // Add the logo as an icon
              >
                Registrarse
              </Button>
            </Stack>
          </form>
          {message && (
            <Typography sx={{ color: 'text.secondary', mt: 2 }}>
              {message}
            </Typography>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
