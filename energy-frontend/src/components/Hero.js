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
  const [messageColor, setMessageColor] = React.useState(''); // State for dynamic color
  const [warning, setWarning] = React.useState('');

  const handleRegister = async (event) => {
    event.preventDefault(); // Prevent the form from reloading the page
    try {
      const response = await apiClient.post('/users/register-visit/', { national_id: nationalId });
      if (response.data.warning) {
        setWarning(response.data.warning);
        setMessage('');
        setMessageColor('');
      } else {
        setMessage(response.data.message);
        setMessageColor(response.data.style?.color || ''); // Get color from the API response
        setWarning('');
      }
      setNationalId(''); // Clear the national ID field
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setMessage(error.response.data.error);
        setMessageColor(error.response.data.style?.color || 'red'); // Default to red for errors
      } else if (error.request) {
        setMessage('No response received from the server.');
        setMessageColor('red');
      } else {
        setMessage('Error in request setup.');
        setMessageColor('red');
      }
      setWarning('');
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
              fontSize: { xs: '2.5rem', sm: '4rem', md: '4.5rem' },
              color: '#00e676',
            }}
          >
            Bienvenido&nbsp;a&nbsp;Energy&nbsp;Training&nbsp;Center&nbsp;
          </Typography>
          <form onSubmit={handleRegister} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={3}
              useFlexGap
              sx={{ pt: 2, width: { xs: '100%', sm: 'auto' } }}
            >
              <InputLabel htmlFor="national-id" sx={visuallyHidden}>
                National ID
              </InputLabel>
              <TextField
                id="national-id"
                hiddenLabel
                size="medium"
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
                    color: '#000000',
                    padding: '24px 28px',
                    fontSize: '1.5rem',
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
                startIcon={<img src={registerIcon} alt="logo" style={{ width: 35, height: 35 }} />}
                sx={{
                  fontSize: '1.5rem',
                  padding: '24px 28px',
                }}
              >
                Registrarse
              </Button>
            </Stack>
          </form>
          {message && (
            <Typography sx={{ color: messageColor, mt: 2, fontSize: '1.5rem' }}>
              {message}
            </Typography>
          )}
          {warning && (
            <Typography sx={{ color: 'orange', mt: 2, fontSize: '1.5rem' }}>
              {warning}
            </Typography>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
