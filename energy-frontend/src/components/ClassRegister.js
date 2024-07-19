import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, GlobalStyles } from '@mui/material';
import AppAppBar from './AppAppBar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Footer from './Footer';
import Pricing from '../components/Pricing';  // Import the UserList component
import backgroundImage from '../assets/background.jpg';  // Import your background image
import Hero from './Hero'; 
import theme from '../theme';

const ClassRegister = () => {
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
          bgcolor: 'transparent', // Transparent to inherit the global black background
          color: 'text.primary',
          backgroundImage: `url(${backgroundImage})`, // Set the background image
          backgroundSize: 'cover', // Cover the entire container
          backgroundPosition: 'center', // Center the image
          pt: { xs: 8, sm: 10 }, // Add padding to the top to create space for the AppBar
        }}
      >
        <AppAppBar position="fixed" /> {/* Make AppAppBar fixed */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 3,
            width: '100%',
            zIndex: 1, // Ensure the Box is above the background
          }}
        >
          <Hero />
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default ClassRegister;
