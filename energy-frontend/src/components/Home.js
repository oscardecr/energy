import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, GlobalStyles } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppAppBar from './AppAppBar';
import theme from '../theme';
import Footer from './Footer';
import Hero from './Hero';
import Carousel from '../components/Carousel';  // Import the Carousel component
import Pricing from '../components/Pricing';  // Import the UserList component
import backgroundImage from '../assets/background.jpg';  // Import your background image

export default function Home() {
  const [mode, setMode] = React.useState('light');
  const [showCustomTheme] = React.useState(true);
  const LPtheme = createTheme(theme);
  const defaultTheme = createTheme({ palette: { mode } });


  return (
    <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
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
        }}
      >
        <AppAppBar />
        <Hero />
        <Carousel />  {/* Add the Carousel component here */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 3,
          }}
        >
        </Box>
        <Pricing/>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
